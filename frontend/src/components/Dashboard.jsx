import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Terminal, CheckCircle2, RefreshCw, Key, Activity, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard({ user, onShowToast }) {
  const [protectedData, setProtectedData] = useState(null);
  const [fetching, setFetching] = useState(false);

  const handleTestProtectedApi = async () => {
    setFetching(true);
    try {
      const data = await api.getDashboardData();
      setProtectedData(data);
      onShowToast('Protected API response retrieved successfully!', 'success');
    } catch (err) {
      onShowToast(err.message || 'Failed to fetch protected endpoint.', 'error');
    } finally {
      setFetching(false);
    }
  };

  const token = localStorage.getItem('auth_token');

  return (
    <div
      style={{
        maxWidth: '1000px',
        width: '100%',
        margin: '40px auto',
        padding: '0 24px 60px 24px',
      }}
      className="animate-fade-in"
    >
      {/* Welcome Hero Banner */}
      <div
        className="glass-card"
        style={{
          padding: '32px 40px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-emerald)',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}
            >
              <CheckCircle2 size={13} /> Authenticated Session
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
              Welcome back, <span className="gradient-text">{user.name}</span> 👋
            </h2>
            <p className="subheading">
              Your JWT token is active and authorized to make secure API requests.
            </p>
          </div>

          <button
            onClick={handleTestProtectedApi}
            className="btn btn-primary"
            disabled={fetching}
          >
            <RefreshCw size={16} className={fetching ? 'spinner' : ''} />
            {fetching ? 'Fetching API...' : 'Test Protected API Endpoint'}
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* User Info Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <User size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Profile Overview</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={16} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</p>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.email}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={16} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Account Role</p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    marginTop: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {user.role || 'Developer'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Member Since</p>
                <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Just now'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Token Details Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Key size={20} color="var(--accent-secondary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Security Context</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Bearer Token Status
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                ● Active (Expires in 24h)
              </p>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                JWT Raw Signature
              </p>
              <div
                style={{
                  background: 'var(--bg-input)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  wordBreak: 'break-all',
                  border: '1px solid var(--border-color)',
                  maxHeight: '70px',
                  overflowY: 'auto',
                }}
              >
                {token || 'No token found'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protected API Response Visualizer */}
      {protectedData && (
        <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Protected Backend API Response (`GET /api/user/dashboard`)
              </h3>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: 'var(--accent-emerald)',
                fontWeight: 600,
              }}
            >
              200 OK
            </span>
          </div>

          <pre
            style={{
              background: '#040711',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              overflowX: 'auto',
              lineHeight: 1.6,
            }}
          >
            {JSON.stringify(protectedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
