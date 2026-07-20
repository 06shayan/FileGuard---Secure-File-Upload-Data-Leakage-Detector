import { useAppContext } from './context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';   // ← new
import Navbar from './components/Navbar';
import TabNav from './components/TabNav';
import HomePage from './components/HomePage';
import UploadPanel from './components/UploadPanel';
import AnalysisPanel from './components/AnalysisPanel';
import RiskPanel from './components/RiskPanel';
import PrivacyPanel from './components/PrivacyPanel';
import HistoryPanel from './components/HistoryPanel';
import SettingsPanel from './components/SettingsPanel';
import HelpPage from './components/HelpPage';
import './App.css';

function App() {
  const { state } = useAppContext();

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <TabNav />
        {state.activeTab === 'home' && <HomePage />}
        {state.activeTab === 'help' && <HelpPage />}
        {state.activeTab === 'scanner' && (
          <>
            <UploadPanel />

            {/* Scanning skeleton – exits with a fade */}
            <AnimatePresence>
              {state.phase === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  <AnalysisPanel mode="scanning" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results panels – enter with slide+fade */}
            <AnimatePresence>
              {(state.phase === 'results' || state.phase === 'uploadComplete') && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <AnalysisPanel mode="results" />
                  <RiskPanel />
                  <PrivacyPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {state.activeTab === 'history' && <HistoryPanel />}
        {state.activeTab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
}

export default App;