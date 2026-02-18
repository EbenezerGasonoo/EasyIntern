import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { sampleInterns, sampleJobs } from '../data/sampleData'
import './Home.css'

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [interns, setInterns] = useState(sampleInterns.slice(0, 6))
  const [jobs, setJobs] = useState(sampleJobs.slice(0, 6))
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setApiError(null)
    try {
      const [internsRes, jobsRes] = await Promise.all([
        api.get('/intern/browse').catch(() => ({ data: [] })),
        api.get('/jobs').catch(() => ({ data: [] })),
      ])
      const internList = Array.isArray(internsRes?.data) ? internsRes.data : []
      const jobList = Array.isArray(jobsRes?.data) ? jobsRes.data : []
      if (internList.length > 0 || jobList.length > 0) {
        setInterns(internList.slice(0, 6))
        setJobs(jobList.slice(0, 6))
        setApiError(null)
      } else {
        setInterns(sampleInterns.slice(0, 6))
        setJobs(sampleJobs.slice(0, 6))
        setApiError('Showing sample data. Seed the database to see real data (see DEPLOY_VERCEL.md).')
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setInterns(sampleInterns.slice(0, 6))
      setJobs(sampleJobs.slice(0, 6))
      setApiError('Using sample data. API unavailable — check backend and VITE_API_URL.')
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
    <div className="landing">
      {apiError && (
        <div className="landing-api-banner">
          <p>{apiError}</p>
        </div>
      )}

      <section className="landing-hero">
        <div className="landing-hero-inner container">
          <p className="landing-hero-badge">Where talent meets opportunity</p>
          <h1 className="landing-hero-title">
            Your next internship or your next hire starts here
          </h1>
          <p className="landing-hero-sub">
            Join students and companies across Ghana. Create a profile, browse opportunities, and connect in one place.
          </p>
          <div className="landing-hero-ctas">
            <Link to="/register?type=intern" className="landing-cta landing-cta-intern">
              <span className="landing-cta-icon">🎯</span>
              <span className="landing-cta-text">I'm looking for an internship</span>
              <span className="landing-cta-sub">Students & graduates</span>
            </Link>
            <Link to="/register?type=company" className="landing-cta landing-cta-company">
              <span className="landing-cta-icon">🏢</span>
              <span className="landing-cta-text">I want to hire interns</span>
              <span className="landing-cta-sub">Companies & teams</span>
            </Link>
          </div>
          <p className="landing-hero-login">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>

      <section className="landing-how">
        <div className="container">
          <h2 className="landing-section-title">How it works</h2>
          <p className="landing-section-lead">Get started in three simple steps.</p>
          <div className="landing-steps">
            <div className="landing-step">
              <span className="landing-step-num">1</span>
              <h3 className="landing-step-title">Sign up</h3>
              <p className="landing-step-desc">Create a free account as an intern or a company. It only takes a minute.</p>
            </div>
            <div className="landing-step">
              <span className="landing-step-num">2</span>
              <h3 className="landing-step-title">Show who you are</h3>
              <p className="landing-step-desc">Interns: build your profile with skills and experience. Companies: post roles and describe your team.</p>
            </div>
            <div className="landing-step">
              <span className="landing-step-num">3</span>
              <h3 className="landing-step-title">Connect</h3>
              <p className="landing-step-desc">Browse jobs and apply, or discover talented interns and reach out. The rest is up to you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section-interns">
        <div className="container">
          <div className="landing-section-head">
            <div>
              <h2 className="landing-section-title">Featured interns</h2>
              <p className="landing-section-lead">Skilled students and graduates ready to join your team.</p>
            </div>
            {user?.userType !== 'INTERN' && (
              <Link to="/interns" className="landing-view-all">View all →</Link>
            )}
          </div>
          {loading ? (
            <div className="landing-loading">Loading...</div>
          ) : interns.length > 0 ? (
            <div className="landing-grid">
              {interns.map((intern) => (
                <article
                  key={intern.id}
                  className="landing-card landing-card-intern"
                  onClick={() => user?.userType === 'INTERN' ? undefined : navigate(`/interns/${intern.id}`)}
                  role={user?.userType !== 'INTERN' ? 'button' : undefined}
                  tabIndex={user?.userType !== 'INTERN' ? 0 : undefined}
                  onKeyDown={(e) => user?.userType !== 'INTERN' && (e.key === 'Enter' || e.key === ' ') && navigate(`/interns/${intern.id}`)}
                >
                  <div className="landing-card-media">
                    {intern.profilePic ? (
                      <img src={intern.profilePic} alt="" className="landing-card-img" />
                    ) : (
                      <div className="landing-card-avatar">
                        {intern.firstName[0]}{intern.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div className="landing-card-body">
                    <h3 className="landing-card-title">{intern.firstName} {intern.lastName}</h3>
                    {intern.location && <p className="landing-card-meta">📍 {intern.location}</p>}
                    {intern.bio && (
                      <p className="landing-card-desc">{intern.bio.substring(0, 90)}{intern.bio.length > 90 ? '…' : ''}</p>
                    )}
                    {intern.skills?.length > 0 && (
                      <div className="landing-card-tags">
                        {intern.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="landing-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                    {user?.userType === 'COMPANY' && (
                      <span className="landing-card-cta">Contact intern →</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="landing-empty">No interns yet. Be the first to sign up!</p>
          )}
        </div>
      </section>

      <section className="landing-section landing-section-jobs">
        <div className="container">
          <div className="landing-section-head">
            <div>
              <h2 className="landing-section-title">Latest opportunities</h2>
              <p className="landing-section-lead">Internship roles from companies across Ghana.</p>
            </div>
            {user?.userType !== 'COMPANY' && (
              <Link to="/jobs" className="landing-view-all">View all →</Link>
            )}
          </div>
          {loading ? (
            <div className="landing-loading">Loading...</div>
          ) : jobs.length > 0 ? (
            <div className="landing-grid">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="landing-card landing-card-job"
                  onClick={() => user?.userType === 'COMPANY' ? undefined : navigate(`/jobs/${job.id}`)}
                  role={user?.userType !== 'COMPANY' ? 'button' : undefined}
                  tabIndex={user?.userType !== 'COMPANY' ? 0 : undefined}
                  onKeyDown={(e) => user?.userType !== 'COMPANY' && (e.key === 'Enter' || e.key === ' ') && navigate(`/jobs/${job.id}`)}
                >
                  <div className="landing-card-media landing-card-media-job">
                    <div className="landing-card-company-initial">
                      {(job.company?.name || 'C').charAt(0)}
                    </div>
                  </div>
                  <div className="landing-card-body">
                    <h3 className="landing-card-title">{job.title}</h3>
                    <p className="landing-card-meta">{job.company?.name}</p>
                    <p className="landing-card-desc">
                      {typeof job.description === 'string'
                        ? job.description.length > 90
                          ? job.description.substring(0, 90) + '…'
                          : job.description
                        : ''}
                    </p>
                    <div className="landing-card-meta-row">
                      {job.location && <span>📍 {job.location}</span>}
                      {job.remote && <span>Remote</span>}
                      {job.stipend && <span>💰 {job.stipend}</span>}
                    </div>
                    {user?.userType === 'INTERN' && (
                      <span className="landing-card-cta">View & apply →</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="landing-empty">No jobs yet. Post the first one!</p>
          )}
        </div>
      </section>

      <section className="landing-cta-block">
        <div className="container">
          <h2 className="landing-cta-block-title">Ready to get started?</h2>
          <p className="landing-cta-block-sub">Join EasyIntern today—it's free.</p>
          <div className="landing-cta-block-buttons">
            <Link to="/register" className="btn btn-primary btn-large">Create account</Link>
            <Link to="/login" className="btn btn-secondary btn-large">Log in</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
