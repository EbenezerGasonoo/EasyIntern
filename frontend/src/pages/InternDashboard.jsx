import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import './Dashboard.css'

function InternDashboard() {
  const [intern, setIntern] = useState(null)
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [internRes, jobsRes, applicationsRes] = await Promise.all([
        api.get('/intern/profile'),
        api.get('/intern/recommended-jobs'),
        api.get('/applications/my-applications'),
      ])
      setIntern(internRes.data)
      setRecommendedJobs(jobsRes.data)
      setApplications(applicationsRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'status-accepted'
      case 'REJECTED':
        return 'status-rejected'
      case 'REVIEWED':
        return 'status-reviewed'
      default:
        return 'status-pending'
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Intern Dashboard</h1>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{applications.length}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>
              {applications.filter((a) => a.status === 'ACCEPTED').length}
            </h3>
            <p>Accepted</p>
          </div>
          <div className="stat-card">
            <h3>
              {applications.filter((a) => a.status === 'PENDING').length}
            </h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="card">
          <h2>Recommended Jobs for You</h2>
          {recommendedJobs.length === 0 ? (
            <p>No recommended jobs at the moment. Check out all available jobs!</p>
          ) : (
            <div className="jobs-list">
              {recommendedJobs.slice(0, 5).map((job) => (
                <div key={job.id} className="job-item">
                  <div>
                    <h3>
                      {job.title}
                      {job.matchScore && (
                        <span className="match-score">
                          {job.matchScore}% match
                        </span>
                      )}
                    </h3>
                    <p>{job.company.name}</p>
                    <p>{job.description.substring(0, 100)}...</p>
                    <div className="job-meta">
                      {job.location && <span>📍 {job.location}</span>}
                      {job.remote && <span>🌐 Remote</span>}
                    </div>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
          <Link to="/jobs" className="btn btn-secondary">
            Browse All Jobs
          </Link>
        </div>

        <div className="card">
          <h2>My Applications</h2>
          {applications.length === 0 ? (
            <p>You haven't applied to any jobs yet. Start browsing!</p>
          ) : (
            <div className="applications-list">
              {applications.map((app) => (
                <div key={app.id} className="application-item">
                  <div>
                    <h3>{app.job.title}</h3>
                    <p>{app.job.company.name}</p>
                    <p className={`application-status ${getStatusColor(app.status)}`}>
                      Status: {app.status}
                    </p>
                    <p className="application-date">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/jobs/${app.job.id}`} className="btn btn-secondary">
                    View Job
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InternDashboard
