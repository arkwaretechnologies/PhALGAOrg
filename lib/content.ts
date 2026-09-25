/**
 * Site content shared by the home page and the subpages, so the same facts are
 * stated in one place.
 */

export type EventEntry = {
  title: string
  /** Conference edition, e.g. "20". */
  edition: string
  /** Short caption, e.g. "ANC 2024" or "Mindanao". */
  badge: string
  date: string
  location: string
}

export type EventSeries = {
  title: string
  shortTitle: string
  kicker: string
  description: string
  events: EventEntry[]
}

export const eventSeries: EventSeries[] = [
  {
    title: 'Annual National Conference',
    shortTitle: 'National',
    kicker: 'Flagship Event',
    description:
      'Our premier annual event bringing together local government accountants from across the country. Features updates on COA circulars, DILG memorandums, and best practices.',
    events: [
      { title: '20th Annual National Conference', edition: '20', badge: 'ANC 2024', date: '2024', location: 'Iloilo City' },
      { title: '19th Annual National Conference', edition: '19', badge: 'ANC 2023', date: '2023', location: 'Baguio City' },
    ],
  },
  {
    title: 'Geographical Conferences',
    shortTitle: 'Geographical',
    kicker: 'Regional Programme',
    description:
      'Regional conferences covering Northern Luzon, Southern Luzon, Visayas, and Mindanao with comprehensive lectures and updates.',
    events: [
      { title: '17th Northern Luzon Geographical Conference', edition: '17', badge: 'N. Luzon', date: '2024', location: 'Laoag City' },
      { title: '17th Southern Luzon Geographical Conference', edition: '17', badge: 'S. Luzon', date: '2024', location: 'To be announced' },
      { title: '17th Visayas Geographical Conference', edition: '17', badge: 'Visayas', date: '2024', location: 'Dumaguete City' },
      { title: '17th Mindanao Geographical Conference', edition: '17', badge: 'Mindanao', date: '2024', location: 'Zamboanga City' },
    ],
  },
]

export type DownloadItem = { title: string; description: string }

export type DownloadCategory = {
  title: string
  shortTitle: string
  kicker: string
  description: string
  items: DownloadItem[]
}

export const downloadCategories: DownloadCategory[] = [
  {
    title: '20th Annual National Conference',
    shortTitle: '20th National',
    kicker: 'National Conference',
    description: 'Presentations and lectures from the 20th Annual National Conference',
    items: [
      { title: 'COA Lecture', description: 'Commission on Audit updates and guidelines' },
      { title: 'DBM Lecture', description: 'Department of Budget and Management presentation' },
      { title: 'DILG Lecture', description: 'Department of the Interior and Local Government updates' },
      { title: 'OMBUDSMAN Lecture', description: 'Office of the Ombudsman presentation' },
    ],
  },
  {
    title: '17th Northern Luzon Geographical Conference',
    shortTitle: 'Northern Luzon',
    kicker: 'Geographical Conference',
    description: 'Lectures and presentations from Laoag City conference',
    items: [
      { title: 'IIUUEE Presentation', description: 'Internal and external audit updates' },
      { title: 'Barangay-SK Budgeting Process', description: 'Budgeting guidelines for barangays and SK' },
      { title: 'Tourism Updates 2025', description: 'Tourism-related accounting updates' },
      { title: 'Enhancing Performance, Promoting Good Governance', description: 'Good governance practices' },
    ],
  },
  {
    title: '17th Southern Luzon Geographical Conference',
    shortTitle: 'Southern Luzon',
    kicker: 'Geographical Conference',
    description: 'Materials from the Southern Luzon conference',
    items: [
      { title: 'DILG Updates', description: 'DILG memorandum and guidelines' },
      { title: 'The New Government Procurement Act (RA 12009)', description: 'Procurement law updates' },
      { title: 'Withholding Tax Obligations', description: 'BIR updates on withholding taxes for LGUs' },
    ],
  },
  {
    title: '17th Visayas Geographical Conference',
    shortTitle: 'Visayas',
    kicker: 'Geographical Conference',
    description: 'Resources from the Visayas conference in Dumaguete',
    items: [
      { title: 'Barangay-SK Budgeting Process', description: 'Budgeting process for barangays' },
      { title: 'COA Updates', description: 'Latest COA circulars and requirements' },
    ],
  },
  {
    title: '17th Mindanao Geographical Conference',
    shortTitle: 'Mindanao',
    kicker: 'Geographical Conference',
    description: 'Presentations from the Mindanao conference in Zamboanga',
    items: [
      { title: 'EOPT Presentation', description: 'Ease of Paying Taxes updates' },
      { title: 'Gender Planning and Budgeting', description: 'Gender-responsive budgeting' },
      { title: 'NYC Presentation', description: 'National Youth Commission updates' },
    ],
  },
  {
    title: 'Other Resources',
    shortTitle: 'Other Resources',
    kicker: 'Reference Materials',
    description: 'Additional downloads and reference materials',
    items: [
      { title: 'BIR Updates', description: 'Bureau of Internal Revenue circulars and updates' },
      { title: 'GPPB Presentations', description: 'Government Procurement Policy Board materials' },
      { title: 'HR Actions Guidelines', description: 'Human resource actions and procedures' },
    ],
  },
]

export type Circular = { title: string; description: string; date: string; agency: string }

export type CircularCategory = {
  title: string
  shortTitle: string
  description: string
  circulars: Circular[]
}

export const circularCategories: CircularCategory[] = [
  {
    title: 'COA Circulars',
    shortTitle: 'COA',
    description: 'Commission on Audit circulars and updates',
    circulars: [
      { title: 'COA Circular 2020-004', description: 'Updates on latest guidelines and documentary requirements', date: '2024', agency: 'COA' },
      { title: 'COA Circular 2019-001', description: 'Barangay accounting and financial reporting guidelines', date: '2019', agency: 'COA' },
      { title: 'COA Circular 2015-008', description: 'Road network and infrastructure accounting', date: '2015', agency: 'COA' },
    ],
  },
  {
    title: 'DILG Memorandums',
    shortTitle: 'DILG',
    description: 'Department of the Interior and Local Government memorandums',
    circulars: [
      { title: 'DILG MC 2023-047', description: 'Memorandum circular on local government financial management', date: '2023', agency: 'DILG' },
      { title: 'Mandanas Ruling', description: 'Supreme Court ruling on local government share in national taxes', date: '2023', agency: 'DILG' },
    ],
  },
  {
    title: 'Other Government Circulars',
    shortTitle: 'DBM · BIR · OP',
    description: 'Circulars from DBM, BIR, and other relevant agencies',
    circulars: [
      { title: 'DBM Circulars', description: 'Department of Budget and Management guidelines', date: '2024', agency: 'DBM' },
      { title: 'BIR Updates', description: 'Bureau of Internal Revenue updates for LGUs', date: '2024', agency: 'BIR' },
      { title: 'EO 77', description: 'Executive Order on local government accounting', date: '2019', agency: 'OP' },
    ],
  },
]

/** The 2004 founding milestones, as recorded on phalga.org/About.html. */
export const milestones = [
  {
    date: '1991',
    title: 'RA 7160 creates the role',
    text: 'The Local Government Code of 1991 mandates that every provincial, city and municipal government shall have an accountant who takes charge of both the accounting and internal audit services of the local government unit concerned.',
  },
  {
    date: 'Before 2004',
    title: 'Provincial associations lead the way',
    text: 'Accountants organised at the provincial level first — the League of Accountants in the Municipalities of Batangas (LAMB), the Laguna Association of Local Government Accountants (LALGA), and the Association of Local Accountants of Cavite (ALAC). Earlier attempts at a single national association did not succeed for reasons beyond the group’s control.',
  },
  {
    date: 'June 25, 2004',
    title: 'A meeting is called in Tagaytay City',
    text: 'At the 2nd Quarter Regional Conference of PICPA Southern Luzon Region, held at the Development Academy of the Philippines in Tagaytay City, the LGU accountants in attendance set a meeting to organise a national association.',
  },
  {
    date: 'August 6, 2004',
    title: 'The committee is formed in Sta. Rosa, Laguna',
    text: 'Accountants from LAMB, LALGA and ALAC met at Twin Dragon Restaurant in Sta. Rosa, Laguna and formed the committee that would spearhead the organisation of the long-envisioned national association. A joint conference was conceived as the first step.',
  },
  {
    date: 'August 21, 2004',
    title: 'PhALGA is born in Calamba City',
    text: 'At the One Day Joint Conference of Local Government Accountants at Montevista Resort in Calamba City, Laguna, the Philippine Association of Local Government Accountants (PhALGA), Inc. was born, and its first Officers and Board of Directors were elected.',
  },
  {
    date: 'September 24, 2004',
    title: 'Registered with the SEC',
    text: 'PhALGA, Inc. was registered with the Securities and Exchange Commission under SEC Registration No. CN200415172.',
  },
]
