import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Logo from './Logo'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [unreadCount, setUnreadCount] = useState(0)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notifLoading, setNotifLoading] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (drawerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [drawerOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
        setUserMenuOpen(false)
        setNotifOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const accountReady = Boolean(user && (user.isAdmin || user.isEmailVerified === true))

  useEffect(() => {
    if (!accountReady) return
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [accountReady])

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications')
      const list = Array.isArray(response.data) ? response.data : []
      const unread = list.filter((n) => !n.isRead).length
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
      const unread = list.filter((n) => !n.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Failed to fetch notifications preview:', error)
      setNotifications([])
    } finally {
      setNotifLoading(false)
    }
  }

  const handleLogout = () => {
    setUserMenuOpen(false)
    setNotifOpen(false)
    closeDrawer()
    logout()
    navigate('/')
  }

  const getNavClassName = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link-active' : ''}`

  const displayName = user?.intern
    ? `${user.intern.firstName || ''} ${user.intern.lastName || ''}`.trim()
    : (user?.company?.name || user?.university?.name || user?.email || 'Account')

  const roleLabel = user?.isAdmin
    ? 'Admin'
    : user?.userType === 'COMPANY'
      ? 'Company'
      : user?.userType === 'UNIVERSITY'
        ? 'University'
        : 'Intern'

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (event.target.closest('.navbar-drawer') || event.target.closest('.navbar-burger')) return
      if (!event.target.closest('.nav-user-menu') && !event.target.closest('.nav-notifications-wrap')) {
        setUserMenuOpen(false)
        setNotifOpen(false)
      }
    }
    if (userMenuOpen || notifOpen) {
      document.addEventListener('click', closeOnOutside)
    }
    return () => document.removeEventListener('click', closeOnOutside)
  }, [userMenuOpen, notifOpen])

  return (
    <nav className={`navbar${drawerOpen ? ' navbar--drawer-open' : ''}`}>
      {user && !user.isAdmin && user.isEmailVerified !== true && (
        <div className="email-verify-banner" role="status">
          <div className="container email-verify-banner-inner">
            <span>
              Verify your email to use your dashboard, profile, notifications, and applications.
            </span>
            <Link to="/verify-email-notice" className="email-verify-banner-link">
              How to verify
            </Link>
          </div>
        </div>
      )}
      <div className="container navbar-shell">
        <div className="navbar-top">
          <Link to="/" className="navbar-brand" onClick={closeDrawer}>
            <Logo size="large" />
          </Link>

          <button
            type="button"
            className={`navbar-burger${drawerOpen ? ' navbar-burger--open' : ''}`}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className="navbar-burger-line" />
            <span className="navbar-burger-line" />
            <span className="navbar-burger-line" />
          </button>

          <div className="navbar-desktop">
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
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="menu"
                    >
                      {!user.isAdmin && (user.intern?.profilePic || user.company?.logo) ? (
                        <img
                          src={user.userType === 'INTERN' ? user.intern.profilePic : user.company.logo}
                          alt=""
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

                    {userMenuOpen && (
                      <div className="nav-user-dropdown" role="menu">
                        {user.isAdmin ? (
                          <>
                            <NavLink to="/admin" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Admin Dashboard
                            </NavLink>
                            <NavLink to="/admin/settings" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Settings
                            </NavLink>
                          </>
                        ) : user.userType === 'COMPANY' ? (
                          <>
                            <NavLink to="/profile" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Profile
                            </NavLink>
                            <NavLink to="/company/dashboard" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Dashboard
                            </NavLink>
                            <NavLink to="/settings" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Settings
                            </NavLink>
                          </>
                        ) : user.userType === 'UNIVERSITY' ? (
                          <>
                            <NavLink to="/university/dashboard" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Dashboard
                            </NavLink>
                            <NavLink to="/settings" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Settings
                            </NavLink>
                          </>
                        ) : (
                          <>
                            <NavLink to="/profile" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Profile
                            </NavLink>
                            <NavLink to="/intern/dashboard" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Dashboard
                            </NavLink>
                            <NavLink to="/settings" className="nav-user-dropdown-link" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                              Settings
                            </NavLink>
                          </>
                        )}
                        <button type="button" className="nav-user-dropdown-logout" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  {accountReady && (
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
                  )}
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

        <div
          className="navbar-backdrop"
          aria-hidden="true"
          onClick={closeDrawer}
        />

        <div
          className="navbar-drawer"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <div className="navbar-drawer-inner">
            {!user?.isAdmin && user?.userType !== 'INTERN' && (
              <NavLink to="/interns" className={getNavClassName} onClick={closeDrawer}>
                Browse Interns
              </NavLink>
            )}
            {!user?.isAdmin && user?.userType !== 'COMPANY' && (
              <NavLink to="/jobs" className={getNavClassName} onClick={closeDrawer}>
                Browse Jobs
              </NavLink>
            )}

            {user ? (
              <>
                <div className="navbar-drawer-user">
                  <span className="navbar-drawer-user-name">{displayName}</span>
                  <span className="navbar-drawer-user-role">{roleLabel}</span>
                </div>
                {user.isAdmin ? (
                  <>
                    <NavLink to="/admin" className="navbar-drawer-link" onClick={closeDrawer}>Admin Dashboard</NavLink>
                    <NavLink to="/admin/settings" className="navbar-drawer-link" onClick={closeDrawer}>Settings</NavLink>
                  </>
                ) : user.userType === 'COMPANY' ? (
                  <>
                    <NavLink to="/profile" className="navbar-drawer-link" onClick={closeDrawer}>Profile</NavLink>
                    <NavLink to="/company/dashboard" className="navbar-drawer-link" onClick={closeDrawer}>Dashboard</NavLink>
                    <NavLink to="/settings" className="navbar-drawer-link" onClick={closeDrawer}>Settings</NavLink>
                  </>
                ) : user.userType === 'UNIVERSITY' ? (
                  <>
                    <NavLink to="/university/dashboard" className="navbar-drawer-link" onClick={closeDrawer}>Dashboard</NavLink>
                    <NavLink to="/settings" className="navbar-drawer-link" onClick={closeDrawer}>Settings</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/profile" className="navbar-drawer-link" onClick={closeDrawer}>Profile</NavLink>
                    <NavLink to="/intern/dashboard" className="navbar-drawer-link" onClick={closeDrawer}>Dashboard</NavLink>
                    <NavLink to="/settings" className="navbar-drawer-link" onClick={closeDrawer}>Settings</NavLink>
                  </>
                )}
                {accountReady && (
                  <NavLink to="/notifications" className="navbar-drawer-link navbar-drawer-link--bell" onClick={closeDrawer}>
                    Notifications
                    {unreadCount > 0 && <span className="navbar-drawer-badge">{unreadCount}</span>}
                  </NavLink>
                )}
                <button type="button" className="navbar-drawer-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={getNavClassName} onClick={closeDrawer}>Login</NavLink>
                <Link to="/register" className="btn btn-primary navbar-drawer-cta" onClick={closeDrawer}>
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
