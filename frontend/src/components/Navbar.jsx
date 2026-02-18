import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Logo size="large" />
          </Link>
          <div className="navbar-links">
            {user?.userType !== 'INTERN' && (
              <Link to="/interns">Browse Interns</Link>
            )}
            {user?.userType !== 'COMPANY' && (
              <Link to="/jobs">Browse Jobs</Link>
            )}
            {user ? (
              <>
                {user.userType === 'COMPANY' ? (
                  <Link to="/company/dashboard">Dashboard</Link>
                ) : (
                  <Link to="/intern/dashboard">Dashboard</Link>
                )}
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
