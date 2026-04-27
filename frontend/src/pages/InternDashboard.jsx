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
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [ticketStatus, setTicketStatus] = useState('')
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    message: '',
  })
  const [platformUniversities, setPlatformUniversities] = useState([])
  const [schoolForm, setSchoolForm] = useState({
    universityId: '',
    enrollmentYear: '',
    course: '',
    graduationDate: '',
  })
  const [schoolMsg, setSchoolMsg] = useState('')
  const [schoolErr, setSchoolErr] = useState('')
  const [schoolSubmitting, setSchoolSubmitting] = useState(false)

  const displayName = user?.intern
    ? `${user.intern.firstName} ${user.intern.lastName}`
    : user?.email?.split('@')[0] || 'Intern'

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (user?.userType !== 'INTERN') return undefined
    let cancelled = false
    ;(async () => {
      try {
        const res = await api.get('/auth/universities')
        if (!cancelled) {
          setPlatformUniversities(Array.isArray(res.data) ? res.data : [])
        }
      } catch {
        if (!cancelled) setPlatformUniversities([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user?.userType])

  useEffect(() => {
    if (!intern) return
    const gd = intern.graduationDate
    let gradStr = ''
    if (gd) {
      const d = new Date(gd)
      gradStr = Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
    }
    setSchoolForm((prev) => ({
      ...prev,
      universityId: intern.universityId || '',
      enrollmentYear: intern.enrollmentYear != null ? String(intern.enrollmentYear) : '',
      course: intern.course || '',
      graduationDate: gradStr,
    }))
  }, [intern?.id, intern?.universityId, intern?.enrollmentYear, intern?.course, intern?.graduationDate])

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
        'Go to Profile for identity (KYI) and school documents. If your university uses EasyIntern, you can also request official student verification from your dashboard so your school can confirm you on the platform.',
    },
  ]

  const handleTicketChange = (e) => {
    const { name, value } = e.target
    setTicketStatus('')
    setTicketForm((prev) => ({ ...prev, [name]: value }))
  }

  const emailOk = user?.isEmailVerified === true
  const studentVerifyStatus =
    intern?.studentVerificationStatus ?? user?.intern?.studentVerificationStatus ?? 'NOT_SUBMITTED'

  const handleSchoolFormChange = (e) => {
    const { name, value } = e.target
    setSchoolErr('')
    setSchoolMsg('')
    setSchoolForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSchoolSubmit = async (e) => {
    e.preventDefault()
    setSchoolErr('')
    setSchoolMsg('')
    if (!schoolForm.universityId) {
      setSchoolErr('Select the school that should verify you on EasyIntern.')
      return
    }
    setSchoolSubmitting(true)
    try {
      const res = await api.post('/intern/request-university-verification', {
        universityId: schoolForm.universityId,
        enrollmentYear: schoolForm.enrollmentYear || null,
        course: schoolForm.course || null,
        graduationDate: schoolForm.graduationDate || null,
      })
      setSchoolMsg(res.data?.message || 'Request saved.')
      await fetchData()
    } catch (err) {
      setSchoolErr(err.response?.data?.error || 'Could not submit verification request.')
    } finally {
      setSchoolSubmitting(false)
    }
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

          {user?.userType === 'INTERN' && (
            <section className="dashboard-section">
              <h2>Student verification (your school on EasyIntern)</h2>
              <div className="card intern-school-verify-card">
                {!emailOk && (
                  <p className="intern-school-verify-lead">
                    Verify your email first. After that, you can ask a school that uses EasyIntern to confirm you as
                    their student.
                  </p>
                )}
                {emailOk && studentVerifyStatus === 'APPROVED' && (
                  <p className="intern-school-verify-success">
                    Your student status is verified
                    {intern?.university?.name ? ` with ${intern.university.name}` : ''}.
                  </p>
                )}
                {emailOk && studentVerifyStatus === 'PENDING' && (
                  <p className="intern-school-verify-pending">
                    We are waiting for{' '}
                    {intern?.university?.name || 'your school'} to confirm your student status. You will be notified
                    when they respond.
                  </p>
                )}
                {emailOk && studentVerifyStatus === 'REJECTED' && (
                  <p className="intern-school-verify-rejected" role="status">
                    Your previous request was not approved. You can submit again with the same or a different school on
                    EasyIntern.
                  </p>
                )}
                {emailOk && studentVerifyStatus !== 'APPROVED' && platformUniversities.length === 0 && (
                  <p className="intern-school-verify-lead">
                    There are no universities on EasyIntern to link yet. You can still complete your education on your
                    profile.
                  </p>
                )}
                {emailOk && studentVerifyStatus === 'PENDING' && intern?.universityId && (
                  <p className="intern-school-verify-note">
                    You can update the fields below; your request stays with your school until they respond.
                  </p>
                )}
                {emailOk &&
                  studentVerifyStatus !== 'APPROVED' &&
                  platformUniversities.length > 0 &&
                  (studentVerifyStatus !== 'PENDING' || intern?.universityId) && (
                    <form className="intern-school-verify-form" onSubmit={handleSchoolSubmit}>
                      {studentVerifyStatus === 'PENDING' ? null : (
                        <p className="intern-school-verify-lead">
                          If your school is on EasyIntern, select it here so they can confirm you as a student. We use
                          the student ID already on your profile.
                        </p>
                      )}
                      <div className="form-group">
                        <label htmlFor="dashboard-school-id">School on EasyIntern</label>
                        <select
                          id="dashboard-school-id"
                          name="universityId"
                          value={schoolForm.universityId}
                          onChange={handleSchoolFormChange}
                          required
                        >
                          <option value="">Select your school</option>
                          {platformUniversities.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="dashboard-enrollment-year">Enrollment year</label>
                          <input
                            id="dashboard-enrollment-year"
                            type="number"
                            name="enrollmentYear"
                            value={schoolForm.enrollmentYear}
                            onChange={handleSchoolFormChange}
                            placeholder="e.g. 2023"
                            min="1990"
                            max="2100"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dashboard-course">Course</label>
                          <input
                            id="dashboard-course"
                            type="text"
                            name="course"
                            value={schoolForm.course}
                            onChange={handleSchoolFormChange}
                            placeholder="e.g. BSc Computer Science"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="dashboard-graduation">Expected graduation (optional)</label>
                        <input
                          id="dashboard-graduation"
                          type="date"
                          name="graduationDate"
                          value={schoolForm.graduationDate}
                          onChange={handleSchoolFormChange}
                        />
                      </div>
                      {schoolErr && <p className="intern-school-verify-error">{schoolErr}</p>}
                      {schoolMsg && <p className="intern-school-verify-success-msg">{schoolMsg}</p>}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={schoolSubmitting || !schoolForm.universityId}
                      >
                        {schoolSubmitting
                          ? 'Sending…'
                          : studentVerifyStatus === 'PENDING'
                            ? 'Update request'
                            : 'Submit for school review'}
                      </button>
                    </form>
                  )}
              </div>
            </section>
          )}

          {apiFailed && (
            <div className="dashboard-banner dashboard-banner-info">
              <p>You're viewing in demo mode. Sign up or connect the backend to see real data.</p>
            </div>
          )}

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
