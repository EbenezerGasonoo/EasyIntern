import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CompanyDashboard from './pages/CompanyDashboard'
import InternDashboard from './pages/InternDashboard'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Interns from './pages/Interns'
import InternDetail from './pages/InternDetail'
import Profile from './pages/Profile'
import './App.css'

function PrivateRoute({ children, requireType }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requireType && user.userType !== requireType) {
    return <Navigate to={user.userType === 'COMPANY' ? '/company/dashboard' : '/intern/dashboard'} />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/interns" element={<Interns />} />
      <Route path="/interns/:id" element={<InternDetail />} />
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
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
