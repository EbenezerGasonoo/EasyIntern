import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { sampleJobs } from '../data/sampleData'
import './JobDetail.css'

function JobDetail() {
  const { id } = useParams()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Job detail/apply is for interns; redirect companies to their dashboard
  useEffect(() => {
    if (!authLoading && user?.userType === 'COMPANY') {
      navigate('/company/dashboard', { replace: true })
    }
  }, [authLoading, user?.userType, navigate])

  useEffect(() => {
    if (user?.userType === 'COMPANY') return
    fetchJob()
  }, [id, user?.userType])

  const fetchJob = async () => {
    if (id.startsWith('sample-job-')) {
      const index = parseInt(id.replace('sample-job-', ''), 10) - 1
      if (index >= 0 && index < sampleJobs.length) {
        setJob(sampleJobs[index])
      }
      setLoading(false)
      return
    }
    try {
      const response = await api.get(`/jobs/${id}`)
      setJob(response.data)
    } catch (error) {
      console.error('Failed to fetch job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    if (user.userType !== 'INTERN') {
      setError('Only interns can apply to jobs')
      return
    }

    setApplying(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/applications', {
        jobId: id,
        coverLetter,
      })
      setSuccess('Application submitted successfully!')
      setCoverLetter('')
      setTimeout(() => {
        navigate('/intern/dashboard')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (authLoading || (!authLoading && user?.userType === 'COMPANY')) {
    return <div className="loading">Loading...</div>
  }

  if (loading) {
    return <div className="loading">Loading job details...</div>
  }

  if (!job) {
    return <div className="container">Job not found</div>
  }

  const company = job.company || {}
  const requirements = Array.isArray(job.requirements) ? job.requirements : []
  const skills = Array.isArray(job.skills) ? job.skills : []
  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : []
  const benefits = Array.isArray(job.benefits) ? job.benefits : []
  const applicationCount = job._count?.applications ?? 0

  return (
    <div className="job-detail-page">
      <div className="container">
        <div className="job-detail">
          <header className="job-detail-hero">
            <div className="job-detail-hero-top">
              <div className="job-detail-company-brand">
                {company.logo ? (
                  <img src={company.logo} alt="" className="job-detail-company-logo" />
                ) : (
                  <div className="job-detail-company-logo-placeholder">
                    {(company.name || 'C').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1 className="job-detail-title">{job.title}</h1>
                  <p className="job-detail-company-name">{company.name}</p>
                  {(company.location || company.industry) && (
                    <p className="job-detail-company-meta">
                      {[company.location, company.industry].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="job-detail-key-strip">
              {job.location && (
                <span className="job-detail-key-item">
                  <span className="job-detail-key-icon" aria-hidden>📍</span>
                  {job.location}
                </span>
              )}
              <span className="job-detail-key-item">
                <span className="job-detail-key-icon" aria-hidden>🖥</span>
                {job.remote ? 'Remote' : 'On-site'}
              </span>
              {job.duration && (
                <span className="job-detail-key-item">
                  <span className="job-detail-key-icon" aria-hidden>📅</span>
                  {job.duration}
                </span>
              )}
              {job.stipend && (
                <span className="job-detail-key-item job-detail-stipend">
                  <span className="job-detail-key-icon" aria-hidden>💰</span>
                  {job.stipend}
                </span>
              )}
              {applicationCount > 0 && (
                <span className="job-detail-key-item job-detail-applications">
                  {applicationCount} application{applicationCount !== 1 ? 's' : ''} so far
                </span>
              )}
            </div>
          </header>

          <div className="job-detail-content">
            <div className="job-main">
              <section className="card job-detail-card">
                <h2>About the role</h2>
                <div className="job-detail-description">
                  {job.description}
                </div>
              </section>

              {responsibilities.length > 0 && (
                <section className="card job-detail-card">
                  <h2>Responsibilities</h2>
                  <p className="job-detail-intro">What you’ll be doing day to day:</p>
                  <ul className="job-detail-list">
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="card job-detail-card job-detail-meta-grid">
                <h2>Key details</h2>
                <dl className="job-detail-dl">
                  <div className="job-detail-dl-row">
                    <dt>Location</dt>
                    <dd>{job.location || '—'}</dd>
                  </div>
                  <div className="job-detail-dl-row">
                    <dt>Work type</dt>
                    <dd>{job.remote ? 'Remote' : 'On-site'}</dd>
                  </div>
                  {job.duration && (
                    <div className="job-detail-dl-row">
                      <dt>Duration</dt>
                      <dd>{job.duration}</dd>
                    </div>
                  )}
                  {job.stipend && (
                    <div className="job-detail-dl-row">
                      <dt>Stipend / compensation</dt>
                      <dd>{job.stipend}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {requirements.length > 0 && (
                <section className="card job-detail-card">
                  <h2>What we’re looking for</h2>
                  <p className="job-detail-intro">Requirements and qualifications:</p>
                  <ul className="job-detail-list">
                    {requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </section>
              )}

              {skills.length > 0 && (
                <section className="card job-detail-card">
                  <h2>Required skills</h2>
                  <div className="job-detail-skills">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag job-detail-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {benefits.length > 0 && (
                <section className="card job-detail-card">
                  <h2>What we offer</h2>
                  <ul className="job-detail-benefits">
                    {benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </section>
              )}

              {(company.description || company.website || company.benefits || company.companySize || company.contactEmail) && (
                <section className="card job-detail-card job-detail-about-company">
                  <h2>About the company</h2>
                  {company.description && (
                    <p className="job-detail-company-desc">{company.description}</p>
                  )}
                  <dl className="job-detail-dl job-detail-company-dl">
                    {company.industry && (
                      <div className="job-detail-dl-row">
                        <dt>Industry</dt>
                        <dd>{company.industry}</dd>
                      </div>
                    )}
                    {company.location && (
                      <div className="job-detail-dl-row">
                        <dt>Office location</dt>
                        <dd>{company.location}</dd>
                      </div>
                    )}
                    {company.companySize && (
                      <div className="job-detail-dl-row">
                        <dt>Company size</dt>
                        <dd>{company.companySize}</dd>
                      </div>
                    )}
                    {company.website && (
                      <div className="job-detail-dl-row">
                        <dt>Website</dt>
                        <dd>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="job-detail-link">
                            {company.website.replace(/^https?:\/\//, '')}
                          </a>
                        </dd>
                      </div>
                    )}
                    {company.contactEmail && (
                      <div className="job-detail-dl-row">
                        <dt>Contact</dt>
                        <dd>
                          <a href={`mailto:${company.contactEmail}`} className="job-detail-link">
                            {company.contactEmail}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                  {company.benefits && (
                    <p className="job-detail-company-benefits">
                      <strong>What we offer interns:</strong> {company.benefits}
                    </p>
                  )}
                </section>
              )}
            </div>

            {user?.userType === 'INTERN' && (
              <aside className="job-sidebar">
                <div className="card job-apply-card">
                  <h2>Apply for this position</h2>
                  <form onSubmit={handleApply}>
                    <div className="form-group">
                      <label>Cover letter (optional)</label>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Tell the company why you're a great fit..."
                        rows={6}
                      />
                    </div>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button
                      type="submit"
                      className="btn btn-primary job-apply-btn"
                      disabled={applying}
                    >
                      {applying ? 'Applying...' : 'Apply now'}
                    </button>
                  </form>
                </div>
              </aside>
            )}

            {!user && (
              <aside className="job-sidebar">
                <div className="card job-apply-card job-apply-cta">
                  <h2>Interested in this role?</h2>
                  <p>Sign in or register as an intern to apply.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="btn btn-primary job-apply-btn"
                  >
                    Sign in to apply
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
