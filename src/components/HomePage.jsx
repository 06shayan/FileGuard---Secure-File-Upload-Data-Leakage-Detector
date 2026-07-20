import { FiShield, FiSearch, FiLock, FiCpu, FiArrowRight } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const features = [
  {
    icon: <FiSearch />,
    title: 'PII Detection',
    desc: 'Scans files for emails, SSNs, credit card numbers, and more using RegEx patterns.',
  },
  {
    icon: <FiLock />,
    title: 'Client‑Side Security',
    desc: 'All analysis happens in your browser. Your data never leaves your device.',
  },
  {
    icon: <FiShield />,
    title: 'Risk Assessment',
    desc: 'Instantly receive a risk score and GDPR compliance check before uploading.',
  },
  {
    icon: <FiCpu />,
    title: 'SHA‑256 Hashing',
    desc: 'Verifies file integrity with cryptographic hashing via the Web Crypto API.',
  },
];

export default function HomePage() {
  const { dispatch } = useAppContext();

  const goToScanner = () => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: 'scanner' });
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-glow" />
        <h1 className="hero-title">
          File<span className="accent">Guard</span>
        </h1>
        <p className="hero-subtitle">
          Prevent data leaks before they happen. Scan, detect, and secure your files entirely in the browser.
        </p>
        <button className="btn-primary hero-cta" onClick={goToScanner}>
          <FiArrowRight style={{ marginRight: '0.4rem' }} />
          Start Scanning
        </button>
      </div>

      {/* Features grid */}
      <div className="features-grid">
        {features.map((feat, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{feat.icon}</div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="home-footer">
        <p>Built with React, FileReader, Web Crypto, and RegEx.</p>
      </div>
    </div>
  );
}