import { useAppContext } from '../context/AppContext';
import { FiTrash2, FiFile, FiClock } from 'react-icons/fi';

export default function HistoryPanel() {
  const { state, dispatch } = useAppContext();
  const { history } = state;

  return (
    <div className="panel">
      <h2><FiClock style={{ marginRight: '0.5rem' }} />Scan History</h2>
      {history.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No scans yet.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map(entry => (
              <li key={entry.id} className="history-item">
                <div>
                  <div className="file-name"><FiFile style={{ marginRight: '0.3rem' }} />{entry.fileName}</div>
                  <div className="meta">
                    {new Date(entry.date).toLocaleString()} &middot; {(entry.fileSize / 1024).toFixed(1)} KB &middot; Risk: {entry.riskScore}/100
                  </div>
                </div>
                <button
                  className="btn-outline"
                  onClick={() => dispatch({ type: 'DELETE_HISTORY_ITEM', payload: entry.id })}
                  title="Delete entry"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn-danger"
            style={{ marginTop: '1rem' }}
            onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}
          >
            Clear All History
          </button>
        </>
      )}
    </div>
  );
}