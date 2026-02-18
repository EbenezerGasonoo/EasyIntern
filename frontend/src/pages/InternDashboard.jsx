import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './Dashboard.css'

function InternDashboard() {
  const { user } = useAuth()
  const [intern, setIntern] = useState(null)
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiFailed, setApiFailed] = useState(false)

  const displayName = user?.intern
    ? `${user.intern.firstName} ${user.intern.lastName}`
    : user?.email?.split('@')[0] || 'Intern'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setApiFailed(false)
    try {
      const [internRes, jobsRes, applicationsRes] = await Promise.all([
        api.get('/intern/profile').catch(() => null),
        api.get('/intern/recommended-jobs').catch(() => ({ data: [] })),
        api.get('/applications/my-applications').catch(() => ({ data: [] })),
      ])
      if (internRes?.data) setIntern(internRes.data)
      setRecommendedJobs(jobsRes?.data ?? [])
      setApplications(applicationsRes?.data ?? [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setApiFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'Accepted'
      case 'REJECTED': return 'Rejected'
      case 'REVIEWED': return 'Under review'
      default: return 'Pending'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'status-accepted'
      case 'REJECTED': return 'status-rejected'
      case 'REVIEWED': return 'status-reviewed'
      default: return 'status-pending'
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-loading">
            <div className="loading-spinner" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const pendingCount = applications.filter((a) => a.status === 'PENDING').length
  const acceptedCount = applications.filter((a) => a.status === 'ACCEPTED').length

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dashboard-hero intern-hero">
          <div className="dashboard-hero-content">
            <h1>Welcome back, {displayName}</h1>
            <p className="dashboard-hero-subtitle">
              Track your applications and discover jobs that match your skills.
            </p>
            <div className="dashboard-quick-actions">
              <Link to="/jobs" className="btn btn-primary">
                Browse all jobs
              </Link>
              <Link to="/profile" className="btn btn-secondary">
                Update profile
              </Link>
            </div>
          </div>
        </header>

        {apiFailed && (
          <div className="dashboard-banner dashboard-banner-info">
            <p>You're viewing in demo mode. Sign up or connect the backend to see real data.</p>
          </div>
        )}

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <p>Total applications</p>
          </div>
          <div className="stat-card stat-card-success">
            <span className="stat-number">{acceptedCount}</span>
            <p>Accepted</p>
          </div>
          <div className="stat-card stat-card-warning">
            <span className="stat-number">{pendingCount}</span>
            <p>Pending</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Recommended for you</h2>
            <Link to="/jobs" className="btn btn-secondary btn-sm">View all jobs</Link>
          </div>
          <div className="card">
            {recommendedJobs.length === 0 ? (
              <div className="dashboard-empty">
                <p>No recommended jobs yet. Complete your profile or browse all jobs to find matches.</p>
                <Link to="/jobs" className="btn btn-primary">Browse jobs</Link>
              </div>
            ) : (
              <div className="jobs-list">
                {recommendedJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="job-item">
                    <div className="job-item-content">
                      <h3>
                        {job.title}
                        {job.matchScore != null && (
                          <span className="match-score">{job.matchScore}% match</span>
                        )}
                      </h3>
                      <p className="job-item-company">{job.company?.name}</p>
                      <p className="job-item-desc">
                        {job.description?.substring(0, 120)}
                        {(job.description?.length || 0) > 120 ? '...' : ''}
                      </p>
                      <div className="job-meta">
                        {job.location && <span>📍 {job.location}</span>}
                        {job.remote && <span>🌐 Remote</span>}
                        {job.stipend && <span>💰 {job.stipend}</span>}
                      </div>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                      View details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>My applications</h2>
          <div className="card">
            {applications.length === 0 ? (
              <div className="dashboard-empty">
                <p>You haven't applied to any jobs yet.</p>
                <Link to="/jobs" className="btn btn-primary">Find jobs</Link>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map((app) => (
                  <div key={app.id} className={`application-item application-item--${app.status.toLowerCase()}`}>
                    <div className="application-item-content">
                      <h3>{app.job?.title}</h3>
                      <p className="application-company">{app.job?.company?.name}</p>
                      <span className={`application-status-badge ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                      <p className="application-date">
                        Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '—'}
                      </p>
                    </div>
                    <Link to={`/jobs/${app.job?.id}`} className="btn btn-secondary">
                      View job
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default InternDashboard
