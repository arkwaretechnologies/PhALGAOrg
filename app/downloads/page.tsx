import SubpageLayout from '@/components/SubpageLayout'
import DownloadsBrowser, { type DownloadCategory } from '@/components/DownloadsBrowser'

export const metadata = {
  title: 'Downloads',
  description: 'Download conference lectures, presentations, circulars, and other resources from PhALGA events and activities.',
}

const downloadCategories: DownloadCategory[] = [
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

export default function DownloadsPage() {
  return (
    <SubpageLayout
      title="Downloads"
      subtitle="Access conference lectures, presentations, and other resources."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      <div className="subpage-center-ref">
        <div className="subpage-center-ref-inner w-full">
          <DownloadsBrowser categories={downloadCategories} />
        </div>
      </div>
    </SubpageLayout>
  )
}
