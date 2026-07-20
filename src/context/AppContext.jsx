import { createContext, useContext, useReducer, useEffect } from 'react';
import { FILE_POLICIES, PII_PATTERNS, RISK_THRESHOLDS } from '../securityPolicies';

const initialState = {
  activeTab: 'home',  
  phase: 'idle',
  file: null,
  hash: null,
  analysis: null,
  risk: null,
  privacy: null,
  error: null,
  policies: {
    file: { ...FILE_POLICIES },
    pii: [...PII_PATTERNS],
    thresholds: { ...RISK_THRESHOLDS },
  },
  history: [],
};

// Load history from localStorage
function loadHistory() {
  try {
    const saved = localStorage.getItem('fileGuardHistory');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'SELECT_FILE':
      return {
        ...state,
        phase: 'fileSelected',
        file: action.payload,
        analysis: null,
        risk: null,
        privacy: null,
        error: null,
        hash: null,
      };
    case 'START_SCAN':
      return { ...state, phase: 'scanning', error: null };
    case 'SCAN_SUCCESS': {
      const { analysis, risk, privacy, hash } = action.payload;
      // Create history entry
      const historyEntry = {
        id: Date.now(),
        fileName: state.file.name,
        fileSize: state.file.size,
        date: new Date().toISOString(),
        riskScore: risk.score,
        findingsCount: analysis.findings.length,
        hash: hash?.substring(0, 16) + '...',
      };
      return {
        ...state,
        phase: 'results',
        analysis,
        risk,
        privacy,
        hash,
        history: [historyEntry, ...state.history],
      };
    }
    case 'SCAN_ERROR':
      return {
        ...state,
        phase: 'idle',
        error: action.payload,
        file: null,
      };
    case 'UPLOAD_COMPLETE':
      return { ...state, phase: 'uploadComplete' };
    case 'RESET':
      return { ...state, phase: 'idle', file: null, error: null, analysis: null, risk: null, privacy: null, hash: null };

    // Policy overrides
    case 'SET_POLICIES':
      return {
        ...state,
        policies: {
          ...state.policies,
          ...action.payload, // deep merge? We'll handle shallow merge for top keys
        },
      };

    // History management
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'DELETE_HISTORY_ITEM':
      return {
        ...state,
        history: state.history.filter(entry => entry.id !== action.payload),
      };

    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => ({
    ...initial,
    history: loadHistory(),
  }));

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fileGuardHistory', JSON.stringify(state.history));
  }, [state.history]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}