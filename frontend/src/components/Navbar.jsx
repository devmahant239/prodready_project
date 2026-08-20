import React from 'react';
import { ShieldCheck, LogOut, User, Server } from 'lucide-react';

export default function Navbar({ user, onLogout, serverOnline }) {
  return (
    <header
      style={{
        width: '100%',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(9, 13, 22, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <ShieldCheck size={24} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Auth<span className="gradient-text">Suite</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>React + Node.js JWT Demo</p>
        </div>
      </div>

      {/* Connection & User Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Server size={14} color={serverOnline ? 'var(--accent-emerald)' : 'var(--accent-rose)'} />
          <span>API Server:</span>
          <span style={{ fontWeight: 600, color: serverOnline ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
            {serverOnline ? 'Online (5000)' : 'Connecting...'}
          </span>
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              <User size={14} color="var(--accent-primary)" />
              <span>{user.name}</span>
            </div>

            <button
              onClick={onLogout}
              className="btn btn-outline-danger"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              title="Logout session"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
