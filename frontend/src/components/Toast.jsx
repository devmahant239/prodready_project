import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        borderRadius: '12px',
        background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
        border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        color: isSuccess ? '#34d399' : '#f87171',
        maxWidth: '400px',
      }}
      className="animate-fade-in"
    >
      {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1, color: '#f8fafc' }}>
        {toast.message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
