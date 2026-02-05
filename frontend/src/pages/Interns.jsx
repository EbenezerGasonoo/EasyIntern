import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './Interns.css'

function Interns() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [interns, setInterns] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState('')

  useEffect(() => {
    fetchInterns()
  }, [])

  const fetchInterns = async () => {
    try {
      const params = {}
      if (search) params.search = search
      if (location) params.location = location
      if (skills) params.skills = skills

      const response = await api.get('/intern/browse', { params })
      setInterns(response.data)
    } catch (error) {
      console.error('Failed to fetch interns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchInterns()
  }

  const handleContact = (internId) => {
    if (!user) {
      if (window.confirm('You need to sign up or login to contact interns. Would you like to register now?')) {
        navigate('/register')
      }
      return
    }
    if (user.userType !== 'COMPANY') {
      alert('Only companies can contact interns')
      return
    }
    // Navigate to intern detail page or show contact form
    navigate(`/interns/${internId}`)
  }

  if (loading) {
    return <div className="loading">Loading interns...</div>
  }

  return (
    <div className="interns-page">
      <div className="container">
        <h1>Browse Talented Interns</h1>
        <p className="page-subtitle">Discover skilled interns ready to join your team</p>

        <form onSubmit={handleSearch} className="search-filters">
          <input
            type="text"
            placeholder="Search by name or skills..."
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
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="interns-grid airbnb-grid">
          {interns.length === 0 ? (
            <p className="empty-state">No interns found. Try adjusting your search criteria.</p>
          ) : (
            interns.map((intern) => (
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
                      {intern.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="tag">{skill}</span>
                      ))}
                      {intern.skills.length > 4 && <span className="tag">+{intern.skills.length - 4}</span>}
                    </div>
                  )}
                  {intern.education && (
                    <div className="card-meta">🎓 {intern.education}</div>
                  )}
                  <div className="card-footer">
                    <span className="card-action-text">
                      {user && user.userType === 'COMPANY' ? 'Contact Intern' : 'Sign up to contact'}
                    </span>
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

export default Interns
