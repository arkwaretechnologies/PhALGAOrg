import Image from 'next/image'
import SubpageLayout from '@/components/SubpageLayout'
import { getOfficersFromPublicFolder, type OfficerFromFile } from '@/lib/officers'

export const metadata = {
  title: 'PhALGA Officers',
  description:
    'Meet the National Officers, Council of Advisers, and Past Presidents of the Philippine Association of Local Government Accountants.',
}

// Layout: 01,02 one per row; 03-06 same row (4 cols); 07-10 one per row; 11-13 same row (3); rest 4 per row
function OfficerCard({ o }: { o: OfficerFromFile }) {
  return (
    <div className="relative w-full aspect-[3/4] min-h-[280px] flex items-center justify-center">
      <Image
        src={`/Officers/${o.year}/${o.filename}`}
        alt={`${o.name} - ${o.position}`}
        width={500}
        height={667}
        className="w-full h-full object-contain object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
      />
    </div>
  )
}

// ── OfficersPage ──────────────────────────────────────────────────────────────
export default function OfficersPage() {
  const officers = getOfficersFromPublicFolder()
  const year = officers.length > 0 ? officers[0].year : null

  const row01_02 = officers.filter((o) => o.number >= 1 && o.number <= 2)
  const row03_06 = officers.filter((o) => o.number >= 3 && o.number <= 6)
  const row07_10 = officers.filter((o) => o.number >= 7 && o.number <= 10)
  const row11_13 = officers.filter((o) => o.number >= 11 && o.number <= 13)
  const rest = officers.filter((o) => o.number >= 14)

  return (
    <SubpageLayout
      title="PhALGA Officers"
      subtitle="Meet the dedicated leaders serving the Philippine Association of Local Government Accountants."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      <div className="bg-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {year && (
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                National Officers {year}
              </h2>
            </div>
          )}
          {officers.length > 0 ? (
            <div className="space-y-6">
              {/* 01, 02: one per row */}
              {row01_02.length > 0 && (
                <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
                  {row01_02.map((o) => (
                    <OfficerCard key={`${o.year}-${o.filename}`} o={o} />
                  ))}
                </div>
              )}
              {/* 03, 04, 05, 06: same row (4 cols) */}
              {row03_06.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {row03_06.map((o) => (
                    <OfficerCard key={`${o.year}-${o.filename}`} o={o} />
                  ))}
                </div>
              )}
              {/* 07, 08, 09, 10: one per row */}
              {row07_10.length > 0 && (
                <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
                  {row07_10.map((o) => (
                    <OfficerCard key={`${o.year}-${o.filename}`} o={o} />
                  ))}
                </div>
              )}
              {/* 11, 12, 13: same row (3 cols) */}
              {row11_13.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {row11_13.map((o) => (
                    <OfficerCard key={`${o.year}-${o.filename}`} o={o} />
                  ))}
                </div>
              )}
              {/* Rest: 4 per row */}
              {rest.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {rest.map((o) => (
                    <OfficerCard key={`${o.year}-${o.filename}`} o={o} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p>No officer images found in <code className="bg-gray-100 px-1 rounded">public/Officers</code>.</p>
              <p className="mt-2 text-sm">Add a year folder (e.g. 2025-2026) with images named like <code className="bg-gray-100 px-1 rounded">01 name.jpg</code>, <code className="bg-gray-100 px-1 rounded">02 name.jpg</code> to display them here, ordered by the number in the filename.</p>
            </div>
          )}
        </div>
      </div>
    </SubpageLayout>
  )
}