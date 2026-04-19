import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './VerifyEmailNotice.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');
  const { fetchUser } = useAuth();
  const verifyStarted = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Invalid token');
      return;
    }
    if (verifyStarted.current) return;
    verifyStarted.current = true;

    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
        setStatus('success');
        const t = localStorage.getItem('token');
        if (t && t !== 'demo-intern' && t !== 'demo-company') {
          await fetchUser();
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed');
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, fetchUser]);

  return (
    <div className="verify-shell">
      <div className="verify-card">
        {status === 'verifying' && (
          <>
            <div className="verify-icon-wrap" aria-hidden="true">
              <span className="verify-icon verify-icon-pulse">...</span>
            </div>
            <h1>Verifying Your Email</h1>
            <p className="verify-lead">Please wait while we confirm your verification link.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="verify-icon-wrap verify-success" aria-hidden="true">
              <span className="verify-icon">✓</span>
            </div>
            <h1>Email Verified</h1>
            <p className="verify-lead">Your account is now active. Continue to login and start using EasyIntern.</p>
            <div className="verify-actions">
              <Link to="/login" className="btn btn-primary">Continue to Login</Link>
            </div>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="verify-icon-wrap verify-error" aria-hidden="true">
              <span className="verify-icon">!</span>
            </div>
            <h1>Verification Failed</h1>
            <p className="verify-lead">{error}</p>
            <div className="verify-actions">
              <Link to="/register" className="btn btn-primary">Register Again</Link>
              <Link to="/verify-email-notice" className="verify-secondary-link">Back to verification help</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
