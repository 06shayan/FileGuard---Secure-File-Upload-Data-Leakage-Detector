import { FiFileText, FiHash, FiEye, FiAlertTriangle, FiCheckCircle, FiCode } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

export default function HelpPage() {
  const { state } = useAppContext();
  const { policies } = state;

  return (
    <div className="help-page">
      <div className="panel">
        <h2><FiFileText style={{ marginRight: '0.5rem' }} />How It Works</h2>
        <div className="help-steps">
          <div className="help-step">
            <span className="step-number">1</span>
            <div>
              <strong>Select a file</strong>
              <p>Drag & drop or browse. The app validates file type, size, and extension against your security policies.</p>
            </div>
          </div>
          <div className="help-step">
            <span className="step-number">2</span>
            <div>
              <strong>Scan</strong>
              <p>The file is read locally using <code>FileReader</code>. A SHA‑256 hash is computed with <code>Web Crypto API</code>.</p>
            </div>
          </div>
          <div className="help-step">
            <span className="step-number">3</span>
            <div>
              <strong>Analyse</strong>
              <p>RegEx patterns scan for PII like emails, credit cards, and SSNs. A risk score is assigned based on findings.</p>
            </div>
          </div>
          <div className="help-step">
            <span className="step-number">4</span>
            <div>
              <strong>Review & Upload</strong>
              <p>See the results, check recommendations, and decide whether to upload – all before data leaves your browser.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2><FiCode style={{ marginRight: '0.5rem' }} />Technologies Used</h2>
        <ul className="tech-list">
          <li><strong>React</strong> – UI framework</li>
          <li><strong>FileReader API</strong> – local file reading</li>
          <li><strong>Web Crypto API</strong> – SHA‑256 hashing</li>
          <li><strong>RegEx</strong> – PII pattern matching</li>
          <li><strong>localStorage</strong> – scan history persistence</li>
        </ul>
      </div>

      <div className="panel">
        <h2><FiEye style={{ marginRight: '0.5rem' }} />Current Security Policies</h2>
        <div className="policy-display">
          <div className="policy-item">
            <FiFileText /> <span>Max file size: {(policies.file.maxSizeBytes / 1024 / 1024).toFixed(1)} MB</span>
          </div>
          <div className="policy-item">
            <FiCheckCircle /> <span>Allowed types: {policies.file.allowedTypes.join(', ')}</span>
          </div>
          <div className="policy-item">
            <FiAlertTriangle /> <span>Blocked extensions: {policies.file.blockedExtensions.join(', ')}</span>
          </div>
          <div className="policy-item">
            <FiHash /> <span>High risk threshold: {policies.thresholds.high.minScore}+</span>
          </div>
        </div>
      </div>
    </div>
  );
}