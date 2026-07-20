export default function RiskGauge({ score }) {
  const radius = 60;
  const circumference = Math.PI * radius;
  const fill = (score / 100) * circumference;
  // Color based on score
  const getColor = (s) => {
    if (s >= 70) return '#ef4444';
    if (s >= 40) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="gauge-container">
      <svg width="180" height="120" viewBox="0 0 180 120">
        <path
          d={`M 30 110 A ${radius} ${radius} 0 0 1 150 110`}
          fill="none"
          stroke="#2a3240"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M 30 110 A ${radius} ${radius} 0 0 1 150 110`}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="12"
          strokeDasharray={`${fill} ${circumference}`}
          strokeLinecap="round"
        />
        <text x="90" y="100" textAnchor="middle" fontSize="1.4rem" fontWeight="bold" fill="currentColor">
          {score}/100
        </text>
      </svg>
    </div>
  );
}