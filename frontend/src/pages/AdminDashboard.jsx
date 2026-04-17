import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import './AdminDashboard.css'

function AdminDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState(null)
  const [range, setRange] = useState('30d')

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true)
      try {
        const response = await api.get('/admin/overview', { params: { range } })
        setOverview(response.data || null)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [range])

  const metrics = overview?.metrics || {}
  const companyIndustryData = overview?.companyIndustryBreakdown || []
  const internIndustryData = overview?.internIndustryBreakdown || []
  const recentJobs = overview?.recentJobs || []
  const recentUsers = overview?.recentUsers || []
  const pieColors = ['#1d4ed8', '#2563eb', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b']

  const companyIndustryChart = useMemo(() => {
    if (!companyIndustryData.length) return null
    let offset = 0
    const slices = companyIndustryData.slice(0, 6).map((item, idx) => {
      const start = offset
      const end = offset + item.percent
      offset = end
      return `${pieColors[idx % pieColors.length]} ${start}% ${end}%`
    })
    return `conic-gradient(${slices.join(', ')})`
  }, [companyIndustryData])

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-loading">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-hero">
          <div>
            <p className="admin-eyebrow">Platform control center</p>
            <h1>Admin Dashboard</h1>
            <p>Monitor marketplace activity, job volume, and verification signals.</p>
          </div>
          <span className="admin-user-pill">{user?.email || 'User'}</span>
        </header>

        <section className="admin-range-controls">
          {[
            { id: '7d', label: 'Last 7 days' },
            { id: '30d', label: 'Last 30 days' },
            { id: '90d', label: 'Last 90 days' },
            { id: 'all', label: 'All time' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              className={`admin-range-btn ${range === option.id ? 'active' : ''}`}
              onClick={() => setRange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </section>

        <section className="admin-metrics">
          <div className="admin-metric-card">
            <span>Companies joined</span>
            <strong>{metrics.totalCompanies || 0}</strong>
          </div>
          <div className="admin-metric-card">
            <span>Interns signed up</span>
            <strong>{metrics.totalInterns || 0}</strong>
          </div>
          <div className="admin-metric-card">
            <span>Total jobs</span>
            <strong>{metrics.totalJobs || 0}</strong>
          </div>
          <div className="admin-metric-card">
            <span>Submitted resumes</span>
            <strong>{metrics.submittedResumes || 0}</strong>
          </div>
          <div className="admin-metric-card">
            <span>Verified companies</span>
            <strong>{metrics.verifiedCompanies || 0}</strong>
          </div>
          <div className="admin-metric-card">
            <span>Verified interns</span>
            <strong>{metrics.verifiedInterns || 0}</strong>
          </div>
        </section>

        <section className="admin-grid">
          <article className="admin-card">
            <h2>Company signups by industry</h2>
            {companyIndustryData.length === 0 ? (
              <p className="admin-empty">No job records yet.</p>
            ) : (
              <div className="admin-pie-wrap">
                <div className="admin-pie" style={{ background: companyIndustryChart }} />
                <div className="admin-list">
                  {companyIndustryData.slice(0, 6).map((item, idx) => (
                    <div key={item.industry} className="admin-list-row">
                      <span>
                        <span className="admin-dot" style={{ background: pieColors[idx % pieColors.length] }} />
                        {item.industry}
                      </span>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          <article className="admin-card">
            <h2>Intern preferred industries</h2>
            {internIndustryData.length === 0 ? (
              <p className="admin-empty">No intern industry preferences yet.</p>
            ) : (
              <div className="admin-list">
                {internIndustryData.slice(0, 8).map((item) => (
                  <div key={item.industry} className="admin-list-row">
                    <span>{item.industry}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="admin-card">
            <h2>Latest Job Posts</h2>
            {recentJobs.length === 0 ? (
              <p className="admin-empty">No job posts available.</p>
            ) : (
              <div className="admin-list">
                {recentJobs.map((job) => (
                  <div key={job.id} className="admin-list-row">
                    <div>
                      <span>{job.title}</span>
                      <p>{job.company?.name || 'Company'} · {job.location || 'Location N/A'}</p>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="admin-link">View</Link>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="admin-card">
            <h2>Recent user signups</h2>
            {recentUsers.length === 0 ? (
              <p className="admin-empty">No recent signups.</p>
            ) : (
              <div className="admin-list">
                {recentUsers.map((entry) => (
                  <div key={entry.id} className="admin-list-row">
                    <div>
                      <span>{entry.email}</span>
                      <p>{entry.userType}</p>
                    </div>
                    <strong>{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : '-'}</strong>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
