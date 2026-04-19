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
  const [socialNotice, setSocialNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSocialNotice('')
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

  const handleSocialLogin = (provider) => {
    setError('')
    setSocialNotice(`${provider} login will be available soon.`)
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-visual">
          <Link to="/" className="login-logo login-logo-visual">
            <Logo size="xlarge" theme="light" />
          </Link>
          <div className="login-visual-copy">
            <h2>Your journey to the top starts here.</h2>
            <p>
              Discover internships that match your skills and help companies find
              the right talent.
            </p>
          </div>
        </div>

        <div className="login-card">
          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-subtitle">Log in to continue with EasyIntern.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="login-password">Password</label>
                <div className="password-actions">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot password?
                  </Link>
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
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
              {loading ? 'Signing in...' : 'Login'}
            </button>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="login-social-buttons">
              <button
                type="button"
                className="login-social-btn"
                onClick={() => handleSocialLogin('Google')}
              >
                <span className="login-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.95h5.5c-.24 1.28-.97 2.36-2.06 3.08l3.33 2.58c1.94-1.79 3.06-4.42 3.06-7.53 0-.72-.06-1.42-.18-2.08H12Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 22c2.77 0 5.1-.92 6.8-2.49l-3.33-2.58c-.92.62-2.1.99-3.47.99-2.66 0-4.92-1.8-5.72-4.22l-3.44 2.66A10 10 0 0 0 12 22Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M6.28 13.7A6 6 0 0 1 6 12c0-.59.1-1.15.28-1.7L2.84 7.64A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.52l3.2-2.82Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 6.08c1.5 0 2.84.52 3.89 1.54l2.92-2.92C17.09 3.1 14.77 2 12 2A10 10 0 0 0 3.08 7.48l3.2 2.82C7.08 7.88 9.34 6.08 12 6.08Z"
                    />
                  </svg>
                </span>
                Continue with Google
              </button>
              <button
                type="button"
                className="login-social-btn"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <span className="login-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path
                      fill="#0A66C2"
                      d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.35-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3ZM5.31 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.09 20.45H3.52V9h3.57v11.45Z"
                    />
                  </svg>
                </span>
                Login with LinkedIn
              </button>
            </div>

            {socialNotice && (
              <div className="login-social-notice" role="status">
                {socialNotice}
              </div>
            )}

            <div className="login-demo">
              <span className="login-demo-label">Try demo accounts:</span>
              <div className="login-demo-buttons">
                <button
                  type="button"
                  className="btn btn-secondary login-demo-btn"
                  onClick={() => handleDemoLogin('intern')}
                >
                  Demo Intern
                </button>
                <button
                  type="button"
                  className="btn btn-secondary login-demo-btn"
                  onClick={() => handleDemoLogin('company')}
                >
                  Demo Company
                </button>
              </div>
            </div>
          </form>

          <p className="login-switch">
            Don't have an account?{' '}
            <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
