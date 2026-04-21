import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './VerifyEmailNotice.css'

function VerifyEmailNotice() {
  const { user, loading: authLoading } = useAuth()
  const [emailInput, setEmailInput] = useState('')
  const [resendMessage, setResendMessage] = useState('')
  const [resendError, setResendError] = useState('')
  const [resending, setResending] = useState(false)

  const canResendWithSession = Boolean(user?.email && user.isEmailVerified === false)

  const handleResendVerification = async () => {
    setResendMessage('')
    setResendError('')
    setResending(true)
    try {
      if (canResendWithSession) {
        const { data } = await api.post('/auth/resend-verification', {})
        setResendMessage(data?.message || 'Check your inbox for a new verification link.')
      } else {
        const trimmed = emailInput.trim().toLowerCase()
        if (!trimmed) {
          setResendError('Enter the email you used to register, or sign in and try again.')
          setResending(false)
          return
        }
        const { data } = await api.post('/auth/resend-verification', { email: trimmed })
        setResendMessage(data?.message || 'If that account needs verification, check that inbox.')
      }
    } catch (err) {
      setResendError(err.response?.data?.error || 'Could not send the email. Try again later.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="verify-shell">
      <div className="verify-card">
        <div className="verify-icon-wrap" aria-hidden="true">
          <span className="verify-icon">✉</span>
        </div>
        <h1>Check Your Email</h1>
        <p className="verify-lead">
          We sent a verification link to your inbox. Open the email and click the link to activate your account.
        </p>
        <div className="verify-tips">
          <p>Did not see it yet? Check spam or promotions.</p>
          <p>The link opens this app and completes verification instantly.</p>
        </div>

        <div className="verify-resend">
          <p className="verify-resend-label">Need a fresh link?</p>
          {authLoading ? (
            <p className="verify-resend-hint">Loading…</p>
          ) : canResendWithSession ? (
            <>
              <p className="verify-resend-hint">
                We will send another link to <strong>{user.email}</strong>.
              </p>
              <button
                type="button"
                className="verify-resend-btn"
                onClick={handleResendVerification}
                disabled={resending}
              >
                {resending ? 'Sending…' : 'Request verification link'}
              </button>
            </>
          ) : (
            <>
              <p className="verify-resend-hint">
                Enter the email you registered with and we will send a new verification link if the account still needs
                it.
              </p>
              <div className="verify-resend-row">
                <input
                  type="email"
                  className="verify-resend-input"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={resending}
                />
                <button
                  type="button"
                  className="verify-resend-btn"
                  onClick={handleResendVerification}
                  disabled={resending}
                >
                  {resending ? 'Sending…' : 'Request verification link'}
                </button>
              </div>
            </>
          )}
          {resendMessage && (
            <p className="verify-resend-feedback verify-resend-feedback--ok" role="status">
              {resendMessage}
            </p>
          )}
          {resendError && (
            <p className="verify-resend-feedback verify-resend-feedback--err" role="alert">
              {resendError}
            </p>
          )}
        </div>

        <div className="verify-actions">
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
          <Link to="/register" className="verify-secondary-link">
            Use a different email
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailNotice
