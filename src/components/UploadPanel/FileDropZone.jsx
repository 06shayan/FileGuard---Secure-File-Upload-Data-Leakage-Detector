import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function FileDropZone() {
  const { dispatch } = useAppContext();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch({ type: 'SELECT_FILE', payload: file });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: 'SELECT_FILE', payload: file });
    }
  };

  return (
    <div
      className={`dropzone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <p>{dragActive ? 'Drop to scan' : 'Drag & drop a file here, or click to browse'}</p>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginTop: '1rem' }}
      />
    </div>
  );
}