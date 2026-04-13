import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Logo from './Logo'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      fetchUnreadCount()
      // Poll for new notifications every minute
      const interval = setInterval(fetchUnreadCount, 60000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications')
      const unread = response.data.filter(n => !n.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

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
            <Link to="/help">Help</Link>
            {user ? (
              <>
                <Link to="/notifications" className="nav-notifications">
                  Notifications
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </Link>
                {user.userType === 'COMPANY' ? (
                  <Link to="/company/dashboard">Dashboard</Link>
                ) : (
                  <Link to="/intern/dashboard">Dashboard</Link>
                )}
                <Link to="/profile" className="nav-profile">
                  {user.intern?.profilePic || user.company?.logo ? (
                    <img 
                      src={user.userType === 'INTERN' ? user.intern.profilePic : user.company.logo} 
                      alt="Profile" 
                      className="nav-avatar" 
                    />
                  ) : null}
                  <span>{user.intern ? `${user.intern.firstName}` : user.company?.name}</span>
                </Link>
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
