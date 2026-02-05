import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './JobDetail.css'

function JobDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
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

  if (loading) {
    return <div className="loading">Loading job details...</div>
  }

  if (!job) {
    return <div className="container">Job not found</div>
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <div className="job-detail">
          <div className="job-detail-header">
            <div>
              <h1>{job.title}</h1>
              <p className="company-info">
                <strong>{job.company.name}</strong>
                {job.company.location && ` • ${job.company.location}`}
                {job.company.industry && ` • ${job.company.industry}`}
              </p>
            </div>
          </div>

          <div className="job-detail-content">
            <div className="job-main">
              <div className="card">
                <h2>Description</h2>
                <p>{job.description}</p>
              </div>

              <div className="card">
                <h2>Requirements</h2>
                <ul>
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h2>Required Skills</h2>
                <div className="skills-list">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2>Job Details</h2>
                <div className="job-details-grid">
                  {job.location && (
                    <div>
                      <strong>Location:</strong> {job.location}
                    </div>
                  )}
                  <div>
                    <strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}
                  </div>
                  {job.duration && (
                    <div>
                      <strong>Duration:</strong> {job.duration}
                    </div>
                  )}
                  {job.stipend && (
                    <div>
                      <strong>Stipend:</strong> {job.stipend}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {user?.userType === 'INTERN' && (
              <div className="job-sidebar">
                <div className="card">
                  <h2>Apply for this Position</h2>
                  <form onSubmit={handleApply}>
                    <div className="form-group">
                      <label>Cover Letter (Optional)</label>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Tell the company why you're a great fit..."
                        rows="6"
                      />
                    </div>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={applying}
                    >
                      {applying ? 'Applying...' : 'Apply Now'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
