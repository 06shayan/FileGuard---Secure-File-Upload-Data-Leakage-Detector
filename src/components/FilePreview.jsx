import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

export default function FilePreview({ file }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!file) return;

    // Only preview text-based files
    const textTypes = ['text/', 'application/json', 'application/xml', 'text/csv'];
    if (!textTypes.some(t => file.type.startsWith(t))) {
      setError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      // Show first 500 characters
      setPreview(text.slice(0, 500));
    };
    reader.onerror = () => setError(true);
    reader.readAsText(file.slice(0, 500)); // only read first chunk
  }, [file]);

  if (error) {
    return (
      <div className="file-preview">
        <p className="text-muted">Preview not available for this file type.</p>
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="file-preview">
        <Skeleton width="100%" height="4rem" />
      </div>
    );
  }

  return (
    <div className="file-preview">
      <div className="preview-header">File Preview (first 500 chars)</div>
      <pre className="preview-content">{preview}</pre>
    </div>
  );
}