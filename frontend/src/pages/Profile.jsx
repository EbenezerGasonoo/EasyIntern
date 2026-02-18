import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { AptitudeChart } from '../components/AptitudeChart'
import './Profile.css'

function Profile() {
  const { user, fetchUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState('')

  const isIntern = user?.userType === 'INTERN'
  const displayProfile = profile || (isIntern ? user?.intern : user?.company) || {}

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    if (!user) return
    try {
      const endpoint = isIntern ? '/intern/profile' : '/company/profile'
      const response = await api.get(endpoint)
      setProfile(response.data)
      setFormData(response.data)
    } catch (err) {
      if (isIntern && (user.intern || localStorage.getItem('demoUser'))) {
        const demo = user.intern ? { ...user.intern } : {}
        setFormData({
          firstName: demo.firstName ?? '',
          lastName: demo.lastName ?? '',
          bio: demo.bio ?? '',
          skills: Array.isArray(demo.skills) ? demo.skills : [],
          education: demo.education ?? '',
          experience: demo.experience ?? '',
          location: demo.location ?? '',
          resume: demo.resume ?? '',
          profilePic: demo.profilePic ?? '',
        })
        setProfile(demo)
      }
      if (!isIntern && (user.company || localStorage.getItem('demoUser'))) {
        const demo = user.company ? { ...user.company } : {}
        setFormData({
          name: demo.name ?? '',
          description: demo.description ?? '',
          website: demo.website ?? '',
          industry: demo.industry ?? '',
          location: demo.location ?? '',
          logo: demo.logo ?? '',
          benefits: demo.benefits ?? '',
          companySize: demo.companySize ?? '',
          contactEmail: demo.contactEmail ?? '',
        })
        setProfile(demo)
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setPhotoError('Please choose a JPEG, PNG, or WebP image.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Image must be 2MB or smaller.')
      return
    }
    setPhotoError('')
    setUploadingPhoto(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const dataUrl = reader.result
          const { data } = await api.post('/intern/upload-profile-picture', { image: dataUrl })
          if (data?.url) {
            setFormData((prev) => ({ ...prev, profilePic: data.url }))
          }
        } catch (err) {
          setPhotoError(err.response?.data?.error || 'Upload failed. You can paste an image URL below instead.')
        } finally {
          setUploadingPhoto(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setPhotoError('Upload failed. Try again or use a URL below.')
      setUploadingPhoto(false)
    }
    e.target.value = ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setError('')
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === 'skills') {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? value.split(',').map((s) => s.trim()).filter(Boolean) : [],
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const endpoint = isIntern ? '/intern/profile' : '/company/profile'
      const payload = { ...formData }
      if (isIntern && Array.isArray(payload.skills)) {
        // already array
      } else if (isIntern && typeof payload.skills === 'string') {
        payload.skills = payload.skills ? payload.skills.split(',').map((s) => s.trim()) : []
      }
      await api.put(endpoint, payload)
      setEditing(false)
      setSuccess('Profile updated successfully!')
      setProfile(payload)
      fetchUser()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile. Try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-loading">
            <div className="loading-spinner" />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isIntern) {
    const skillsArray = Array.isArray(formData.skills) ? formData.skills : (formData.skills || '').toString().split(',').map((s) => s.trim()).filter(Boolean)
    const initials = [formData.firstName, formData.lastName].filter(Boolean).map((n) => (n || '').charAt(0)).join('').toUpperCase() || '?'

    return (
      <div className="profile-page profile-page-intern">
        <div className="container">
          <header className="profile-hero profile-hero-intern">
            <div className="profile-hero-avatar">
              {formData.profilePic ? (
                <img src={formData.profilePic} alt="" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-placeholder">{initials}</div>
              )}
            </div>
            <div className="profile-hero-info">
              <h1>
                {formData.firstName || formData.lastName
                  ? [formData.firstName, formData.lastName].filter(Boolean).join(' ')
                  : 'Your profile'}
              </h1>
              {formData.location && (
                <p className="profile-hero-meta">📍 {formData.location}</p>
              )}
              {formData.education && !editing && (
                <p className="profile-hero-meta">🎓 {formData.education}</p>
              )}
            </div>
            <div className="profile-hero-actions">
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className={`btn ${editing ? 'btn-secondary' : 'btn-primary'}`}
              >
                {editing ? 'Cancel' : 'Edit profile'}
              </button>
            </div>
          </header>

          {success && <div className="profile-message profile-message-success">{success}</div>}
          {error && <div className="profile-message profile-message-error">{error}</div>}

          {editing ? (
            <div className="card profile-card">
              <h2>Edit your profile</h2>
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    placeholder="Tell companies about yourself, your goals, and what you're looking for..."
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : (formData.skills || '')}
                    onChange={(e) => {
                      const v = e.target.value
                      setFormData((prev) => ({
                        ...prev,
                        skills: v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [],
                      }))
                    }}
                    placeholder="e.g. JavaScript, React, Python, Communication"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education || ''}
                      onChange={handleChange}
                      placeholder="e.g. BSc Computer Science - KNUST"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="e.g. Accra, Ghana"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <textarea
                    name="experience"
                    value={formData.experience || ''}
                    onChange={handleChange}
                    placeholder="Previous roles, projects, or relevant experience..."
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Resume URL (optional)</label>
                  <input
                    type="url"
                    name="resume"
                    value={formData.resume || ''}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="profile-photo-upload">
                  <label className="profile-photo-label">Profile photo</label>
                  <p className="profile-photo-guideline">
                    Use a professional image: a clear headshot or appropriate photo of yourself. Companies are more likely to respond to profiles with a professional photo.
                  </p>
                  <div className="profile-photo-row">
                    <div className="profile-photo-preview-wrap">
                      {formData.profilePic ? (
                        <img src={formData.profilePic} alt="Profile" className="profile-photo-preview" />
                      ) : (
                        <div className="profile-photo-placeholder">
                          {[formData.firstName, formData.lastName].filter(Boolean).map((n) => (n || '').charAt(0)).join('').toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                    <div className="profile-photo-actions">
                      <label className="btn btn-secondary profile-photo-upload-btn">
                        {uploadingPhoto ? 'Uploading...' : 'Upload photo'}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhoto}
                          className="profile-photo-input"
                        />
                      </label>
                      <p className="profile-photo-hint">JPEG, PNG or WebP. Max 2MB.</p>
                    </div>
                  </div>
                  {photoError && <p className="profile-photo-error">{photoError}</p>}
                  <div className="profile-photo-url-fallback">
                    <label>Or paste image URL</label>
                    <input
                      type="url"
                      name="profilePic"
                      value={formData.profilePic || ''}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </form>
            </div>
          ) : (
            <div className="profile-view">
              <section className="card profile-section profile-at-a-glance">
                <h2>How recruiters see you</h2>
                <div className="profile-at-a-glance-row">
                  <AptitudeChart
                    intern={{
                      bio: displayProfile.bio,
                      skills: skillsArray,
                      education: displayProfile.education,
                      experience: displayProfile.experience,
                      location: displayProfile.location,
                      profilePic: displayProfile.profilePic,
                      resume: displayProfile.resume,
                    }}
                    showPie={false}
                    showBreakdown={true}
                  />
                  {displayProfile.location && (
                    <div className="profile-at-a-glance-location">
                      <span className="profile-location-label">Location</span>
                      <p className="profile-location-value">📍 {displayProfile.location}</p>
                    </div>
                  )}
                </div>
              </section>
              <section className="card profile-section">
                <h2>About</h2>
                {displayProfile.bio ? (
                  <p className="profile-bio">{displayProfile.bio}</p>
                ) : (
                  <p className="profile-empty">Add a bio so companies can learn about you.</p>
                )}
              </section>

              {skillsArray.length > 0 && (
                <section className="card profile-section">
                  <h2>Skills</h2>
                  <div className="profile-skills">
                    {skillsArray.map((skill, i) => (
                      <span key={i} className="profile-skill-tag">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {(displayProfile.education || displayProfile.experience || displayProfile.location) && (
                <section className="card profile-section">
                  <h2>Details</h2>
                  {displayProfile.education && (
                    <div className="profile-detail-row">
                      <span className="profile-detail-label">Education</span>
                      <span>🎓 {displayProfile.education}</span>
                    </div>
                  )}
                  {displayProfile.location && (
                    <div className="profile-detail-row">
                      <span className="profile-detail-label">Location</span>
                      <span>📍 {displayProfile.location}</span>
                    </div>
                  )}
                  {displayProfile.experience && (
                    <div className="profile-detail-row profile-detail-block">
                      <span className="profile-detail-label">Experience</span>
                      <p>{displayProfile.experience}</p>
                    </div>
                  )}
                </section>
              )}

              {displayProfile.resume && (
                <section className="card profile-section">
                  <h2>Resume</h2>
                  <a
                    href={displayProfile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View resume
                  </a>
                </section>
              )}

              {!displayProfile.bio && skillsArray.length === 0 && !displayProfile.education && !displayProfile.experience && (
                <section className="card profile-section profile-section-empty">
                  <p>Your profile is empty. Click <strong>Edit profile</strong> to add your bio, skills, and experience.</p>
                  <button type="button" onClick={() => setEditing(true)} className="btn btn-primary">
                    Edit profile
                  </button>
                </section>
              )}
            </div>
          )}

          <div className="profile-back">
            <Link to={isIntern ? '/intern/dashboard' : '/company/dashboard'} className="profile-back-link">
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Company profile – view & edit with hero, stats, sections, new features
  const companyName = displayProfile.name || 'Your company'
  const companyInitial = (companyName || 'C').charAt(0).toUpperCase()
  const jobsCount = displayProfile.jobs?.length ?? 0
  const COMPANY_SIZES = [
    { value: '', label: 'Select size (optional)' },
    { value: '1-10', label: '1–10 employees' },
    { value: '11-50', label: '11–50 employees' },
    { value: '51-200', label: '51–200 employees' },
    { value: '201-500', label: '201–500 employees' },
    { value: '500+', label: '500+ employees' },
  ]

  return (
    <div className="profile-page profile-page-company">
      <div className="container">
        <header className="profile-hero profile-hero-company">
          <div className="profile-hero-company-logo">
            {displayProfile.logo ? (
              <img src={displayProfile.logo} alt="" className="company-logo-img" />
            ) : (
              <div className="company-logo-placeholder">{companyInitial}</div>
            )}
          </div>
          <div className="profile-hero-company-info">
            <h1>{companyName}</h1>
            {(displayProfile.industry || displayProfile.companySize) && (
              <div className="profile-hero-badges">
                {displayProfile.industry && <span className="profile-badge">{displayProfile.industry}</span>}
                {displayProfile.companySize && <span className="profile-badge profile-badge-size">{displayProfile.companySize} employees</span>}
              </div>
            )}
            <p className="profile-hero-subtitle">
              How your company appears to interns. A complete profile helps you attract the best candidates.
            </p>
          </div>
          <div className="profile-hero-actions">
            <button
              type="button"
              onClick={() => setEditing(!editing)}
              className={`btn ${editing ? 'btn-secondary' : 'btn-primary'}`}
            >
              {editing ? 'Cancel' : 'Edit profile'}
            </button>
          </div>
        </header>

        {success && <div className="profile-message profile-message-success">{success}</div>}
        {error && <div className="profile-message profile-message-error">{error}</div>}

        {!editing && (jobsCount > 0 || displayProfile.id) && (
          <div className="profile-quick-stats">
            <Link to="/company/dashboard" className="profile-stat-block">
              <span className="profile-stat-number">{jobsCount}</span>
              <span className="profile-stat-label">Active jobs</span>
            </Link>
            <Link to="/company/dashboard" className="profile-stat-block">
              <span className="profile-stat-label">Manage jobs & applications</span>
              <span className="profile-stat-arrow">→</span>
            </Link>
          </div>
        )}

        {editing ? (
          <div className="profile-edit-sections">
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="card profile-card">
                <h2>Company basics</h2>
                <div className="form-group">
                  <label>Company name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="e.g. MTN Ghana"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    placeholder="What your company does, your mission, and what makes you a great place for interns..."
                    rows={4}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website || ''}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry || ''}
                      onChange={handleChange}
                      placeholder="e.g. Technology, Banking, Retail"
                      list="industry-suggestions"
                    />
                    <datalist id="industry-suggestions">
                      <option value="Technology" />
                      <option value="Banking & Finance" />
                      <option value="Telecommunications" />
                      <option value="Retail" />
                      <option value="Healthcare" />
                      <option value="Education" />
                      <option value="Media" />
                      <option value="Consulting" />
                    </datalist>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="e.g. Accra, Ghana"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company size</label>
                    <select
                      name="companySize"
                      value={formData.companySize || ''}
                      onChange={handleChange}
                    >
                      {COMPANY_SIZES.map((opt) => (
                        <option key={opt.value || 'empty'} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Company logo URL (optional)</label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo || ''}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="card profile-card">
                <h2>For interns</h2>
                <p className="profile-field-hint">What you offer interns (e.g. mentorship, stipend, flexible hours, real projects). This helps you stand out.</p>
                <div className="form-group">
                  <label>Benefits & what you offer</label>
                  <textarea
                    name="benefits"
                    value={formData.benefits || ''}
                    onChange={handleChange}
                    placeholder="e.g. Mentorship from senior staff, monthly stipend, flexible hours, hands-on projects, possibility of full-time offer..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="card profile-card">
                <h2>Contact</h2>
                <div className="form-group">
                  <label>Contact email for enquiries</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail || ''}
                    onChange={handleChange}
                    placeholder="e.g. careers@company.com (or leave blank to use your account email)"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </div>
        ) : (
          <div className="profile-view">
            {displayProfile.description && (
              <section className="card profile-section">
                <h2>About</h2>
                <p className="profile-bio">{displayProfile.description}</p>
              </section>
            )}

            {displayProfile.benefits && (
              <section className="card profile-section">
                <h2>What we offer interns</h2>
                <p className="profile-bio">{displayProfile.benefits}</p>
              </section>
            )}

            {(displayProfile.website || displayProfile.industry || displayProfile.location || displayProfile.companySize) && (
              <section className="card profile-section">
                <h2>Details</h2>
                {displayProfile.website && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Website</span>
                    <a href={displayProfile.website} target="_blank" rel="noopener noreferrer" className="profile-link">
                      {displayProfile.website}
                    </a>
                  </div>
                )}
                {displayProfile.industry && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Industry</span>
                    <span>{displayProfile.industry}</span>
                  </div>
                )}
                {displayProfile.companySize && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Company size</span>
                    <span>{displayProfile.companySize} employees</span>
                  </div>
                )}
                {displayProfile.location && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Location</span>
                    <span>📍 {displayProfile.location}</span>
                  </div>
                )}
              </section>
            )}

            {(displayProfile.contactEmail || user?.email) && (
              <section className="card profile-section">
                <h2>Contact</h2>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Enquiries</span>
                  <a href={`mailto:${displayProfile.contactEmail || user?.email}`} className="profile-link">
                    {displayProfile.contactEmail || user?.email}
                  </a>
                </div>
              </section>
            )}

            {!editing && (
              <div className="profile-view-actions">
                <Link to="/company/dashboard" className="btn btn-primary">Go to dashboard</Link>
                <button type="button" onClick={() => setEditing(true)} className="btn btn-secondary">Edit profile</button>
              </div>
            )}

            {!displayProfile.description && !displayProfile.website && !displayProfile.industry && !displayProfile.location && !displayProfile.benefits && (
              <section className="card profile-section profile-section-empty">
                <p>Complete your company profile so interns can find and trust you. Add a description, what you offer, and how to get in touch.</p>
                <button type="button" onClick={() => setEditing(true)} className="btn btn-primary">
                  Edit profile
                </button>
              </section>
            )}
          </div>
        )}

        <div className="profile-back">
          <Link to="/company/dashboard" className="profile-back-link">← Back to dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
