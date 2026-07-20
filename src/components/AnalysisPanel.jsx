import { useAppContext } from '../context/AppContext';
import { FiSearch } from 'react-icons/fi';
import Skeleton from './Skeleton';

export default function AnalysisPanel({ mode }) {
  const { state } = useAppContext();

  if (mode === 'scanning') {
    return (
      <div className="panel">
        <h3><FiSearch style={{ marginRight: '0.5rem' }} />Analysis in progress...</h3>
        <div style={{ marginTop: '1rem' }}>
          <Skeleton width="80%" height="1.2rem" style={{ marginBottom: '0.8rem' }} />
          <Skeleton width="60%" height="1rem" style={{ marginBottom: '0.8rem' }} />
          <Skeleton width="90%" height="1rem" style={{ marginBottom: '0.8rem' }} />
          <Skeleton width="70%" height="1rem" style={{ marginBottom: '0.8rem' }} />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Skeleton width="40%" height="1rem" style={{ marginBottom: '0.5rem' }} />
          <Skeleton width="50%" height="1rem" style={{ marginBottom: '0.5rem' }} />
        </div>
      </div>
    );
  }

  // Results mode
  const { analysis } = state;
  if (!analysis) return null;

  return (
    <div className="panel">
      <h3><FiSearch style={{ marginRight: '0.5rem' }} />Analysis Results</h3>
      <div>
        <strong>Findings:</strong>
        {analysis.findings.length === 0 ? (
          <p>No sensitive data detected.</p>
        ) : (
          <ul className="findings-list">
            {analysis.findings.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <strong>Metadata:</strong>
        <ul className="metadata-list">
          {Object.entries(analysis.metadata).map(([key, value]) => (
            <li key={key}><em>{key}:</em> {value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}