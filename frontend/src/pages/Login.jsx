import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../utils/api'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      login(response.data.token, response.data.user)
      navigate(
        response.data.user.userType === 'COMPANY'
          ? '/company/dashboard'
          : '/intern/dashboard'
      )
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (type) => {
    if (type === 'intern') {
      const demoUser = {
        id: 'demo-intern-1',
        email: 'you@easyintern.demo',
        userType: 'INTERN',
        intern: {
          id: 'demo-intern-profile',
          firstName: 'You',
          lastName: 'Demo',
          bio: 'Demo intern account. Sign up to create a real profile.',
          skills: ['JavaScript', 'React'],
          education: 'Demo',
          location: 'Accra, Ghana',
        },
      }
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      login('demo-intern', demoUser)
      navigate('/intern/dashboard')
    } else {
      const demoUser = {
        id: 'demo-company-1',
        email: 'company@easyintern.demo',
        userType: 'COMPANY',
        company: {
          id: 'demo-company-profile',
          name: 'Demo Company',
          description: 'Demo company account.',
          location: 'Accra, Ghana',
        },
      }
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      login('demo-company', demoUser)
      navigate('/company/dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-logo">
          <Logo size="large" />
        </Link>
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to your EasyIntern account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary login-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="login-demo">
            <span className="login-demo-label">Or try without an account:</span>
            <div className="login-demo-buttons">
              <button
                type="button"
                className="btn btn-secondary login-demo-btn"
                onClick={() => handleDemoLogin('intern')}
              >
                Sign in as Demo Intern
              </button>
              <button
                type="button"
                className="btn btn-secondary login-demo-btn"
                onClick={() => handleDemoLogin('company')}
              >
                Sign in as Demo Company
              </button>
            </div>
          </div>
        </form>

        <p className="login-switch">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
