import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import './Dashboard.css'

function CompanyDashboard() {
  const [company, setCompany] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [companyRes, applicationsRes] = await Promise.all([
        api.get('/company/profile'),
        api.get('/company/applications'),
      ])
      setCompany(companyRes.data)
      setApplications(applicationsRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJobFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setJobForm({
      ...jobForm,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleCreateJob = async (e) => {
    e.preventDefault()
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
      alert('Failed to create job')
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
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Company Dashboard</h1>
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="btn btn-primary"
          >
            {showJobForm ? 'Cancel' : '+ Post New Job'}
          </button>
        </div>

        {showJobForm && (
          <div className="card">
            <h2>Post New Job</h2>
            <form onSubmit={handleCreateJob}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={jobForm.title}
                  onChange={handleJobFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={jobForm.description}
                  onChange={handleJobFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  value={jobForm.requirements}
                  onChange={handleJobFormChange}
                />
              </div>
              <div className="form-group">
                <label>Required Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={jobForm.skills}
                  onChange={handleJobFormChange}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={jobForm.location}
                  onChange={handleJobFormChange}
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="remote"
                    checked={jobForm.remote}
                    onChange={handleJobFormChange}
                  />
                  Remote position
                </label>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={jobForm.duration}
                  onChange={handleJobFormChange}
                  placeholder="e.g., 3 months"
                />
              </div>
              <div className="form-group">
                <label>Stipend</label>
                <input
                  type="text"
                  name="stipend"
                  value={jobForm.stipend}
                  onChange={handleJobFormChange}
                  placeholder="e.g., $500/month"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </form>
          </div>
        )}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{company?.jobs?.length || 0}</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{applications.length}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>
              {applications.filter((a) => a.status === 'PENDING').length}
            </h3>
            <p>Pending Reviews</p>
          </div>
        </div>

        <div className="card">
          <h2>Your Jobs</h2>
          {company?.jobs?.length === 0 ? (
            <p>No jobs posted yet. Create your first job posting!</p>
          ) : (
            <div className="jobs-list">
              {company?.jobs?.map((job) => (
                <div key={job.id} className="job-item">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.description.substring(0, 100)}...</p>
                    <span className="job-meta">
                      {job._count.applications} applications
                    </span>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="btn btn-secondary">
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Recent Applications</h2>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <div className="applications-list">
              {applications.map((app) => (
                <div key={app.id} className="application-item">
                  <div>
                    <h3>
                      {app.intern.firstName} {app.intern.lastName}
                    </h3>
                    <p>
                      Applied for: <strong>{app.job.title}</strong>
                    </p>
                    <p className={`application-status status-${app.status.toLowerCase()}`}>
                      Status: {app.status}
                    </p>
                    {app.coverLetter && (
                      <p className="cover-letter">{app.coverLetter}</p>
                    )}
                  </div>
                  <div className="application-actions">
                    {app.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(app.id, 'ACCEPTED')
                          }
                          className="btn btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(app.id, 'REJECTED')
                          }
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
