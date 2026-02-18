import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { sampleJobs } from '../data/sampleData'
import './Jobs.css'

function Jobs() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(sampleJobs)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [remote, setRemote] = useState('')

  // Browse Jobs is for interns only; redirect companies to their dashboard
  useEffect(() => {
    if (!authLoading && user?.userType === 'COMPANY') {
      navigate('/company/dashboard', { replace: true })
    }
  }, [authLoading, user?.userType, navigate])

  useEffect(() => {
    if (user?.userType === 'COMPANY') return
    fetchJobs()
  }, [user?.userType])

  const fetchJobs = async () => {
    try {
      const params = {}
      if (search) params.search = search
      if (location) params.location = location
      if (remote) params.remote = remote

      const response = await api.get('/jobs', { params })
      const data = Array.isArray(response.data) ? response.data : []
      setJobs(data.length > 0 ? data : sampleJobs)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
      setJobs(sampleJobs)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  if (authLoading || (!authLoading && user?.userType === 'COMPANY')) {
    return <div className="loading">Loading...</div>
  }

  if (loading) {
    return <div className="loading">Loading jobs...</div>
  }

  return (
    <div className="jobs-page">
      <div className="container">
        <h1>Browse Internship Opportunities</h1>

        <form onSubmit={handleSearch} className="search-filters">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-input"
          />
          <label>
            <input
              type="checkbox"
              checked={remote === 'true'}
              onChange={(e) => setRemote(e.target.checked ? 'true' : '')}
            />
            Remote only
          </label>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="jobs-grid airbnb-grid">
          {jobs.length === 0 ? (
            <p className="empty-state">No jobs found. Try adjusting your search criteria.</p>
          ) : (
            jobs.map((job) => (
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
                  {job.skills && job.skills.length > 0 && (
                    <div className="card-tags">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="tag">{skill}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-meta">
                    {job.location && <span>📍 {job.location}</span>}
                    {job.remote && <span>🌐 Remote</span>}
                    {job.stipend && <span>💰 {job.stipend}</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs
