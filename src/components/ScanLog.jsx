import { useEffect, useState } from 'react';

// Simulated scan steps with typewriter effect
const SCAN_STEPS = [
  '[OK] Validating file...',
  '[OK] Reading file contents...',
  '[OK] Computing SHA-256 hash...',
  '[SCAN] Scanning for PII patterns...',
  '[SCAN] Checking for emails, SSNs, credit cards...',
  '[SCAN] Assessing risk level...',
  '[OK] Analysis complete.',
];

export default function ScanLog() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= SCAN_STEPS.length) return;

    const timeout = setTimeout(() => {
      setVisibleLines(prev => [...prev, SCAN_STEPS[stepIndex]]);
      setStepIndex(prev => prev + 1);
    }, stepIndex === 0 ? 400 : 800); // first line appears quickly

    return () => clearTimeout(timeout);
  }, [stepIndex]);

  return (
    <div className="scan-log">
      {visibleLines.map((line, i) => (
        <div key={i} className="log-line">{line}</div>
      ))}
      {stepIndex < SCAN_STEPS.length && (
        <div className="log-line">
          <span className="cursor-blink">▌</span>
        </div>
      )}
    </div>
  );
}