import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import './Auth.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed');
        setStatus('error');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setError('Invalid token');
    }
  }, [token]);

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ textAlign: 'center' }}>
        {status === 'verifying' && <h2>Verifying your email...</h2>}
        {status === 'success' && (
          <>
            <h2>Email Verified!</h2>
            <p>Your email has been successfully verified. You can now login.</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 style={{ color: 'red' }}>Verification Failed</h2>
            <p>{error}</p>
            <Link to="/register">Register again</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
