import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast }) => {
  const { removeToast } = useToast();

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '✅';
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-content">
        <span className="toast-icon">{getToastIcon(toast.type)}</span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close"
          onClick={() => removeToast(toast.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer; 