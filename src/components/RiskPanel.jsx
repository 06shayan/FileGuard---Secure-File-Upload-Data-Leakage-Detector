import { useAppContext } from '../context/AppContext';
import { FiUpload, FiRefreshCw,FiCheckCircle } from 'react-icons/fi';
import RiskGauge from './RiskGauge';
import SeverityDonut from './SeverityDonut';

export default function RiskPanel() {
  const { state, dispatch } = useAppContext();
  const { risk, analysis } = state;
  if (!risk) return null;

  const handleUpload = () => dispatch({ type: 'UPLOAD_COMPLETE' });
  const handleReset = () => dispatch({ type: 'RESET' });

  return (
    <div className="panel">
      <h3>Risk Assessment</h3>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 200px' }}>
          <RiskGauge score={risk.score} />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <SeverityDonut findings={analysis?.findings || []} />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <strong>Recommendations:</strong>
        <ul className="findings-list">
          {risk.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
        </ul>
      </div>
      <div className="actions">
        {state.phase === 'results' && (
          <button className="btn-success" onClick={handleUpload}>
            <FiUpload style={{ marginRight: '0.3rem' }} /> Upload Report
          </button>
        )}
        {state.phase === 'uploadComplete' && (
          <button className="btn-success" disabled>
            <FiCheckCircle /> Uploaded ✓
          </button>
        )}
        <button className="btn-outline" onClick={handleReset}>
          <FiRefreshCw style={{ marginRight: '0.3rem' }} /> Scan Another
        </button>
      </div>
    </div>
  );
}