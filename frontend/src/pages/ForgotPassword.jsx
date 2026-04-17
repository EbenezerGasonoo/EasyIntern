import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import './AuthReset.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await api.post('/auth/forgot-password', { email })
      setMessage(response.data.message || 'If an account exists for that email, a reset link has been sent.')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-reset-page">
      <div className="auth-reset-card">
        <h1>Forgot Password</h1>
        <p>Enter your email and we will send a password reset link.</p>

        <form onSubmit={handleSubmit} className="auth-reset-form">
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          {error && <div className="auth-reset-error">{error}</div>}
          {message && <div className="auth-reset-success">{message}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="auth-reset-footer">
          Remembered your password? <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
