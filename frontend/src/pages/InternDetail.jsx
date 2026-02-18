import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { sampleInterns } from '../data/sampleData'
import { AptitudeChart } from '../components/AptitudeChart'
import './InternDetail.css'

function InternDetail() {
  const { id } = useParams()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [intern, setIntern] = useState(null)
  const [loading, setLoading] = useState(true)

  // Interns shouldn't browse other interns' profiles; redirect to dashboard
  useEffect(() => {
    if (!authLoading && user?.userType === 'INTERN') {
      navigate('/intern/dashboard', { replace: true })
    }
  }, [authLoading, user?.userType, navigate])

  useEffect(() => {
    if (user?.userType === 'INTERN') return
    fetchIntern()
  }, [id, user?.userType])

  const fetchIntern = async () => {
    if (id.startsWith('sample-intern-')) {
      const index = parseInt(id.replace('sample-intern-', ''), 10) - 1
      if (index >= 0 && index < sampleInterns.length) {
        setIntern(sampleInterns[index])
      }
      setLoading(false)
      return
    }
    try {
      const response = await api.get(`/intern/${id}`)
      setIntern(response.data)
    } catch (error) {
      console.error('Failed to fetch intern:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = () => {
    if (!user) {
      if (window.confirm('You need to sign up or login to contact this intern. Would you like to register now?')) {
        navigate('/register?type=company')
      }
      return
    }
    if (user.userType !== 'COMPANY') {
      alert('Only companies can contact interns. Please register as a company.')
      return
    }
    // Here you could show a contact form or redirect to a messaging system
    alert('Contact functionality - This would open a contact form or messaging system')
  }

  if (authLoading || (!authLoading && user?.userType === 'INTERN')) {
    return <div className="loading">Loading...</div>
  }

  if (loading) {
    return <div className="loading">Loading intern profile...</div>
  }

  if (!intern) {
    return <div className="container">Intern not found</div>
  }

  const skillsCount = Array.isArray(intern.skills) ? intern.skills.length : 0

  return (
    <div className="intern-detail-page">
      <div className="container">
        <div className="intern-detail">
          <div className="intern-detail-header">
            <div className="intern-profile-section">
              {intern.profilePic ? (
                <img src={intern.profilePic} alt={`${intern.firstName} ${intern.lastName}`} className="intern-detail-avatar" />
              ) : (
                <div className="intern-detail-avatar-placeholder">
                  {intern.firstName[0]}{intern.lastName[0]}
                </div>
              )}
              <div className="intern-profile-info">
                <h1>{intern.firstName} {intern.lastName}</h1>
                {intern.location && (
                  <p className="intern-location">
                    <span className="intern-location-icon" aria-hidden>📍</span>
                    {intern.location}
                  </p>
                )}
                <div className="intern-at-a-glance">
                  {skillsCount > 0 && <span className="intern-glance-item">{skillsCount} skills</span>}
                  {intern.education && (
                    <span className="intern-glance-item intern-education-one-liner" title={intern.education}>
                      {intern.education.length > 40 ? `${intern.education.slice(0, 40)}…` : intern.education}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleContact} className="btn btn-primary btn-large">
              {user && user.userType === 'COMPANY' ? 'Contact Intern' : 'Sign Up to Contact'}
            </button>
          </div>

          <div className="intern-detail-layout">
            <aside className="intern-detail-sidebar">
              <div className="intern-detail-sidebar-card location-card">
                <h3>Location</h3>
                <p className="intern-sidebar-location">
                  {intern.location ? (
                    <>
                      <span className="location-pin" aria-hidden>📍</span>
                      {intern.location}
                    </>
                  ) : (
                    <span className="text-muted">Not specified</span>
                  )}
                </p>
              </div>
              <div className="intern-detail-sidebar-card">
                <AptitudeChart intern={intern} showPie showBreakdown={false} />
              </div>
            </aside>

            <div className="intern-detail-content">
              <div className="card">
                <h2>About</h2>
                {intern.bio ? (
                  <p>{intern.bio}</p>
                ) : (
                  <p className="text-muted">No bio available</p>
                )}
              </div>

              {intern.skills && intern.skills.length > 0 && (
                <div className="card">
                  <h2>Skills</h2>
                  <div className="skills-list">
                    {intern.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag large">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {intern.education && (
                <div className="card">
                  <h2>Education</h2>
                  <p>🎓 {intern.education}</p>
                </div>
              )}

              {intern.experience && (
                <div className="card">
                  <h2>Experience</h2>
                  <p>{intern.experience}</p>
                </div>
              )}

              {intern.resume && (
                <div className="card">
                  <h2>Resume</h2>
                  <a href={intern.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View Resume
                  </a>
                </div>
              )}

              {!user && (
                <div className="card contact-prompt">
                  <h2>Interested in this intern?</h2>
                  <p>Sign up as a company to contact and hire talented interns like {intern.firstName}.</p>
                  <button onClick={() => navigate('/register?type=company')} className="btn btn-primary">
                    Sign Up as Company
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternDetail
