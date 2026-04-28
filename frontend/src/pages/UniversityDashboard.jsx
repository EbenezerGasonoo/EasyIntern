import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../utils/api'
import './Dashboard.css'

function UniversityDashboard() {
  const [profile, setProfile] = useState(null)
  const [catalog, setCatalog] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requestFilter, setRequestFilter] = useState('PENDING')
  const [bulkText, setBulkText] = useState('')
  const [bulkFileName, setBulkFileName] = useState('')
  const [bulkMode, setBulkMode] = useState('CSV')
  const [bulkUploading, setBulkUploading] = useState(false)
  const [bulkResult, setBulkResult] = useState(null)
  const [formData, setFormData] = useState({
    enrollmentYear: '',
    studentId: '',
    course: '',
    graduationDate: '',
  })
  const [requestSearch, setRequestSearch] = useState('')
  const [profileHint, setProfileHint] = useState('')
  const [savingHint, setSavingHint] = useState(false)
  const skipSearchEffect = useRef(true)

  const fetchData = async () => {
    try {
      const reqParams = requestSearch.trim() ? { q: requestSearch.trim() } : {}
      const [profileRes, catalogRes, requestsRes] = await Promise.all([
        api.get('/university/profile'),
        api.get('/university/catalog'),
        api.get('/university/verification-requests', { params: reqParams }),
      ])
      setProfile(profileRes.data)
      if (profileRes.data && profileRes.data.studentIdFormatHint !== undefined) {
        setProfileHint(profileRes.data.studentIdFormatHint || '')
      }
      setCatalog(Array.isArray(catalogRes.data) ? catalogRes.data : [])
      setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load university data.')
      setSuccess('')
    } finally {
      setLoading(false)
    }
  }

  const refetchRequests = useCallback(async () => {
    try {
      const { data } = await api.get('/university/verification-requests', {
        params: requestSearch.trim() ? { q: requestSearch.trim() } : {},
      })
      setRequests(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to refresh requests.')
    }
  }, [requestSearch])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (skipSearchEffect.current) {
      skipSearchEffect.current = false
      return
    }
    const t = setTimeout(() => {
      refetchRequests()
    }, 400)
    return () => clearTimeout(t)
  }, [requestSearch, refetchRequests])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCatalog = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/university/catalog', formData)
      setFormData({
        enrollmentYear: '',
        studentId: '',
        course: '',
        graduationDate: '',
      })
      await fetchData()
      setSuccess('Student catalog record saved successfully.')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save student catalog record.')
      setSuccess('')
    } finally {
      setSaving(false)
    }
  }

  const saveFormatHint = async (e) => {
    e.preventDefault()
    setSavingHint(true)
    setError('')
    setSuccess('')
    try {
      await api.put('/university/profile', { studentIdFormatHint: profileHint || null })
      await fetchData()
      setSuccess('Applicant hint saved. Interns will see it when they select your school.')
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save hint.')
    } finally {
      setSavingHint(false)
    }
  }

  const reviewRequest = async (id, status) => {
    setError('')
    setSuccess('')
    try {
      await api.post(`/university/verification-requests/${id}/review`, { status })
      await fetchData()
      setSuccess(`Verification request ${status === 'APPROVED' ? 'approved' : 'rejected'} successfully.`)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update verification status.')
      setSuccess('')
    }
  }

  const parseCsvRecords = (csvText) => {
    const lines = String(csvText || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length < 2) return []

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
    const fieldMap = {
      year: ['year', 'enrollmentyear', 'enrollment_year'],
      studentId: ['studentid', 'student_id'],
      course: ['course'],
      graduationDate: ['graduationdate', 'graduation_date', 'dateofgraduation', 'date_of_graduation'],
    }
    const resolveIndex = (aliases) => headers.findIndex((h) => aliases.includes(h))
    const yearIdx = resolveIndex(fieldMap.year)
    const studentIdIdx = resolveIndex(fieldMap.studentId)
    const courseIdx = resolveIndex(fieldMap.course)
    const graduationDateIdx = resolveIndex(fieldMap.graduationDate)

    return lines.slice(1).map((line) => {
      const cols = line.split(',').map((col) => col.trim())
      return {
        enrollmentYear: yearIdx >= 0 ? cols[yearIdx] : cols[0],
        studentId: studentIdIdx >= 0 ? cols[studentIdIdx] : cols[1],
        course: courseIdx >= 0 ? cols[courseIdx] : cols[2],
        graduationDate: graduationDateIdx >= 0 ? cols[graduationDateIdx] : cols[3],
      }
    })
  }

  const handleBulkUpload = async () => {
    setError('')
    setSuccess('')
    setBulkResult(null)

    let records = []
    try {
      if (bulkMode === 'JSON') {
        const parsed = JSON.parse(bulkText || '[]')
        records = Array.isArray(parsed) ? parsed : parsed.records
      } else {
        records = parseCsvRecords(bulkText)
      }
    } catch {
      setError('Invalid JSON format for bulk upload.')
      return
    }

    if (!Array.isArray(records) || records.length === 0) {
      setError('No bulk records found. Provide CSV rows or JSON records.')
      return
    }

    setBulkUploading(true)
    try {
      const { data } = await api.post('/university/catalog/bulk', { records })
      setBulkResult(data)
      setSuccess(`Bulk upload complete. Upserted ${data.upserted} record(s).`)
      await fetchData()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process bulk upload.')
      setBulkResult(null)
    } finally {
      setBulkUploading(false)
    }
  }

  const handleCsvFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a valid .csv file.')
      setBulkFileName('')
      e.target.value = ''
      return
    }

    try {
      const text = await file.text()
      setBulkText(text)
      setBulkFileName(file.name)
      setBulkMode('CSV')
      setError('')
      setSuccess(`Loaded ${file.name}. Review and process upload.`)
    } catch {
      setError('Could not read CSV file. Please try again.')
      setBulkFileName('')
    } finally {
      e.target.value = ''
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-loading">
            <div className="loading-spinner" />
            <p>Loading university dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const pendingRequests = requests.filter((request) => request.status === 'PENDING')
  const approvedRequests = requests.filter((request) => request.status === 'APPROVED')
  const rejectedRequests = requests.filter((request) => request.status === 'REJECTED')
  const filteredRequests = requests.filter((request) => requestFilter === 'ALL' || request.status === requestFilter)
  const catalogRows = [...catalog].sort((a, b) => {
    const yearA = Number(a.enrollmentYear || 0)
    const yearB = Number(b.enrollmentYear || 0)
    if (yearA !== yearB) return yearB - yearA
    return String(a.studentId || '').localeCompare(String(b.studentId || ''))
  })

  return (
    <div className="dashboard-page university-dashboard-page">
      <div className="container">
        <header className="dashboard-hero university-hero">
          <div className="dashboard-hero-content">
            <h1>{profile?.name || 'University Dashboard'}</h1>
            <p className="dashboard-hero-subtitle">
              Manage your student catalog and approve intern signup requests from your institution.
            </p>
            <div className="dashboard-quick-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setRequestFilter('PENDING')}
              >
                Review pending requests
              </button>
            </div>
          </div>
          <div className="university-hero-meta">
            <span className="university-hero-pill">University portal</span>
            <span>{profile?.website || 'Website not added yet'}</span>
          </div>
        </header>

        {error && <div className="dashboard-banner dashboard-banner-info"><p>{error}</p></div>}
        {success && <div className="dashboard-banner university-success-banner"><p>{success}</p></div>}

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{catalog.length}</span>
            <p>Catalog records</p>
          </div>
          <div className="stat-card stat-card-warning">
            <span className="stat-number">{pendingRequests.length}</span>
            <p>Pending approvals</p>
          </div>
          <div className="stat-card stat-card-success">
            <span className="stat-number">{approvedRequests.length}</span>
            <p>Approved</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">{rejectedRequests.length}</span>
            <p>Rejected</p>
          </div>
        </section>

        <section className="dashboard-section university-grid">
          <div className="card card-form">
            <h2>Add or update student catalog</h2>
            <p className="university-section-note">
              Add a student using the exact student ID your institution issued. Existing IDs are updated automatically.
            </p>
            <form onSubmit={handleAddCatalog}>
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="number"
                    name="enrollmentYear"
                    value={formData.enrollmentYear}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Graduation</label>
                  <input
                    type="date"
                    name="graduationDate"
                    value={formData.graduationDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save catalog record'}
              </button>
            </form>
          </div>

          <div className="card">
            <h2>Catalog records</h2>
            {catalogRows.length === 0 ? (
              <div className="dashboard-empty"><p>No catalog records yet. Add your first student record to begin verification.</p></div>
            ) : (
              <div className="university-table-wrap">
                <table className="university-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Year</th>
                      <th>Course</th>
                      <th>Graduation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogRows.map((item) => (
                      <tr key={item.id}>
                        <td>{item.studentId}</td>
                        <td>{item.enrollmentYear}</td>
                        <td>{item.course}</td>
                        <td>{item.graduationDate ? new Date(item.graduationDate).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="card">
            <div className="dashboard-section-header">
              <h2>Mass upload / API feed</h2>
              <div className="company-filters">
                <select value={bulkMode} onChange={(e) => setBulkMode(e.target.value)}>
                  <option value="CSV">CSV</option>
                  <option value="JSON">JSON</option>
                </select>
              </div>
            </div>
            <p className="university-section-note">
              Upload CSV or JSON and we will upsert students in bulk. API clients can post the same payload format to
              <code> /api/university/catalog/bulk</code> using university auth token.
            </p>
            <div className="university-bulk-file-row">
              <label className="btn btn-secondary university-bulk-file-btn">
                Choose CSV file
                <input type="file" accept=".csv,text/csv" onChange={handleCsvFileSelect} />
              </label>
              <span className="university-bulk-file-name">
                {bulkFileName || 'No file selected'}
              </span>
            </div>
            <textarea
              className="university-bulk-textarea"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={
                bulkMode === 'CSV'
                  ? 'year,student_id,course,graduation_date\n2023,ST-001,BSc Computer Science,2027-06-30'
                  : '[{"enrollmentYear":2023,"studentId":"ST-001","course":"BSc Computer Science","graduationDate":"2027-06-30"}]'
              }
              rows={8}
            />
            <div className="dashboard-quick-actions">
              <button type="button" className="btn btn-primary" onClick={handleBulkUpload} disabled={bulkUploading}>
                {bulkUploading ? 'Uploading...' : 'Process mass upload'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setBulkText('')}>
                Clear
              </button>
            </div>
            {bulkResult && (
              <div className="university-bulk-result">
                <p>
                  Received: <strong>{bulkResult.totalReceived}</strong> | Upserted: <strong>{bulkResult.upserted}</strong> |
                  Failed: <strong>{bulkResult.failedCount}</strong> | Approved requests:{' '}
                  <strong>{bulkResult.approvedRequests}</strong>
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="university-hint-card card">
            <h2>Help applicants enter the right student ID (optional)</h2>
            <p className="university-section-note">
              This short note appears to interns on their dashboard when they select your school (for example, “format
              like 012345/25”). Leave blank if you do not need a hint.
            </p>
            <form onSubmit={saveFormatHint} className="university-hint-form">
              <label htmlFor="university-student-hint" className="visually-hidden">
                Student ID format hint
              </label>
              <textarea
                id="university-student-hint"
                value={profileHint}
                onChange={(e) => setProfileHint(e.target.value)}
                rows={2}
                maxLength={500}
                placeholder="e.g. Use the number on the front of your ID card, format GSU-########"
              />
              <button type="submit" className="btn btn-secondary" disabled={savingHint}>
                {savingHint ? 'Saving…' : 'Save hint for applicants'}
              </button>
            </form>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Student verification requests</h2>
            <div className="company-filters university-req-filters">
              <input
                type="search"
                className="university-req-search"
                value={requestSearch}
                onChange={(e) => setRequestSearch(e.target.value)}
                placeholder="Search by name, email, or student ID…"
                aria-label="Search requests"
              />
              <select value={requestFilter} onChange={(e) => setRequestFilter(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="ALL">All statuses</option>
              </select>
            </div>
          </div>
          <div className="card">
            {filteredRequests.length === 0 ? (
              <div className="dashboard-empty"><p>No verification requests in this view yet.</p></div>
            ) : (
              <div className="applications-list applications-list-company">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="application-item application-item-company">
                    <div className="application-item-content">
                      <h3>
                        {request.intern?.firstName} {request.intern?.lastName}
                      </h3>
                      <p className="university-req-line">{request.intern?.user?.email}</p>
                      <p className="university-req-line university-req-summary">
                        <span>
                          Student ID: <strong>{request.requestedStudentId || request.intern?.studentId}</strong>
                        </span>
                        <span>
                          Enrollment year: <strong>{request.requestedEnrollmentYear ?? request.intern?.enrollmentYear ?? '—'}</strong>
                        </span>
                        <span>
                          Course: <strong>{request.requestedCourse || request.intern?.course || '—'}</strong>
                        </span>
                        <span>
                          Submitted: <strong>{request.createdAt ? new Date(request.createdAt).toLocaleString() : '—'}</strong>
                        </span>
                      </p>
                      {request.reviewedAt && (
                        <p className="university-req-line university-req-meta">Reviewed: {new Date(request.reviewedAt).toLocaleString()}</p>
                      )}
                      <span className={`application-status-badge status-${String(request.status || '').toLowerCase()}`}>
                        {request.status}
                      </span>
                    </div>
                    {request.status === 'PENDING' && (
                      <div className="application-actions">
                        <button type="button" className="btn btn-success" onClick={() => reviewRequest(request.id, 'APPROVED')}>
                          Approve
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => reviewRequest(request.id, 'REJECTED')}>
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default UniversityDashboard
