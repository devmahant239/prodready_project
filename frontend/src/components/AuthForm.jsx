import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Sparkles, KeyRound } from 'lucide-react';

export default function AuthForm({ onLogin, onRegister, loading }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      onRegister({ name, email, password });
    } else {
      onLogin({ email, password });
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@example.com');
    setPassword('password123');
    if (isRegister) {
      setName('Demo User');
    }
  };

  return (
    <div
      style={{
        maxWidth: '440px',
        width: '100%',
        margin: '60px auto',
        padding: '36px 32px',
      }}
      className="glass-card animate-fade-in"
    >
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            color: 'var(--accent-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <Sparkles size={12} /> Secure Authentication
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>
          {isRegister ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="subheading">
          {isRegister
            ? 'Sign up to access your developer dashboard'
            : 'Enter your credentials to manage your account'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          background: 'var(--bg-input)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '28px',
          border: '1px solid var(--border-color)',
        }}
      >
        <button
          type="button"
          onClick={() => setIsRegister(false)}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            background: !isRegister ? 'var(--gradient-primary)' : 'transparent',
            color: !isRegister ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(true)}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            background: isRegister ? 'var(--gradient-primary)' : 'transparent',
            color: isRegister ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Register
        </button>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="input-group">
            <label htmlFor="name-input">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="name-input"
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email-input">Email Address</label>
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              id="email-input"
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password-input">Password</label>
          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '8px' }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              Processing...
            </>
          ) : (
            <>
              {isRegister ? 'Create Account' : 'Sign In'}
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Quick Fill Chip */}
      <div
        style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          onClick={handleFillDemo}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 16px',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <KeyRound size={14} color="var(--accent-cyan)" />
          <span>Auto-fill Demo Credentials</span>
        </button>
      </div>
    </div>
  );
}
