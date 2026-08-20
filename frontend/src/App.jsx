import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initChecking, setInitChecking] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Check health and existing token on mount
  useEffect(() => {
    const initApp = async () => {
      // Health check
      try {
        await api.checkHealth();
        setServerOnline(true);
      } catch (err) {
        setServerOnline(false);
      }

      // Restore session if token exists
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const res = await api.getProfile();
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (err) {
          // Invalid or expired token
          localStorage.removeItem('auth_token');
        }
      }
      setInitChecking(false);
    };

    initApp();
  }, []);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        showToast(data.message || 'Logged in successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await api.register(name, email, password);
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        showToast(data.message || 'Registration successful!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    showToast('Logged out successfully', 'success');
  };

  if (initChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          fontWeight: 500,
        }}
      >
        Initializing Auth Suite...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} onLogout={handleLogout} serverOnline={serverOnline} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {!user ? (
          <AuthForm onLogin={handleLogin} onRegister={handleRegister} loading={loading} />
        ) : (
          <Dashboard user={user} onShowToast={showToast} />
        )}
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
