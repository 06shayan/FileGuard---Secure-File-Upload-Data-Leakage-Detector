import { useAppContext } from '../context/AppContext';
import { FiLock } from 'react-icons/fi';

export default function PrivacyPanel() {
  const { state } = useAppContext();
  const { privacy } = state;
  if (!privacy) return null;

  return (
    <div className="panel">
      <h3><FiLock style={{ marginRight: '0.5rem' }} />Privacy Check</h3>
      <p><strong>GDPR relevant:</strong> {privacy.gdprRelevant ? 'Yes' : 'No'}</p>
      <p><strong>Data shared:</strong> {privacy.dataShared}</p>
    </div>
  );
}