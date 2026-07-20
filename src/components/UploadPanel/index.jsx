import { useEffect, useRef } from 'react';
import { FiUpload, FiAlertTriangle } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import { scanFile } from '../../utils/fileAnalyzer';
import FileDropZone from './FileDropZone';
import FileInfo from './FileInfo';
import FilePreview from '../FilePreview';
import ScanLog from '../ScanLog';

const MIN_SCAN_DURATION = 5000; // 3 seconds

export default function UploadPanel() {
  const { state, dispatch } = useAppContext();
  const abortControllerRef = useRef(null);
  const scanStartTimeRef = useRef(null);
  const delayTimerRef = useRef(null);

  useEffect(() => {
    if (state.phase === 'scanning') {
      // Record start time
      scanStartTimeRef.current = Date.now();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      (async () => {
        try {
          const result = await scanFile(state.file, {
            signal: controller.signal,
            policies: state.policies,
          });

          // If aborted, don't proceed
          if (controller.signal.aborted) return;

          // Calculate remaining time to meet minimum duration
          const elapsed = Date.now() - scanStartTimeRef.current;
          const remaining = Math.max(0, MIN_SCAN_DURATION - elapsed);

          if (remaining > 0) {
            // Wait the remaining time, but still respect abort
            await new Promise((resolve, reject) => {
              delayTimerRef.current = setTimeout(() => {
                resolve();
              }, remaining);
              // If abort happens, clean up the timer
              controller.signal.addEventListener('abort', () => {
                clearTimeout(delayTimerRef.current);
                reject(new DOMException('Aborted', 'AbortError'));
              });
            });
          }

          // Final abort check before dispatching
          if (!controller.signal.aborted) {
            dispatch({ type: 'SCAN_SUCCESS', payload: result });
          }
        } catch (err) {
          if (!controller.signal.aborted) {
            dispatch({ type: 'SCAN_ERROR', payload: err.message });
          }
        }
      })();

      return () => {
        controller.abort();
        if (delayTimerRef.current) {
          clearTimeout(delayTimerRef.current);
        }
      };
    }
  }, [state.phase, state.file, state.policies, dispatch]);

  const handleCancel = () => dispatch({ type: 'RESET' });

  return (
    <div className="panel">
      <h2 style={{ marginTop: 0 }}>
        <FiUpload style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        Upload & Scan
      </h2>

      {state.error && (
        <div className="error-box">
          Error: {state.error}
        </div>
      )}

      {state.phase === 'idle' && <FileDropZone />}

      {state.phase === 'fileSelected' && (
        <>
          <FileInfo />
          <FilePreview file={state.file} />
        </>
      )}

      {state.phase === 'scanning' && (
        <div className="scanning-box">
          <p className="scanning-title">Scanning file &quot;{state.file?.name}&quot;...</p>
          <ScanLog />
          <button className="btn-danger" onClick={handleCancel} style={{ marginTop: '1rem' }}>
            <FiAlertTriangle style={{ marginRight: '0.3rem' }} />
            Cancel Scan
          </button>
        </div>
      )}

      {(state.phase === 'results' || state.phase === 'uploadComplete') && (
        <div>
          <p><strong>File:</strong> {state.file?.name}</p>
          <p style={{ color: state.phase === 'uploadComplete' ? 'var(--accent-green)' : 'var(--accent-cyan)' }}>
            {state.phase === 'uploadComplete' ? 'Upload complete ✓' : 'Analysis finished'}
          </p>
        </div>
      )}
    </div>
  );
}