import { FiHome, FiUpload, FiClock, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const tabs = [
  { id: 'home', label: 'Home', icon: <FiHome /> },
  { id: 'scanner', label: 'Scanner', icon: <FiUpload /> },
  { id: 'history', label: 'History', icon: <FiClock /> },
  { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  { id: 'help', label: 'Help', icon: <FiHelpCircle /> },
];

export default function TabNav() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="tab-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${state.activeTab === tab.id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}