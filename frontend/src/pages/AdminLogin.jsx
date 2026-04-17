import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Logo from '../components/Logo'
import './AdminLogin.css'

function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/auth/admin-login', { email, password })
      login(response.data.token, response.data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/" className="admin-login-logo">
          <Logo size="large" />
        </Link>
        <h1>Admin Access</h1>
        <p>Restricted login for platform administration.</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="admin-email">Admin email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit" className="btn btn-primary admin-login-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Enter Admin Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
