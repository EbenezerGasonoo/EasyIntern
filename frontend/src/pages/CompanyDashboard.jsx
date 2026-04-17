import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './Dashboard.css'

function CompanyDashboard() {
  const { user } = useAuth()
  const [company, setCompany] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiFailed, setApiFailed] = useState(false)
  const [showJobForm, setShowJobForm] = useState(false)
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    remote: false,
    duration: '',
    stipend: '',
    skills: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [jobFilter, setJobFilter] = useState('ALL')

  const companyName = user?.company?.name || user?.email?.split('@')[0] || 'Company'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setApiFailed(false)
    try {
      const [companyRes, applicationsRes] = await Promise.all([
        api.get('/company/profile').catch(() => null),
        api.get('/company/applications').catch(() => ({ data: [] })),
      ])
      if (companyRes?.data) setCompany(companyRes.data)
      setApplications(applicationsRes?.data ?? [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setApiFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const handleJobFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormError('')
    setJobForm({
      ...jobForm,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      await api.post('/jobs', {
        ...jobForm,
        requirements: jobForm.requirements
          ? jobForm.requirements.split('\n').filter((r) => r.trim())
          : [],
        skills: jobForm.skills
          ? jobForm.skills.split(',').map((s) => s.trim())
          : [],
      })
      setShowJobForm(false)
      setJobForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        remote: false,
        duration: '',
        stipend: '',
        skills: '',
      })
      fetchData()
    } catch (error) {
      console.error('Failed to create job:', error)
      setFormError(error.response?.data?.error || 'Failed to create job. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status })
      fetchData()
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update application status')
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page company-dashboard-page">
        <div className="company-dashboard-shell">
          <div className="dashboard-loading">
            <div className="loading-spinner" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const jobs = company?.jobs ?? []
  const pendingCount = applications.filter((a) => a.status === 'PENDING').length
  const reviewedCount = applications.filter((a) => a.status === 'REVIEWED').length
  const acceptedCount = applications.filter((a) => a.status === 'ACCEPTED').length
  const rejectedCount = applications.filter((a) => a.status === 'REJECTED').length
  const decisionCount = acceptedCount + rejectedCount
  const decisionRate = applications.length > 0 ? Math.round((decisionCount / applications.length) * 100) : 0
  const decidedApplications = applications.filter((a) => a.status === 'ACCEPTED' || a.status === 'REJECTED')
  const avgTimeToHireDays = decidedApplications.length > 0
    ? Math.round(
        decidedApplications.reduce((sum, app) => {
          const appliedAt = app.appliedAt ? new Date(app.appliedAt) : null
          const decidedAt = app.updatedAt ? new Date(app.updatedAt) : null
          if (!appliedAt || !decidedAt || Number.isNaN(appliedAt.getTime()) || Number.isNaN(decidedAt.getTime())) {
            return sum
          }
          const diffMs = Math.max(0, decidedAt.getTime() - appliedAt.getTime())
          return sum + (diffMs / (1000 * 60 * 60 * 24))
        }, 0) / decidedApplications.length
      )
    : null
  const topJobs = [...jobs]
    .sort((a, b) => (b._count?.applications ?? 0) - (a._count?.applications ?? 0))
    .slice(0, 4)
  const pendingApplications = applications.filter((a) => a.status === 'PENDING').slice(0, 5)
  const uniqueJobOptions = [...new Set(applications.map((app) => app.job?.title).filter(Boolean))]
  const filteredApplications = applications.filter((app) => {
    const statusMatch = statusFilter === 'ALL' || app.status === statusFilter
    const jobMatch = jobFilter === 'ALL' || app.job?.title === jobFilter
    return statusMatch && jobMatch
  })
  const pipelineStages = [
    { label: 'Applied', value: applications.length, tone: 'applied' },
    { label: 'Shortlisted', value: reviewedCount, tone: 'shortlisted' },
    { label: 'Offers', value: acceptedCount, tone: 'offers' },
    { label: 'Rejected', value: rejectedCount, tone: 'rejected' },
  ]

  return (
    <div className="dashboard-page company-dashboard-page">
      <div className="company-dashboard-shell">
        <header className="dashboard-hero company-hero">
          <div className="dashboard-hero-content">
            <h1>Welcome, {companyName}</h1>
            <p className="dashboard-hero-subtitle">
              Manage your job postings and review applications from talented interns.
            </p>
            <div className="dashboard-quick-actions">
              <button
                type="button"
                onClick={() => setShowJobForm(!showJobForm)}
                className={`btn ${showJobForm ? 'btn-secondary' : 'btn-primary'}`}
              >
                {showJobForm ? 'Cancel' : '+ Post new job'}
              </button>
              <Link to="/profile" className="btn btn-secondary">
                Company profile
              </Link>
            </div>
          </div>
        </header>

        {apiFailed && (
          <div className="dashboard-banner dashboard-banner-info">
            <p>You're viewing in demo mode. Sign up or connect the backend to manage real jobs and applications.</p>
          </div>
        )}

        {showJobForm && (
          <section className="dashboard-section">
            <div className="card card-form">
              <h2>Post new job</h2>
              <form onSubmit={handleCreateJob}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job title</label>
                    <input
                      type="text"
                      name="title"
                      value={jobForm.title}
                      onChange={handleJobFormChange}
                      placeholder="e.g. Software Development Intern"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={jobForm.location}
                      onChange={handleJobFormChange}
                      placeholder="e.g. Accra, Ghana"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={jobForm.description}
                    onChange={handleJobFormChange}
                    placeholder="Describe the role and what the intern will do..."
                    rows={4}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Requirements (one per line)</label>
                    <textarea
                      name="requirements"
                      value={jobForm.requirements}
                      onChange={handleJobFormChange}
                      placeholder="Currently pursuing a degree..."
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Required skills (comma-separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={jobForm.skills}
                      onChange={handleJobFormChange}
                      placeholder="JavaScript, React, Python"
                    />
                  </div>
                </div>
                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={jobForm.duration}
                      onChange={handleJobFormChange}
                      placeholder="e.g. 3 months"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stipend</label>
                    <input
                      type="text"
                      name="stipend"
                      value={jobForm.stipend}
                      onChange={handleJobFormChange}
                      placeholder="e.g. GHS 1,500/month"
                    />
                  </div>
                  <div className="form-group form-group-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="remote"
                        checked={jobForm.remote}
                        onChange={handleJobFormChange}
                      />
                      <span>Remote position</span>
                    </label>
                  </div>
                </div>
                {formError && <div className="error">{formError}</div>}
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Posting...' : 'Post job'}
                </button>
              </form>
            </div>
          </section>
        )}

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{jobs.length}</span>
            <p>Active jobs</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <p>Total applications</p>
          </div>
          <div className="stat-card stat-card-warning">
            <span className="stat-number">{pendingCount}</span>
            <p>Pending review</p>
          </div>
          <div className="stat-card stat-card-info">
            <span className="stat-number">{reviewedCount}</span>
            <p>Shortlisted</p>
          </div>
          <div className="stat-card stat-card-success">
            <span className="stat-number">{acceptedCount}</span>
            <p>Offers made</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">{decisionRate}%</span>
            <p>Decision rate</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">{avgTimeToHireDays == null ? '—' : `${avgTimeToHireDays}d`}</span>
            <p>Avg time-to-hire</p>
          </div>
        </section>

        <section className="dashboard-section company-insights-grid">
          <div className="card">
            <h2>Top performing roles</h2>
            {topJobs.length === 0 ? (
              <p className="company-insight-empty">No job data yet. Post roles to see response trends.</p>
            ) : (
              <div className="company-top-jobs-list">
                {topJobs.map((job) => (
                  <div key={job.id} className="company-top-job-row">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.location || (job.remote ? 'Remote' : 'Location not set')}</p>
                    </div>
                    <span className="company-top-job-count">{job._count?.applications ?? 0}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h2>Hiring queue (needs action)</h2>
            {pendingApplications.length === 0 ? (
              <p className="company-insight-empty">No pending applications right now.</p>
            ) : (
              <div className="company-hiring-queue">
                {pendingApplications.map((app) => (
                  <div key={app.id} className="company-queue-item">
                    <div>
                      <h3>{app.intern?.firstName} {app.intern?.lastName}</h3>
                      <p>{app.job?.title}</p>
                    </div>
                    <div className="company-queue-actions">
                      <button
                        type="button"
                        onClick={() => handleStatusUpdate(app.id, 'REVIEWED')}
                        className="btn btn-secondary btn-sm"
                      >
                        Shortlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="card">
            <div className="dashboard-section-header">
              <h2>Hiring pipeline overview</h2>
            </div>
            <div className="company-pipeline-grid">
              {pipelineStages.map((stage) => (
                <div key={stage.label} className={`company-pipeline-card ${stage.tone}`}>
                  <span>{stage.label}</span>
                  <strong>{stage.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Your jobs</h2>
          <div className="card">
            {jobs.length === 0 ? (
              <div className="dashboard-empty">
                <p>No jobs posted yet. Create your first job to start receiving applications.</p>
                <button
                  type="button"
                  onClick={() => setShowJobForm(true)}
                  className="btn btn-primary"
                >
                  Post a job
                </button>
              </div>
            ) : (
              <div className="jobs-list">
                {jobs.map((job) => (
                  <div key={job.id} className="job-item">
                    <div className="job-item-content">
                      <h3>{job.title}</h3>
                      <p className="job-item-desc">
                        {job.description?.substring(0, 100)}
                        {(job.description?.length || 0) > 100 ? '...' : ''}
                      </p>
                      <div className="job-meta">
                        <span className="job-applications-count">
                          {job._count?.applications ?? 0} application{(job._count?.applications ?? 0) !== 1 ? 's' : ''}
                        </span>
                        {job.location && <span>📍 {job.location}</span>}
                        {job.remote && <span>🌐 Remote</span>}
                      </div>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="btn btn-secondary">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Recent applications</h2>
            <div className="company-filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All statuses</option>
                <option value="PENDING">Pending</option>
                <option value="REVIEWED">Shortlisted</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
                <option value="ALL">All jobs</option>
                {uniqueJobOptions.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card">
            {filteredApplications.length === 0 ? (
              <div className="dashboard-empty">
                <p>No applications match this filter yet.</p>
                <Link to="/interns" className="btn btn-secondary">Browse interns</Link>
              </div>
            ) : (
              <div className="applications-list applications-list-company">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="application-item application-item-company">
                    <div className="application-item-content">
                      <h3>
                        {app.intern?.firstName} {app.intern?.lastName}
                      </h3>
                      <p className="application-job-title">
                        Applied for: <strong>{app.job?.title}</strong>
                      </p>
                      {app.coverLetter && (
                        <p className="cover-letter-preview">{app.coverLetter.substring(0, 150)}{app.coverLetter.length > 150 ? '...' : ''}</p>
                      )}
                      <span className={`application-status-badge status-${(app.status || '').toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="application-actions">
                      {app.status === 'PENDING' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(app.id, 'REVIEWED')}
                            className="btn btn-secondary"
                          >
                            Shortlist
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <Link to={`/interns/${app.intern?.id}`} className="btn btn-secondary">
                        View profile
                      </Link>
                    </div>
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

export default CompanyDashboard
