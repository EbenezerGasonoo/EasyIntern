import { getAptitudeScore, getAptitudePieSegments } from '../utils/aptitudeScore'
import './AptitudeChart.css'

const CHART_SIZE = 140
const STROKE = 12
const RADIUS = (CHART_SIZE - STROKE) / 2
const CX = CHART_SIZE / 2
const CY = CHART_SIZE / 2

export function AptitudeChart({ intern, showPie = false, showBreakdown = true }) {
  const { score, breakdown } = getAptitudeScore(intern)
  const segments = showPie ? getAptitudePieSegments(intern) : []

  // Donut: circumference = 2 * PI * RADIUS
  const circumference = 2 * Math.PI * RADIUS
  const filled = (score / 100) * circumference

  return (
    <div className="aptitude-chart-wrap">
      <div className="aptitude-chart-header">
        <span className="aptitude-chart-title">Profile strength</span>
        {showBreakdown && (
          <span className="aptitude-chart-hint">Completeness score for recruiters</span>
        )}
      </div>
      <div className="aptitude-chart-row">
        <div className="aptitude-donut-wrap">
          <svg width={CHART_SIZE} height={CHART_SIZE} className="aptitude-donut" viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}>
            <circle
              className="aptitude-donut-bg"
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
            />
            <circle
              className="aptitude-donut-fill"
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeDasharray={`${filled} ${circumference - filled}`}
              strokeDashoffset={0}
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          </svg>
          <span className="aptitude-donut-value">{score}</span>
        </div>
        {showPie && segments.length > 0 && (
          <div className="aptitude-pie-wrap">
            <svg width={CHART_SIZE} height={CHART_SIZE} viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`} className="aptitude-pie">
              {(() => {
                let offset = 0
                const total = segments.reduce((s, seg) => s + seg.value, 0) || 1
                return segments.map((seg, i) => {
                  const angle = (seg.value / total) * 360
                  const d = describeArc(CX, CY, RADIUS, offset, offset + angle)
                  offset += angle
                  return (
                    <path
                      key={seg.label}
                      d={d}
                      fill={seg.color}
                      className="aptitude-pie-segment"
                    />
                  )
                })
              })()}
            </svg>
            <div className="aptitude-pie-legend">
              {segments.map((seg) => (
                <div key={seg.label} className="aptitude-pie-legend-item">
                  <span className="aptitude-pie-dot" style={{ backgroundColor: seg.color }} />
                  <span>{seg.label} {seg.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {showBreakdown && !showPie && (
          <ul className="aptitude-breakdown">
            {breakdown.map((b) => (
              <li key={b.label} className={b.value >= b.max ? 'complete' : ''}>
                {b.value >= b.max ? '✓' : '○'} {b.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const start = toRad(startAngle)
  const end = toRad(endAngle)
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

export default AptitudeChart
