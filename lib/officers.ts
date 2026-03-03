import fs from 'fs'
import path from 'path'

/** Officer titles by order number (1 = President, etc.) */
export const officerPositions: Record<number, string> = {
  1: 'President',
  2: 'Vice President',
  3: 'Secretary',
  4: 'Treasurer',
  5: 'Auditor',
  6: 'Public Relations Officer',
  7: 'Board Member',
  8: 'Board Member',
  9: 'Board Member',
  10: 'Board Member',
  11: 'Board Member',
  12: 'Board Member',
  13: 'Board Member',
  14: 'Board Member',
  15: 'Board Member',
  16: 'Board Member',
  17: 'Board Member',
  18: 'Board Member',
  19: 'Board Member',
  20: 'Board Member',
  21: 'Board Member',
  22: 'Board Member',
}

const IMAGE_EXT = /\.(jpg|jpeg|png|webp|gif)$/i
/** Match leading number in filename, e.g. "01 flores.jpg" -> 1, "flores" */
const NUMBER_PREFIX = /^(\d+)\s*(.+?)\.(jpg|jpeg|png|webp|gif)$/i

export type OfficerFromFile = {
  number: number
  filename: string
  name: string
  year: string
  position: string
}

/**
 * Reads public/Officers, discovers year folders (e.g. 2025-2026),
 * lists image files in the latest year, and returns them sorted by the number in the filename.
 * Safe to call from Server Components; returns [] if folder is missing or empty.
 */
export function getOfficersFromPublicFolder(): OfficerFromFile[] {
  const officersDir = path.join(process.cwd(), 'public', 'Officers')
  if (!fs.existsSync(officersDir) || !fs.statSync(officersDir).isDirectory()) {
    return []
  }

  const entries = fs.readdirSync(officersDir, { withFileTypes: true })
  const yearFolders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort()
    .reverse()

  const year = yearFolders[0]
  if (!year) return []

  const yearPath = path.join(officersDir, year)
  const files = fs.readdirSync(yearPath)

  const officers: OfficerFromFile[] = []
  for (const file of files) {
    if (!IMAGE_EXT.test(file)) continue
    const match = file.match(NUMBER_PREFIX)
    const num = match ? parseInt(match[1], 10) : 0
    const namePart = match ? match[2].trim() : path.basename(file, path.extname(file))
    const name = namePart
      .split(/[\s-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ')
    officers.push({
      number: num,
      filename: file,
      name: name || file,
      year,
      position: officerPositions[num] ?? 'Board Member',
    })
  }

  officers.sort((a, b) => a.number - b.number)
  return officers
}
