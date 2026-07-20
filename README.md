# 🛡️ FileGuard

**Client‑Side Secure File Analyzer & Data Leak Prevention**

FileGuard is a browser‑based cybersecurity tool that scans files for sensitive information (PII), validates them against configurable security policies, and gives you a real‑time risk assessment — **before** your data ever leaves your device.

Inspired by Microsoft Defender and modern DLP dashboards, FileGuard uses the Web Crypto API, FileReader, and RegEx to perform all analysis locally. No backend, no uploads, no leakage. It’s a practical demonstration of how to prevent accidental data exposure at the very edge — your browser.

> ⚠️ This is a portfolio / educational project, not a production security product. The scanning engine is rule‑based and runs entirely in the browser.

---

## ✨ Features

- **PII Detection** — RegEx‑based scanning for emails, SSNs, credit card numbers, phone numbers, and IPs.
- **SHA‑256 File Hashing** — integrity verification via the Web Crypto API.
- **Risk Scoring** — instant 0‑100 score with severity labels and actionable recommendations.
- **Configurable Security Policies** — adjust max file size, allowed MIME types, blocked extensions, and risk thresholds directly in the UI.
- **Client‑Side Only** — file content never leaves your browser; all processing uses local Web APIs.
- **Animated Scan Experience** — terminal‑style scan log with typewriter effect, skeleton loaders, and Framer Motion page transitions.
- **Dark Cyber‑themed UI** — Microsoft Defender‑inspired design with a glowing landing page, tabbed navigation, and professional card layouts.
- **Scan History** — persistent storage via `localStorage`; view past scans with full metadata and risk scores.
- **Help & Learn Page** — explains how the tool works, technologies used, and live policy display.
- **File Preview** — shows a snippet of text‑based files before scanning.

---

## 📸 Screenshots

> *Click to expand each screenshot.*

<details>
<summary>🏠 Home Page</summary>

![Home Page](screenshots/home.png)
</details>

<details>
<summary>🔎 Scanning in Progress</summary>

![Scanning](screenshots/scanning.png)
</details>

<details>
<summary>📊 Results – Risk Assessment</summary>

![Results](screenshots/results.png)
</details>

<details>
<summary>⚙️ Settings</summary>

![Settings](screenshots/settings.png)
</details>

<details>
<summary>📚 History</summary>

![History](screenshots/history.png)
</details>

<details>
<summary>📚 Help</summary>

![History](screenshots/help.png)
</details>

---

## 🖥️ Tech Stack

- **React 18** + **Vite**
- **CSS** (custom dark theme, no framework)
- **Framer Motion** (animations)
- **React Icons** (Feather icon set)
- **Web Crypto API** (SHA‑256)
- **FileReader API** (local file reading)
- **RegEx** (PII detection)

Frontend‑only. No backend, no database, no authentication. Everything runs client‑side.

---

## 🚀 Getting Started

**Prerequisites:** Node.js ≥ 16

```bash
# Clone the repository
git clone https://github.com/yourusername/fileguard.git
cd fileguard

# Install dependencies
npm install

# Run the development server
npm run dev
Open the local URL (usually http://localhost:5173).

To build for production:

bash
npm run build
npm preview
📖 How It Works
Select a file — drag & drop or browse. The app validates size, type, and extension against your active security policies.

Preview — see a quick text extract (for text‑based files) before you commit to a scan.

Scan — click “Scan File”. A simulated terminal log appears, while behind the scenes the file is:

Hashed with SHA‑256 (Web Crypto)

Read as text (FileReader)

Scanned with RegEx patterns for PII

Risk‑scored based on findings

Review Results — after a minimum 2‑second scanning animation, the results smoothly animate in:

Analysis panel with findings and metadata

Risk gauge + severity donut chart

Privacy assessment (GDPR relevance)

Upload (simulated) — optionally mark the scan as “upload complete” to demonstrate the full workflow.

You can visit the History tab to revisit past scans, the Settings tab to change detection rules, or the Help page for a walkthrough.

📂 Project Structure
text
src/
├── components/
│   ├── Navbar.jsx
│   ├── TabNav.jsx
│   ├── HomePage.jsx          # Landing page with hero and feature grid
│   ├── HelpPage.jsx          # How it works + tech + policies
│   ├── UploadPanel/          # Core scanning flow
│   │   ├── index.jsx
│   │   ├── FileDropZone.jsx  # Drag & drop with glow
│   │   ├── FileInfo.jsx
│   │   └── FilePreview.jsx
│   ├── ScanLog.jsx           # Typewriter terminal log
│   ├── AnalysisPanel.jsx
│   ├── RiskPanel.jsx         # Risk score + gauge + donut + actions
│   ├── RiskGauge.jsx         # SVG semi‑circular gauge
│   ├── SeverityDonut.jsx     # SVG donut chart
│   ├── PrivacyPanel.jsx
│   ├── HistoryPanel.jsx
│   ├── SettingsPanel.jsx
│   └── Skeleton.jsx          # Shimmer loading placeholder
├── context/
│   └── AppContext.jsx        # Global state (phase, policies, history)
├── utils/
│   └── fileAnalyzer.js       # Core scanning, hashing, RegEx engine
├── securityPolicies.js       # Default policies & PII patterns
├── App.jsx                   # Tab routing + AnimatePresence
├── App.css                   # Full dark theme
└── main.jsx
🗺️ Future Enhancements
Real backend upload with Web Workers for heavy scanning

More advanced PII patterns (IBAN, passport numbers, etc.)

“Redact & Download” feature that strips detected PII from text files

Multi‑file batch scanning

Integration with a real threat‑intelligence feed

Optional AI‑powered content classification via a local model (e.g., Transformers.js)

📚 References
OWASP Top 10 for Large Language Model Applications

NIST AI Risk Management Framework

MDN Web Crypto API

FileReader API

Regular Expressions for PII detection

📄 License
This project is for educational and portfolio purposes. Feel free to fork, modify, and learn from it.