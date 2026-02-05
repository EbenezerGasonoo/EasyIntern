import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './Home.css'

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [interns, setInterns] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [internsRes, jobsRes] = await Promise.all([
        api.get('/intern/browse').catch(() => ({ data: [] })),
        api.get('/jobs').catch(() => ({ data: [] }))
      ])
      setInterns(internsRes.data.slice(0, 6))
      setJobs(jobsRes.data.slice(0, 6))
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (internId) => {
    if (!user) {
      if (window.confirm('You need to sign up or login to contact interns. Would you like to register now?')) {
        navigate('/register?type=company')
      }
      return
    }
    if (user.userType !== 'COMPANY') {
      alert('Only companies can contact interns')
      return
    }
    navigate(`/interns/${internId}`)
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Find Talented Interns & Opportunities</h1>
          <p className="hero-subtitle">
            Browse intern profiles and job opportunities. Sign up to connect and interact.
          </p>
          <div className="hero-actions">
            <Link to="/interns" className="btn btn-primary btn-large">
              Browse Interns
            </Link>
            <Link to="/jobs" className="btn btn-secondary btn-large">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      <section className="marketplace-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Interns</h2>
            <Link to="/interns" className="view-all-link">View All →</Link>
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : interns.length > 0 ? (
            <div className="interns-grid airbnb-grid">
              {interns.map((intern) => (
                <div key={intern.id} className="intern-card airbnb-card" onClick={() => navigate(`/interns/${intern.id}`)}>
                  <div className="card-image-container">
                    {intern.profilePic ? (
                      <img src={intern.profilePic} alt={`${intern.firstName} ${intern.lastName}`} className="card-image" />
                    ) : (
                      <div className="card-image-placeholder">
                        <div className="avatar-large">
                          {intern.firstName[0]}{intern.lastName[0]}
                        </div>
                      </div>
                    )}
                    <div className="card-heart">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'white', strokeWidth: '2', overflow: 'visible'}}>
                        <path d="m16 28c7-4.733 14-10 14-17a6.977 6.977 0 0 0-2.05-4.95A6.977 6.977 0 0 0 16 2.05 6.977 6.977 0 0 0 4.05 6.05 6.977 6.977 0 0 0 2 11c0 7 7 12.267 14 17z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{intern.firstName} {intern.lastName}</h3>
                      {intern.location && <div className="card-location">📍 {intern.location}</div>}
                    </div>
                    {intern.bio && (
                      <div className="card-description">{intern.bio.substring(0, 80)}...</div>
                    )}
                    {intern.skills && intern.skills.length > 0 && (
                      <div className="card-tags">
                        {intern.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="tag">{skill}</span>
                        ))}
                      </div>
                    )}
                    <div className="card-footer">
                      <span className="card-action-text">
                        {user && user.userType === 'COMPANY' ? 'Contact Intern' : 'Sign up to contact'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No interns available yet. Be the first to sign up!</p>
          )}
        </div>
      </section>

      <section className="marketplace-section">
        <div className="container">
          <div className="section-header">
            <h2>Latest Job Opportunities</h2>
            <Link to="/jobs" className="view-all-link">View All →</Link>
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : jobs.length > 0 ? (
            <div className="jobs-grid airbnb-grid">
              {jobs.map((job) => (
                <div key={job.id} className="job-card airbnb-card" onClick={() => navigate(`/jobs/${job.id}`)}>
                  <div className="card-image-container">
                    <div className="card-image-placeholder job-image">
                      <div className="company-logo">{job.company.name.charAt(0)}</div>
                    </div>
                    <div className="card-heart">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'white', strokeWidth: '2', overflow: 'visible'}}>
                        <path d="m16 28c7-4.733 14-10 14-17a6.977 6.977 0 0 0-2.05-4.95A6.977 6.977 0 0 0 16 2.05 6.977 6.977 0 0 0 4.05 6.05 6.977 6.977 0 0 0 2 11c0 7 7 12.267 14 17z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{job.title}</h3>
                      <div className="card-location">{job.company.name}</div>
                    </div>
                    <div className="card-description">{job.description.substring(0, 80)}...</div>
                    <div className="card-meta">
                      {job.location && <span>📍 {job.location}</span>}
                      {job.remote && <span>🌐 Remote</span>}
                      {job.stipend && <span>💰 {job.stipend}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No jobs posted yet. Sign up as a company to post the first job!</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
