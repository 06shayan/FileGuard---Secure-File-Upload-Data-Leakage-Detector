import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { FiSave,FiSettings } from 'react-icons/fi';

export default function SettingsPanel() {
  const { state, dispatch } = useAppContext();
  const { policies } = state;

  const [fileSettings, setFileSettings] = useState({
    maxSizeMB: (policies.file.maxSizeBytes / (1024 * 1024)).toFixed(1),
    allowedTypes: policies.file.allowedTypes.join(', '),
    blockedExtensions: policies.file.blockedExtensions.join(', '),
  });
  const [highThreshold, setHighThreshold] = useState(policies.thresholds.high.minScore);
  const [mediumThreshold, setMediumThreshold] = useState(policies.thresholds.medium.minScore);

  const handleSave = () => {
    const newPolicies = {
      file: {
        maxSizeBytes: parseFloat(fileSettings.maxSizeMB) * 1024 * 1024,
        allowedTypes: fileSettings.allowedTypes.split(',').map(s => s.trim()).filter(Boolean),
        blockedExtensions: fileSettings.blockedExtensions.split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
      },
      thresholds: {
        high: { minScore: parseInt(highThreshold, 10), label: 'High Risk' },
        medium: { minScore: parseInt(mediumThreshold, 10), label: 'Medium Risk' },
        low: { minScore: 0, label: 'Low Risk' },
      },
      // keep existing pii patterns unchanged for now (could add later)
    };
    dispatch({ type: 'SET_POLICIES', payload: newPolicies });
  };

  return (
    <div className="panel">
      <h2><FiSettings style={{ marginRight: '0.5rem' }} />Settings</h2>
      <div className="settings-form">
        <div className="form-group">
          <label>Max File Size (MB)</label>
          <input
            type="number"
            value={fileSettings.maxSizeMB}
            onChange={(e) => setFileSettings({ ...fileSettings, maxSizeMB: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Allowed File Types (comma-separated MIME)</label>
          <textarea
            value={fileSettings.allowedTypes}
            onChange={(e) => setFileSettings({ ...fileSettings, allowedTypes: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Blocked Extensions (comma-separated)</label>
          <input
            type="text"
            value={fileSettings.blockedExtensions}
            onChange={(e) => setFileSettings({ ...fileSettings, blockedExtensions: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>High Risk Threshold (score &ge;)</label>
          <input
            type="number"
            min="0" max="100"
            value={highThreshold}
            onChange={(e) => setHighThreshold(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Medium Risk Threshold (score &ge;)</label>
          <input
            type="number"
            min="0" max="100"
            value={mediumThreshold}
            onChange={(e) => setMediumThreshold(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <FiSave style={{ marginRight: '0.3rem' }} /> Save Policies
        </button>
      </div>
    </div>
  );
}