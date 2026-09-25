import fs from 'fs'
import path from 'path'

/** Fallback titles by order number, used when a year has no roster below. */
export const officerPositions: Record<number, string> = {
  1: 'President',
  2: 'Executive Vice President',
}

type RosterEntry = { name: string; position: string; lgu: string; group: OfficerGroup }

export type OfficerGroup = 'president' | 'vice-presidents' | 'secretariat' | 'trustees' | 'advisers'

/**
 * Names, titles and LGUs as printed on each officer's portrait card, keyed by the
 * number at the start of the image filename.
 */
const rosters: Record<string, Record<number, RosterEntry>> = {
  '2025-2026': {
    1: { name: 'Ledenia A. Flores, CPA, MBA, RN', position: 'President', lgu: 'Municipal Accountant of Kumalarang, Zamboanga del Sur', group: 'president' },
    2: { name: 'Atty. Marlon C. Operaña, CPA, MBA, CESE', position: 'Executive Vice President', lgu: 'Provincial Accountant of Pangasinan', group: 'vice-presidents' },
    3: { name: 'Lito F. Melegrito, CPA', position: 'Vice President for Northern Luzon', lgu: 'Municipal Accountant of Gerona, Tarlac', group: 'vice-presidents' },
    4: { name: 'Atty. Christine N. Meralpes, CPA', position: 'Vice President for Southern Luzon', lgu: 'City Accountant, City of Sorsogon', group: 'vice-presidents' },
    5: { name: 'Atty. Jose Neil D. Lumongsod, CPA', position: 'Vice President for Visayas', lgu: 'City Accountant, City of Bogo', group: 'vice-presidents' },
    6: { name: 'Ritchleen Jasebelle Grace A. Buray, CPA', position: 'Vice President for Mindanao', lgu: 'Municipal Accountant of Laguindingan, Misamis Oriental', group: 'vice-presidents' },
    7: { name: 'Marie Jun O. Maturan, CPA', position: 'Secretary', lgu: 'Municipal Accountant of Amlan, Negros Oriental', group: 'secretariat' },
    8: { name: 'Cristine A. Waje, CPA', position: 'Treasurer', lgu: 'Municipal Accountant of Gumaca, Quezon', group: 'secretariat' },
    9: { name: 'Nancy A. Torres, CPA, DBA', position: 'Auditor', lgu: 'Municipal Accountant of Bacnotan, La Union', group: 'secretariat' },
    10: { name: 'Arthur Ryan A. Oyong, CPA', position: 'PRO', lgu: 'Municipal Accountant of Hinundayan, Southern Leyte', group: 'secretariat' },
    11: { name: 'Marivic Su. Carpitanos, CPA, MBA', position: 'Trustee', lgu: 'Provincial Accountant of Zamboanga del Norte', group: 'trustees' },
    12: { name: 'Ruby S. Socrates, CPA', position: 'Trustee', lgu: 'Municipal Accountant of Taytay, Palawan', group: 'trustees' },
    13: { name: 'Asteria P. Cesar, CPA', position: 'Trustee', lgu: 'Municipal Accountant of Lianga, Surigao del Sur', group: 'trustees' },
    14: { name: 'Alma C. Libo-on, CPA', position: 'Immediate Past President', lgu: 'Municipal Accountant of Pototan, Iloilo', group: 'trustees' },
    15: { name: 'Atty. Smith O. Valdez, CPA', position: 'Adviser', lgu: 'Municipal Accountant of San Agustin, Isabela', group: 'advisers' },
    16: { name: 'Narvin B. Lachica, CPA', position: 'Adviser', lgu: 'Municipal Accountant of Alabel, Sarangani', group: 'advisers' },
    17: { name: 'Vicente Luis D. Marcos, CPA, JD', position: 'Adviser', lgu: 'Municipal Accountant of Malinao, Aklan', group: 'advisers' },
    18: { name: 'Lucia P. Kisim, CPA', position: 'Adviser', lgu: 'Provincial Accountant of Benguet', group: 'advisers' },
    19: { name: 'Mary Jane H. Lluisma, CPA', position: 'Adviser', lgu: 'Municipal Accountant of Linamon, Lanao del Norte', group: 'advisers' },
    20: { name: 'Arlene Rio S. Villar, CPA', position: 'Adviser', lgu: 'Municipal Accountant of Albuera, Leyte', group: 'advisers' },
    21: { name: 'Roselie A. Pangilinan, CPA, CSEE', position: 'Adviser', lgu: 'City Accountant, City of Imus', group: 'advisers' },
    22: { name: 'Dr. Emmanuel D. Magsino, CPA', position: 'Adviser', lgu: 'City Accountant, City of General Trias', group: 'advisers' },
  },
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
  lgu?: string
  group: OfficerGroup
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
    const known = rosters[year]?.[num]
    officers.push({
      number: num,
      filename: file,
      name: known?.name ?? (name || file),
      year,
      position: known?.position ?? officerPositions[num] ?? 'National Officer',
      lgu: known?.lgu,
      group: known?.group ?? (num === 1 ? 'president' : 'secretariat'),
    })
  }

  officers.sort((a, b) => a.number - b.number)
  return officers
}
