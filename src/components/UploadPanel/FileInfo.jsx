import { useAppContext } from '../../context/AppContext';
import { FiFile, FiPlay } from 'react-icons/fi';

export default function FileInfo() {
  const { state, dispatch } = useAppContext();
  const file = state.file;
  if (!file) return null;

  const handleStartScan = () => {
    dispatch({ type: 'START_SCAN' });
  };

  return (
    <div className="file-info">
      <div>
        <FiFile style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
        <strong>{file.name}</strong>
        <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
      </div>
      <button className="btn-primary" onClick={handleStartScan}>
        <FiPlay style={{ marginRight: '0.3rem' }} /> Scan File
      </button>
    </div>
  );
}