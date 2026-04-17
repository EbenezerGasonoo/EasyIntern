import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Logo from './Logo'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notifLoading, setNotifLoading] = useState(false)

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
      const list = Array.isArray(response.data) ? response.data : []
      const unread = list.filter(n => !n.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  const fetchNotificationsPreview = async () => {
    try {
      setNotifLoading(true)
      const response = await api.get('/notifications')
      const list = Array.isArray(response.data) ? response.data : []
      setNotifications(list.slice(0, 5))
      const unread = list.filter(n => !n.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Failed to fetch notifications preview:', error)
      setNotifications([])
    } finally {
      setNotifLoading(false)
    }
  }

  const handleLogout = () => {
    setMenuOpen(false)
    setNotifOpen(false)
    logout()
    navigate('/')
  }

  const getNavClassName = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link-active' : ''}`

  const displayName = user?.intern
    ? `${user.intern.firstName || ''} ${user.intern.lastName || ''}`.trim()
    : (user?.company?.name || user?.email || 'Account')

  const roleLabel = user?.isAdmin ? 'Admin' : (user?.userType === 'COMPANY' ? 'Company' : 'Intern')

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (!event.target.closest('.nav-user-menu') && !event.target.closest('.nav-notifications-wrap')) {
        setMenuOpen(false)
        setNotifOpen(false)
      }
    }
    if (menuOpen || notifOpen) {
      document.addEventListener('click', closeOnOutside)
    }
    return () => document.removeEventListener('click', closeOnOutside)
  }, [menuOpen, notifOpen])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Logo size="large" />
          </Link>
          <div className="navbar-links">
            {!user?.isAdmin && user?.userType !== 'INTERN' && (
              <NavLink to="/interns" className={getNavClassName}>Browse Interns</NavLink>
            )}
            {!user?.isAdmin && user?.userType !== 'COMPANY' && (
              <NavLink to="/jobs" className={getNavClassName}>Browse Jobs</NavLink>
            )}
            {user ? (
              <>
                <div className="nav-user-menu">
                  <button
                    type="button"
                    className="nav-user-trigger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-haspopup="menu"
                  >
                    {!user.isAdmin && (user.intern?.profilePic || user.company?.logo) ? (
                      <img
                        src={user.userType === 'INTERN' ? user.intern.profilePic : user.company.logo}
                        alt="Profile"
                        className="nav-avatar"
                      />
                    ) : (
                      <span className="nav-avatar nav-avatar-fallback">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="nav-user-text">
                      <span className="nav-user-name">{displayName}</span>
                      <span className="nav-user-role">{roleLabel}</span>
                    </div>
                    <span className="nav-caret">▾</span>
                  </button>

                  {menuOpen && (
                    <div className="nav-user-dropdown" role="menu">
                      {user.isAdmin ? (
                        <>
                          <NavLink to="/admin" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                            Admin Dashboard
                          </NavLink>
                          <NavLink to="/admin/settings" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                            Settings
                          </NavLink>
                        </>
                      ) : user.userType === 'COMPANY' ? (
                        <>
                          <NavLink to="/profile" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                            Profile
                          </NavLink>
                        <NavLink to="/company/dashboard" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                          Dashboard
                        </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink to="/profile" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                            Profile
                          </NavLink>
                        <NavLink to="/intern/dashboard" className="nav-user-dropdown-link" role="menuitem" onClick={() => setMenuOpen(false)}>
                          Dashboard
                        </NavLink>
                        </>
                      )}
                      <button type="button" className="nav-user-dropdown-logout" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="nav-notifications-wrap">
                  <button
                    type="button"
                    className="nav-link nav-notifications"
                    onClick={() => {
                      const next = !notifOpen
                      setNotifOpen(next)
                      if (next) fetchNotificationsPreview()
                    }}
                    aria-expanded={notifOpen}
                    aria-haspopup="menu"
                  >
                    <span className="nav-bell-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="img">
                        <path
                          d="M12 22a2.6 2.6 0 0 0 2.45-1.75h-4.9A2.6 2.6 0 0 0 12 22Zm7-5.6c-.92-.98-2.1-2.28-2.1-6.08 0-2.9-1.72-5.23-4.4-5.9V3.8a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.62c-2.68.67-4.4 3-4.4 5.9 0 3.8-1.18 5.1-2.1 6.08-.28.3-.5.54-.5.9 0 .63.5 1.14 1.14 1.14h14.72c.63 0 1.14-.51 1.14-1.14 0-.36-.22-.6-.5-.9Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Notifications</span>
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                  </button>

                  {notifOpen && (
                    <div className="nav-notifications-dropdown" role="menu">
                      <div className="nav-notifications-header">
                        <h4>{user?.isAdmin ? 'Ticket Alerts' : 'Notifications'}</h4>
                      </div>
                      <div className="nav-notifications-list">
                        {notifLoading ? (
                          <p className="nav-notifications-empty">Loading...</p>
                        ) : notifications.length === 0 ? (
                          <p className="nav-notifications-empty">No notifications yet.</p>
                        ) : (
                          notifications.map((item) => (
                            <div key={item.id} className={`nav-notification-item ${item.isRead ? '' : 'unread'}`}>
                              <p>{item.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <NavLink
                        to="/notifications"
                        className="nav-notifications-see-all"
                        onClick={() => setNotifOpen(false)}
                      >
                        See all notifications
                      </NavLink>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className={getNavClassName}>Login</NavLink>
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
