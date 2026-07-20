export default function SeverityDonut({ findings }) {
  // Count severity levels
  const counts = { high: 0, medium: 0, low: 0 };
  findings.forEach(f => {
    if (f.includes('(high)')) counts.high++;
    else if (f.includes('(medium)')) counts.medium++;
    else counts.low++;
  });

  const total = findings.length;
  const radius = 38;            // bigger radius
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 8;        // thicker ring

  // Calculate dash arrays
  const highOffset = total > 0 ? (counts.high / total) * circumference : 0;
  const mediumOffset = total > 0 ? (counts.medium / total) * circumference : 0;
  const lowOffset = total > 0 ? (counts.low / total) * circumference : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Background ring */}
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke="#2a3240"
          strokeWidth={strokeWidth}
        />
        {/* High severity arc */}
        {highOffset > 0 && (
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${highOffset} ${circumference - highOffset}`}
            strokeDashoffset="0"
            transform="rotate(-90 70 70)"
          />
        )}
        {/* Medium severity arc */}
        {mediumOffset > 0 && (
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${mediumOffset} ${circumference - mediumOffset}`}
            strokeDashoffset={-highOffset}
            transform="rotate(-90 70 70)"
          />
        )}
        {/* Low severity arc */}
        {lowOffset > 0 && (
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${lowOffset} ${circumference - lowOffset}`}
            strokeDashoffset={-(highOffset + mediumOffset)}
            transform="rotate(-90 70 70)"
          />
        )}
        {/* Centre text */}
        <text
          x="70" y="72"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="1.4rem"
          fontWeight="bold"
        >
          {total}
        </text>
        <text
          x="70" y="90"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="0.8rem"
        >
          findings
        </text>
      </svg>

      {/* Legend below the donut, clean and readable */}
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', marginTop: '0.3rem' }}>
        <span style={{ color: '#ef4444', fontWeight: 600 }}>
          ● {counts.high} high
        </span>
        <span style={{ color: '#f59e0b', fontWeight: 600 }}>
          ● {counts.medium} med
        </span>
        <span style={{ color: '#10b981', fontWeight: 600 }}>
          ● {counts.low} low
        </span>
      </div>
    </div>
  );
}