import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import AccountDeletionPanel from '../components/AccountDeletionPanel'
import './Dashboard.css'

function InternDashboard() {
  const { user } = useAuth()
  const [intern, setIntern] = useState(null)
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiFailed, setApiFailed] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [ticketStatus, setTicketStatus] = useState('')
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    message: '',
  })

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

  const getProgressStep = (status) => {
    switch (status) {
      case 'REVIEWED':
        return 2
      case 'ACCEPTED':
      case 'REJECTED':
        return 3
      default:
        return 1
    }
  }

  const faqItems = [
    {
      question: 'How do I improve my profile visibility?',
      answer:
        'Complete your profile, add strong skills, resume, and KYI verification (Ghana Card plus school proof) to boost trust.',
    },
    {
      question: 'When will my application move to review?',
      answer: 'Once a company opens and checks your application, status changes from Applied to Under Review.',
    },
    {
      question: 'How do I become verified?',
      answer:
        'Go to Profile, complete KYI (Ghana Card and identity), add your Education, and upload school proof (enrollment letter or student ID from your institution).',
    },
  ]

  const handleTicketChange = (e) => {
    const { name, value } = e.target
    setTicketStatus('')
    setTicketForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    if (!ticketForm.category || !ticketForm.subject.trim() || !ticketForm.message.trim()) {
      setTicketStatus('Please complete all fields.')
      return
    }
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`
    setTicketStatus(`Ticket ${ticketId} submitted.`)
    setTicketForm({ category: '', subject: '', message: '' })
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
  const reviewedCount = applications.filter((a) => a.status === 'REVIEWED').length

  return (
    <div className="dashboard-page intern-dashboard-page">
      <div className="intern-dashboard-shell">
        <aside className="intern-dashboard-side">
          <div className="intern-profile-panel">
            <div className="intern-profile-avatar-wrap">
              {intern?.profilePic || user?.intern?.profilePic ? (
                <img
                  src={intern?.profilePic || user?.intern?.profilePic}
                  alt={displayName}
                  className="intern-profile-avatar"
                />
              ) : (
                <div className="intern-profile-avatar-placeholder">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3>
              {displayName}
              {(intern?.isVerified || user?.intern?.isVerified) && (
                <span className="dashboard-verified-badge" title="Verified Intern">✓</span>
              )}
            </h3>
            <p>{intern?.education || user?.intern?.education || 'EasyIntern member'}</p>
            <Link to="/profile" className="btn btn-secondary intern-side-btn">
              Edit profile
            </Link>

            <div className="intern-side-hours">
              <div>
                <span>Profile status</span>
                <strong>{intern ? 'Complete' : 'Pending'}</strong>
              </div>
              <div>
                <span>Saved jobs</span>
                <strong>{recommendedJobs.length}</strong>
              </div>
            </div>

            <div className="intern-side-city">
              <h4>{intern?.location || user?.intern?.location || 'Accra, Ghana'}</h4>
              <p>Explore opportunities near you</p>
            </div>
          </div>

          <div className="intern-help-panel">
            <h3>Help, FAQ & Ticketing</h3>
            <div className="intern-faq-list">
              {faqItems.map((item, index) => (
                <div key={item.question} className="intern-faq-item">
                  <button
                    type="button"
                    className={`intern-faq-question ${openFaqIndex === index ? 'active' : ''}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <span>{openFaqIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === index && (
                    <p className="intern-faq-answer">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>

            <form className="intern-ticket-form" onSubmit={handleTicketSubmit}>
              <h4>Submit ticket</h4>
              <select name="category" value={ticketForm.category} onChange={handleTicketChange}>
                <option value="">Issue type</option>
                <option value="account">Account</option>
                <option value="verification">Verification</option>
                <option value="applications">Applications</option>
                <option value="technical">Technical</option>
              </select>
              <input
                type="text"
                name="subject"
                value={ticketForm.subject}
                onChange={handleTicketChange}
                placeholder="Subject"
              />
              <textarea
                name="message"
                value={ticketForm.message}
                onChange={handleTicketChange}
                placeholder="Describe your issue"
                rows={3}
              />
              {ticketStatus && (
                <p className={`intern-ticket-status ${ticketStatus.includes('submitted') ? 'success' : 'error'}`}>
                  {ticketStatus}
                </p>
              )}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </aside>

        <section className="intern-dashboard-main">
          <header className="dashboard-hero intern-hero intern-dashboard-hero">
            <div className="dashboard-hero-content">
              <p className="intern-dashboard-eyebrow">Working productivity</p>
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

          <AccountDeletionPanel backendUnavailable={apiFailed} />

          <section className="dashboard-stats intern-stats-grid">
            <div className="stat-card">
              <span className="stat-number">{applications.length}</span>
              <p>Total applications</p>
            </div>
            <div className="stat-card stat-card-success">
              <span className="stat-number">{acceptedCount}</span>
              <p>Accepted</p>
            </div>
            <div className="stat-card stat-card-info">
              <span className="stat-number">{reviewedCount}</span>
              <p>Under review</p>
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
                        <div className="application-timeline">
                          {['Applied', 'Under Review', app.status === 'REJECTED' ? 'Rejected' : 'Accepted'].map((label, idx) => {
                            const step = idx + 1
                            const active = getProgressStep(app.status) >= step
                            const finalRejected = app.status === 'REJECTED' && step === 3
                            return (
                              <div
                                key={label}
                                className={`timeline-step ${active ? 'active' : ''} ${finalRejected ? 'rejected' : ''}`}
                              >
                                <span className="timeline-dot" />
                                <span className="timeline-label">{label}</span>
                              </div>
                            )
                          })}
                        </div>
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
        </section>
      </div>
    </div>
  )
}

export default InternDashboard
