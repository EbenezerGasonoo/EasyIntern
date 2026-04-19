import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CompanyDashboard from './pages/CompanyDashboard'
import InternDashboard from './pages/InternDashboard'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Interns from './pages/Interns'
import InternDetail from './pages/InternDetail'
import Profile from './pages/Profile'
import Help from './pages/Help'
import VerifyEmailNotice from './pages/VerifyEmailNotice'
import VerifyEmail from './pages/VerifyEmail'
import Notifications from './pages/Notifications'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminSettings from './pages/AdminSettings'
import './App.css'

function PrivateRoute({ children, requireType, requireAdmin, requireEmailVerified = true }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (requireAdmin && !user) {
    return <Navigate to="/admin/login" />
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/admin/login" />
  }

  if (!requireAdmin && requireEmailVerified && !user.isAdmin && user.isEmailVerified !== true) {
    return <Navigate to="/verify-email-notice" replace />
  }

  if (requireType && user.userType !== requireType) {
    return <Navigate to={user.userType === 'COMPANY' ? '/company/dashboard' : '/intern/dashboard'} />
  }

  return children
}

function ProfileAccessGuard() {
  const { user } = useAuth()
  if (user?.isAdmin) {
    return <Navigate to="/admin" replace />
  }
  return <Profile />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/interns" element={<Interns />} />
      <Route path="/interns/:id" element={<InternDetail />} />
      <Route path="/help" element={<Help />} />
      <Route path="/verify-email-notice" element={<VerifyEmailNotice />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/company/dashboard"
        element={
          <PrivateRoute requireType="COMPANY">
            <CompanyDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/intern/dashboard"
        element={
          <PrivateRoute requireType="INTERN">
            <InternDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileAccessGuard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <PrivateRoute requireAdmin>
            <AdminSettings />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

function AppLayout() {
  const location = useLocation()
  const authLikeRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/admin/login']
  const hideNavbar = authLikeRoutes.includes(location.pathname)
  const hideFooter = location.pathname.startsWith('/admin') || authLikeRoutes.includes(location.pathname)
  const SEO_DEFAULT = {
    title: 'EasyIntern - Find Internship Opportunities in Ghana',
    description: 'EasyIntern connects talented interns with companies in Ghana. Discover internship opportunities and hire quality interns.',
  }

  useEffect(() => {
    const pageMeta = {
      '/': {
        title: 'EasyIntern - Find Internship Opportunities in Ghana',
        description: 'Discover internships and connect with top companies across Ghana on EasyIntern.',
      },
      '/login': {
        title: 'Login - EasyIntern',
        description: 'Login to your EasyIntern account to manage applications, hiring, and your profile.',
      },
      '/register': {
        title: 'Create Account - EasyIntern',
        description: 'Sign up as an intern or company on EasyIntern and start connecting with the right opportunities.',
      },
      '/jobs': {
        title: 'Browse Internship Jobs - EasyIntern',
        description: 'Browse active internship opportunities and apply to roles that match your skills.',
      },
      '/interns': {
        title: 'Browse Talented Interns - EasyIntern',
        description: 'Explore intern profiles and connect with promising candidates for your company.',
      },
      '/company/dashboard': {
        title: 'Company Dashboard - EasyIntern',
        description: 'Track applications, manage job postings, and hire interns faster from your company dashboard.',
      },
      '/intern/dashboard': {
        title: 'Intern Dashboard - EasyIntern',
        description: 'Track applications, discover opportunities, and manage your internship profile in one place.',
      },
      '/profile': {
        title: 'Profile - EasyIntern',
        description: 'Update your EasyIntern profile to improve visibility and opportunities.',
      },
      '/admin': {
        title: 'Admin Dashboard - EasyIntern',
        description: 'Platform-level analytics and operational insights for EasyIntern administration.',
      },
      '/admin/login': {
        title: 'Admin Login - EasyIntern',
        description: 'Secure admin login for EasyIntern platform management.',
      },
    }

    const current = pageMeta[location.pathname] || SEO_DEFAULT
    document.title = current.title

    const ensureMeta = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        if (isProperty) tag.setAttribute('property', name)
        else tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    ensureMeta('description', current.description)
    ensureMeta('og:title', current.title, true)
    ensureMeta('og:description', current.description, true)
    ensureMeta('twitter:title', current.title)
    ensureMeta('twitter:description', current.description)
    ensureMeta(
      'robots',
      location.pathname.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow'
    )
  }, [location.pathname])

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <AppRoutes />
      {!hideFooter && <SiteFooter />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  )
}

export default App
