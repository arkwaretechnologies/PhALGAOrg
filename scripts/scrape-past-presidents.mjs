/**
 * Fetches past president data and photos from phalga.org/PastPresident.html
 * Run: node scripts/scrape-past-presidents.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'past-presidents')
const JSON_PATH = path.join(ROOT, 'data', 'past-presidents.json')
const SOURCE_URL = 'https://phalga.org/PastPresident.html'
const BASE = 'https://phalga.org/'

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\b(dr|atty|cpa|mba)\b\.?,?\s*/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function fiscalStartYear(fy) {
  const m = fy.match(/(\d{4})/)
  return m ? parseInt(m[1], 10) : 0
}

function parseSocials(block) {
  const socials = {}
  const icons = [...block.matchAll(/<a href="([^"]*)"[^>]*>\s*<i class="bi bi-(\w+)"/gi)]
  for (const [, href, icon] of icons) {
    const url = href.trim()
    if (!url || url === '#') continue
    if (icon === 'twitter') socials.twitter = url
    else if (icon === 'facebook') socials.facebook = url
    else if (icon === 'instagram') socials.instagram = url
    else if (icon === 'linkedin') socials.linkedin = url
  }
  return socials
}

async function main() {
  const res = await fetch(SOURCE_URL)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const html = await res.text()

  const memberRegex =
    /<div class="member">([\s\S]*?)<\/div>\s*<\/div>\s*(?=<div class="col-lg|<\/div>\s*<\/div>\s*<\/section)/gi
  const blocks = [...html.matchAll(/<div class="member">([\s\S]*?)<div class="member-info">([\s\S]*?)<\/div>\s*<\/div>/gi)]

  if (blocks.length === 0) {
    throw new Error('No member blocks found — page structure may have changed')
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true })

  const presidents = []

  for (const [, imgSection, infoSection] of blocks) {
    const imgMatch = imgSection.match(/src="([^"]+)"/)
    const nameMatch = infoSection.match(/<h4>([^<]+)<\/h4>/)
    const fyMatch = infoSection.match(/<span>([^<]+)<\/span>/)
    const locMatch = infoSection.match(/<p>([^<]+)<\/p>/)
    if (!imgMatch || !nameMatch || !fyMatch || !locMatch) continue

    const name = nameMatch[1].trim()
    const fiscalYear = fyMatch[1].trim()
    const location = locMatch[1].trim()
    const remotePath = imgMatch[1].trim()
    const imageUrl = remotePath.startsWith('http') ? remotePath : new URL(remotePath, BASE).href
    const ext = path.extname(remotePath) || '.jpg'
    const id = slugify(name)
    const filename = `${id}${ext}`
    const localPath = path.join(OUT_DIR, filename)

    const imgRes = await fetch(imageUrl)
    if (!imgRes.ok) throw new Error(`Image fetch failed ${imageUrl}: ${imgRes.status}`)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    fs.writeFileSync(localPath, buf)

    const socials = parseSocials(imgSection)
    presidents.push({
      id,
      name,
      fiscalYear,
      location,
      image: `/past-presidents/${filename}`,
      socials,
      sortOrder: fiscalStartYear(fiscalYear),
    })
  }

  presidents.sort((a, b) => a.sortOrder - b.sortOrder)

  fs.writeFileSync(JSON_PATH, JSON.stringify(presidents, null, 2) + '\n', 'utf8')
  console.log(`Saved ${presidents.length} presidents to ${JSON_PATH}`)
  console.log(`Images in ${OUT_DIR}`)
  const withSocials = presidents.filter((p) => Object.keys(p.socials).length > 0).length
  console.log(`Presidents with social URLs on source: ${withSocials}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
