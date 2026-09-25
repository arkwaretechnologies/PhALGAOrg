import SubpageLayout from '@/components/SubpageLayout'
import DownloadsBrowser from '@/components/DownloadsBrowser'
import { downloadCategories } from '@/lib/content'

export const metadata = {
  title: 'Downloads',
  description: 'Download conference lectures, presentations, circulars, and other resources from PhALGA events and activities.',
}

export default function DownloadsPage() {
  return (
    <SubpageLayout
      eyebrow="Resource library"
      title="Downloads"
      subtitle="Access conference lectures, presentations, and reference materials from PhALGA events."
    >
      <DownloadsBrowser categories={downloadCategories} />
    </SubpageLayout>
  )
}
