import Image from 'next/image'
import SubpageLayout from '@/components/SubpageLayout'
import { getOfficersFromPublicFolder, type OfficerFromFile } from '@/lib/officers'
import './OrgChart.css'

export const metadata = {
  title: 'PhALGA Officers',
  description:
    'Meet the National Officers, Council of Advisers, and Past Presidents of the Philippine Association of Local Government Accountants.',
}

type TierKind = 'president' | 'vp' | 'executive' | 'board'

function OrgNode({
  o,
  tier,
}: {
  o: OfficerFromFile
  tier: TierKind
}) {
  const nodeClass =
    tier === 'president'
      ? 'org-node org-node--president'
      : tier === 'vp'
        ? 'org-node org-node--vp'
        : 'org-node'

  return (
    <article className={nodeClass}>
      <div className="org-node-photo">
        <Image
          src={`/Officers/${o.year}/${o.filename}`}
          alt={`${o.name} - ${o.position}`}
          width={400}
          height={300}
          className="w-full h-full object-cover object-top"
          sizes="(max-width: 640px) 280px, (max-width: 900px) 200px, 320px"
        />
      </div>
    </article>
  )
}

export default function OfficersPage() {
  const officers = getOfficersFromPublicFolder()
  const year = officers.length > 0 ? officers[0].year : null

  const president = officers.find((o) => o.number === 1)
  const vp = officers.find((o) => o.number === 2)
  const executive = officers.filter((o) => o.number >= 3 && o.number <= 6) // Secretary, Treasurer, Auditor, PRO
  const board = officers.filter((o) => o.number >= 7)

  return (
    <SubpageLayout
      title="PhALGA Officers"
      subtitle="Meet the dedicated leaders serving the Philippine Association of Local Government Accountants."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      <div className="subpage-content-inner bg-[var(--sub-white)]">
        {/* Centered to align with flag-bar star (same left: 50% + translateX(-50%) reference) */}
        <div className="officers-center-ref">
          <div className="officers-center-ref-inner">
            {year && (
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  National Officers {year}
                </h2>
                <p className="mt-2 text-gray-600 text-lg">
                  Organizational chart
                </p>
              </div>
            )}

            {officers.length > 0 ? (
              <div className="org-chart">
              {/* Tier 1: President */}
              {president && (
                <div className="org-tier has-connector">
                  <div className="org-tier-label">
                    <span>Leadership</span>
                  </div>
                  <div className="org-row">
                    <OrgNode o={president} tier="president" />
                  </div>
                </div>
              )}

              {/* Tier 2: Vice President */}
              {vp && (
                <div className="org-tier has-connector">
                  <div className="org-row">
                    <OrgNode o={vp} tier="vp" />
                  </div>
                </div>
              )}

              {/* Tier 3: Executive (Secretary, Treasurer, Auditor, PRO) */}
              {executive.length > 0 && (
                <div className="org-tier has-connector">
                  <div className="org-tier-label">
                    <span>Executive Officers</span>
                  </div>
                  <div className="org-row org-row--executive">
                    {executive.map((o) => (
                      <OrgNode key={`${o.year}-${o.filename}`} o={o} tier="executive" />
                    ))}
                  </div>
                </div>
              )}

              {/* Tier 4: Board Members */}
              {board.length > 0 && (
                <div className="org-tier org-tier--board has-connector">
                  <div className="org-tier-label">
                    <span>Board of Directors</span>
                  </div>
                  <div className="org-row">
                    {board.map((o) => (
                      <OrgNode key={`${o.year}-${o.filename}`} o={o} tier="board" />
                    ))}
                  </div>
                </div>
              )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
              <p>
                No officer images found in{' '}
                <code className="bg-gray-100 px-1 rounded">public/Officers</code>.
              </p>
              <p className="mt-2 text-sm">
                Add a year folder (e.g. 2025-2026) with images named like{' '}
                <code className="bg-gray-100 px-1 rounded">01 name.jpg</code>,{' '}
                <code className="bg-gray-100 px-1 rounded">02 name.jpg</code> to
                display them here, ordered by the number in the filename.
              </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SubpageLayout>
  )
}
