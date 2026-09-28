import fs from 'fs'
import path from 'path'

/** Fallback titles by order number, used when a year has no roster below. */
export const officerPositions: Record<number, string> = {
  1: 'President',
  2: 'Executive Vice President',
  3: 'Vice President',
  4: 'Vice President',
  5: 'Vice President',
  6: 'Vice President',
  7: 'Secretary',
  8: 'Treasurer',
  9: 'Auditor',
  10: 'PRO',
  11: 'Trustee',
  12: 'Trustee',
  13: 'Trustee',
  14: 'Immediate Past President',
}

type RosterEntry = { name: string; position: string; lgu: string; group: OfficerGroup }

/**
 * Layout groups by filename number:
 * 1 president · 2 executive VP · 3–6 VPs · 7–10 secretariat · 11–13 trustees · 14 IPP · 15+ advisers
 */
export type OfficerGroup =
  | 'president'
  | 'executive-vp'
  | 'vice-presidents'
  | 'secretariat'
  | 'trustees'
  | 'immediate-past-president'
  | 'advisers'

export function groupFromNumber(num: number): OfficerGroup {
  if (num === 1) return 'president'
  if (num === 2) return 'executive-vp'
  if (num >= 3 && num <= 6) return 'vice-presidents'
  if (num >= 7 && num <= 10) return 'secretariat'
  if (num >= 11 && num <= 13) return 'trustees'
  if (num === 14) return 'immediate-past-president'
  return 'advisers'
}

/**
 * Names, titles and LGUs as printed on each officer's portrait card, keyed by the
 * number at the start of the image filename.
 */
const rosters: Record<string, Record<number, RosterEntry>> = {
  '2026-2027': {
    1: { name: 'DR. Nancy A. Torres, CPA', position: 'President', lgu: 'Municipal Accountant of Bacnotan, La Union', group: 'president' },
    2: { name: 'Atty. Jose Neil D. Lumongsod, CPA', position: 'Executive Vice President', lgu: 'City Accountant,City of Bogo, Cebu', group: 'executive-vp' },
    3: { name: 'Lito F. Melegrito, CPA', position: 'Vice President for Northern Luzon', lgu: 'Municipal Accountant of Gerona, Tarlac', group: 'vice-presidents' },
    4: { name: 'Atty. Christine N. Meralpes, CPA', position: 'Vice President for Southern Luzon', lgu: 'City Accountant, City of Sorsogon', group: 'vice-presidents' },
    5: { name: 'Marie Jun O. Maturan, CPA', position: 'Vice President for Visayas', lgu: 'Municipal Accountant of Amlan, Negros Oriental', group: 'vice-presidents' },
    6: { name: 'Ritchleen Jasebelle Grace A. Buray, CPA', position: 'Vice President for Mindanao', lgu: 'Municipal Accountant of Laguindingan, Misamis Oriental', group: 'vice-presidents' },
    7: { name: 'Winnie B. Bongar, CPA', position: 'Secretary', lgu: 'Municipal Accountant of Burgos, Pangasinan', group: 'secretariat' },
    8: { name: 'Cristine A. Waje, CPA', position: 'Treasurer', lgu: 'Municipal Accountant of Gumaca, Quezon', group: 'secretariat' },
    9: { name: 'Asteria P. Cesar, CPA, MBA', position: 'Auditor', lgu: 'Municipal Accountant of Lianga, Surigao del Sur', group: 'secretariat' },
    10: { name: 'Arthur Ryan A. Oyong, CPA', position: 'PRO', lgu: 'Municipal Accountant of Hinundayan, Southern Leyte', group: 'secretariat' },
    11: { name: 'Christie A. Aquino, CPA', position: 'Trustee', lgu: 'Municipal Accountant of Paoay, Ilocos Norte', group: 'trustees' },
    12: { name: 'Rhoane T. Macrohon, CPA', position: 'Trustee', lgu: 'Municipal Accountant of Sta. Cruz, Davao del Sur', group: 'trustees' },
    13: { name: 'Ruby S. Socrates, CPA', position: 'Trustee', lgu: 'Municipal Accountant of Taytay, Palawan', group: 'trustees' },
    14: { name: 'Ledenia A. Flores, CPA, MBA, RN', position: 'Immediate Past President', lgu: 'Municipal Accountant of Kumalarang, Zamboanga del Sur', group: 'immediate-past-president' },
    15: { name: 'Alma C. Libo-on, CPA', position: 'Adviser', lgu: 'Municipal Accountant of Pototan, Iloilo', group: 'advisers' },
    16: { name: 'Atty. Smith O. Valdez, CPA', position: 'Adviser', lgu: 'Municipal Accountant of San Agustin, Isabela', group: 'advisers' },
    17: { name: 'Narvin B. Lachica, CPA', position: 'Adviser', lgu: 'Municipal Accountant of Alabel, Sarangani', group: 'advisers' },
    18: { name: 'Vicente Luis D. Marcos, CPA, JD', position: 'Adviser', lgu: 'Municipal Accountant of Malinao, Aklan', group: 'advisers' },
    19: { name: 'Lucia P. Kisim, CPA', position: 'Adviser', lgu: 'Provincial Accountant of Benguet', group: 'advisers' },
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
      group: known?.group ?? groupFromNumber(num),
    })
  }

  officers.sort((a, b) => a.number - b.number)
  return officers
}
