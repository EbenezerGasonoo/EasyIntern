import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { AptitudeChart } from '../components/AptitudeChart'
import { getAptitudeScore } from '../utils/aptitudeScore'
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [ticketStatus, setTicketStatus] = useState('')
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    message: '',
  })

  const isIntern = user?.userType === 'INTERN'
  const displayProfile = profile || (isIntern ? user?.intern : user?.company) || {}
  const INTERN_INDUSTRIES = [
    'Technology',
    'Banking & Finance',
    'Telecommunications',
    'Healthcare',
    'Education',
    'Media & Communications',
    'Retail & E-commerce',
    'Manufacturing',
    'Energy',
    'Government & Public Sector',
  ]

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
          phone: demo.phone ?? '',
          dateOfBirth: demo.dateOfBirth ?? '',
          ghanaCardNumber: demo.ghanaCardNumber ?? '',
          ghanaCardDocument: demo.ghanaCardDocument ?? '',
          schoolAffiliationDocument: demo.schoolAffiliationDocument ?? '',
          isVerified: demo.isVerified ?? false,
          notifyIndustryJobs: demo.notifyIndustryJobs ?? false,
          preferredIndustry: demo.preferredIndustry ?? '',
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
          phone: demo.phone ?? '',
          logo: demo.logo ?? '',
          companyTaxId: demo.companyTaxId ?? '',
          isVerified: demo.isVerified ?? false,
          registrationDoc: demo.registrationDoc ?? '',
          internIntake: demo.internIntake ?? '',
          mapLocation: demo.mapLocation ?? '',
          benefits: demo.benefits ?? '',
          hiringPriorities: demo.hiringPriorities ?? '',
          candidateRequirements: demo.candidateRequirements ?? '',
          hiringWorkflow: demo.hiringWorkflow ?? '',
          companySize: demo.companySize ?? '',
          contactEmail: demo.contactEmail ?? '',
        })
        setProfile(demo)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Size check
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be 5MB or smaller.')
      return
    }

    setSaving(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const dataUrl = reader.result
          const endpoint = type === 'profilePic' || type === 'logo' ? '/upload/profile-pic' : '/upload/document'
          const payload = type === 'profilePic' || type === 'logo' 
            ? { image: dataUrl, fileName: file.name }
            : {
                file: dataUrl,
                fileName: file.name,
                type:
                  type === 'resume'
                    ? 'resume'
                    : type === 'ghanaCardDocument'
                      ? 'ghana-card'
                      : type === 'schoolAffiliationDocument'
                        ? 'school-affiliation'
                        : 'registration',
              }

          const { data } = await api.post(endpoint, payload)
          if (data?.url) {
            setFormData((prev) => ({ ...prev, [type]: data.url }))
            setSuccess(`${type} uploaded successfully!`)
            setTimeout(() => setSuccess(''), 3000)
          }
        } catch (err) {
          setError(err.response?.data?.error || 'Upload failed.')
        } finally {
          setSaving(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError('Upload failed. Try again.')
      setSaving(false)
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

  const faqItems = [
    {
      question: 'How long does verification take after submitting KYI details?',
      answer:
        'Verification completes automatically when identity (Ghana Card), your education, and official school proof (enrollment letter or student ID from your institution) are all on file.',
    },
    {
      question: 'How can I improve my chances of being contacted?',
      answer: 'Add a clear bio, updated skills, education details, and a professional profile photo to increase visibility.',
    },
    {
      question: 'Why can I not see recommended jobs?',
      answer: 'Recommendations depend on profile completeness and available jobs. Complete your profile and refresh your dashboard.',
    },
    {
      question: 'Can I edit my profile after getting verified?',
      answer:
        'Yes, you can update your profile anytime. If key KYI details are removed (including education or school proof), your verification status may change.',
    },
  ]

  const handleTicketChange = (e) => {
    const { name, value } = e.target
    setTicketStatus('')
    setTicketForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    if (!ticketForm.category || !ticketForm.subject.trim() || !ticketForm.message.trim()) {
      setTicketStatus('Please complete all ticket fields before submitting.')
      return
    }

    const ticketId = `TKT-${Date.now().toString().slice(-6)}`
    setTicketStatus(`Ticket ${ticketId} submitted successfully. Our team will follow up soon.`)
    setTicketForm({ category: '', subject: '', message: '' })
  }

  const helpSection = (
    <section className="card profile-section profile-help-section">
      <div className="profile-help-header">
        <h2>Help, FAQ & Ticketing</h2>
        <p>Find quick answers or raise a support ticket.</p>
      </div>

      <div className="profile-help-grid">
        <div className="profile-faq-list">
          {faqItems.map((item, index) => (
            <div key={item.question} className="profile-faq-item">
              <button
                type="button"
                className={`profile-faq-question ${openFaqIndex === index ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="profile-faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
              </button>
              {openFaqIndex === index && (
                <p className="profile-faq-answer">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        <form className="profile-ticket-form" onSubmit={handleTicketSubmit}>
          <h3>Submit a ticket</h3>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={ticketForm.category} onChange={handleTicketChange}>
              <option value="">Select issue type</option>
              <option value="account">Account</option>
              <option value="verification">Verification</option>
              <option value="applications">Applications</option>
              <option value="technical">Technical issue</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={ticketForm.subject}
              onChange={handleTicketChange}
              placeholder="Short ticket title"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={ticketForm.message}
              onChange={handleTicketChange}
              placeholder="Describe your issue in detail"
              rows={4}
            />
          </div>
          {ticketStatus && (
            <p className={`profile-ticket-status ${ticketStatus.includes('successfully') ? 'success' : 'error'}`}>
              {ticketStatus}
            </p>
          )}
          <button type="submit" className="btn btn-primary">Submit ticket</button>
        </form>
      </div>
    </section>
  )

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
    const profileAptitude = getAptitudeScore({
      bio: displayProfile.bio,
      skills: skillsArray,
      education: displayProfile.education,
      experience: displayProfile.experience,
      location: displayProfile.location,
      profilePic: displayProfile.profilePic,
      resume: displayProfile.resume,
    })
    const profileCompletion = profileAptitude.score
    const applications = Array.isArray(displayProfile.applications) ? displayProfile.applications : []
    const appliedCount = applications.length
    const shortlistedCount = applications.filter((app) => app.status === 'REVIEWED').length
    const interviewsCount = applications.filter((app) => app.status === 'ACCEPTED').length

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
                {(formData.isVerified || displayProfile.isVerified) && (
                  <span className="verified-badge" title="Verified Intern">✓ Verified</span>
                )}
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

          <section className="profile-summary-panel">
            <div className="profile-completion-card">
              <div className="profile-completion-header">
                <span>Profile Completion</span>
                <strong>{profileCompletion}%</strong>
              </div>
              <div className="profile-completion-track" aria-hidden="true">
                <span className="profile-completion-fill" style={{ width: `${profileCompletion}%` }} />
              </div>
            </div>

            <div className="profile-activity-stats">
              <div className="profile-activity-card">
                <strong>{appliedCount}</strong>
                <span>Applied</span>
              </div>
              <div className="profile-activity-card">
                <strong>{shortlistedCount}</strong>
                <span>Shortlisted</span>
              </div>
              <div className="profile-activity-card">
                <strong>{interviewsCount}</strong>
                <span>Interviews</span>
              </div>
            </div>
          </section>

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
                    <label>Your location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="Where you are based (e.g. Accra, Ghana)"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Industry</label>
                    <select
                      name="preferredIndustry"
                      value={formData.preferredIndustry || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select industry</option>
                      {INTERN_INDUSTRIES.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="e.g. +233 24 123 4567"
                    />
                  </div>
                </div>
                <div className="card profile-card kyi-card">
                  <h2>Know Your Intern (KYI)</h2>
                  <p className="profile-field-hint">
                    Submit your Ghana Card and identity details, and verify your school affiliation. Your{' '}
                    <strong>Education</strong> field (above) must list your institution; upload an official document from
                    that school (enrollment letter, student ID, or registrar letter).
                  </p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth ? String(formData.dateOfBirth).substring(0, 10) : ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ghana Card Number</label>
                      <input
                        type="text"
                        name="ghanaCardNumber"
                        value={formData.ghanaCardNumber || ''}
                        onChange={handleChange}
                        placeholder="e.g. GHA-123456789-0"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ghana Card Document</label>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="ghana-card-upload"
                        onChange={(e) => handleFileUpload(e, 'ghanaCardDocument')}
                        hidden
                      />
                      <label htmlFor="ghana-card-upload" className="btn btn-secondary">
                        {saving ? 'Uploading...' : 'Upload Ghana Card'}
                      </label>
                      {formData.ghanaCardDocument && <span className="file-name">✅ Ghana Card uploaded</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>School verification document</label>
                    <p className="profile-field-hint kyi-school-doc-hint">
                      PDF or image from your university or college proving current enrollment (must match the school in
                      Education).
                    </p>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="school-affiliation-upload"
                        onChange={(e) => handleFileUpload(e, 'schoolAffiliationDocument')}
                        hidden
                      />
                      <label htmlFor="school-affiliation-upload" className="btn btn-secondary">
                        {saving ? 'Uploading...' : 'Upload school proof'}
                      </label>
                      {formData.schoolAffiliationDocument && (
                        <span className="file-name">✅ School document uploaded</span>
                      )}
                    </div>
                  </div>
                  <p className="kyi-status">
                    Verification status: {(formData.isVerified || displayProfile.isVerified) ? 'Verified' : 'Not verified'}
                  </p>
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
                <div className="form-group profile-checkbox-group">
                  <label className="profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="notifyIndustryJobs"
                      checked={Boolean(formData.notifyIndustryJobs)}
                      onChange={handleChange}
                    />
                    <span>Notify me when jobs in my industry are posted</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Resume</label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      id="resume-upload"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                      hidden
                    />
                    <label htmlFor="resume-upload" className="btn btn-secondary">
                      {saving ? 'Uploading...' : 'Upload Resume Document'}
                    </label>
                    {formData.resume && <span className="file-name">✅ Resume uploaded</span>}
                  </div>
                  <input
                    type="url"
                    name="resume"
                    value={formData.resume || ''}
                    onChange={handleChange}
                    placeholder="Or paste resume URL (Google Drive, Dropbox, etc.)"
                    className="mt-2"
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
                        {saving ? 'Uploading...' : 'Upload photo'}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => handleFileUpload(e, 'profilePic')}
                          disabled={saving}
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
            <div className="profile-view profile-view-intern">
              <section className="card profile-section profile-at-a-glance profile-span-full">
                <h2>How recruiters see you</h2>
                <div className="profile-at-a-glance-row">
                  <div className="profile-at-a-glance-chart">
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
                  </div>
                  <div className="profile-at-a-glance-meta">
                    <div className="profile-at-a-glance-location">
                      <span className="profile-location-label">Location</span>
                      <p className="profile-location-value">
                        {displayProfile.location ? `📍 ${displayProfile.location}` : '📍 Add your location'}
                      </p>
                    </div>
                    <div className="profile-at-a-glance-chips">
                      <div className="profile-at-a-glance-chip">
                        <span className="chip-label">Skills</span>
                        <strong>{skillsArray.length}</strong>
                      </div>
                      <div className="profile-at-a-glance-chip">
                        <span className="chip-label">Verified</span>
                        <strong>{displayProfile.isVerified ? 'Yes' : 'No'}</strong>
                      </div>
                      <div className="profile-at-a-glance-chip">
                        <span className="chip-label">Resume</span>
                        <strong>{displayProfile.resume ? 'Added' : 'Missing'}</strong>
                      </div>
                    </div>
                    <p className="profile-at-a-glance-hint">
                      Keep your profile complete to rank higher in internship searches.
                    </p>
                  </div>
                </div>
              </section>
              <section className="card profile-section profile-main-column">
                <h2>About</h2>
                {displayProfile.bio ? (
                  <p className="profile-bio">{displayProfile.bio}</p>
                ) : (
                  <p className="profile-empty">Add a bio so companies can learn about you.</p>
                )}
              </section>

              {skillsArray.length > 0 && (
                <section className="card profile-section profile-main-column">
                  <h2>Skills</h2>
                  <div className="profile-skills">
                    {skillsArray.map((skill, i) => (
                      <span key={i} className="profile-skill-tag">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {(displayProfile.education || displayProfile.experience || displayProfile.location || displayProfile.preferredIndustry) && (
                <section className="card profile-section profile-side-column">
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
                  {displayProfile.preferredIndustry && (
                    <div className="profile-detail-row">
                      <span className="profile-detail-label">Preferred Industry</span>
                      <span>{displayProfile.preferredIndustry}</span>
                    </div>
                  )}
                  {displayProfile.experience && (
                    <div className="profile-detail-row profile-detail-block">
                      <span className="profile-detail-label">Experience</span>
                      <p>{displayProfile.experience}</p>
                    </div>
                  )}
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Verification</span>
                    <span>{displayProfile.isVerified ? '✅ Verified Intern' : 'Not verified yet'}</span>
                  </div>
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Industry Job Alerts</span>
                    <span>{displayProfile.notifyIndustryJobs ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </section>
              )}

              <section className="card profile-section profile-side-column profile-resume-section">
                <h2>Resume</h2>
                <p className="profile-resume-text">
                  {displayProfile.resume
                    ? 'Your resume is available to recruiters. Open it using the button below.'
                    : 'No resume uploaded yet. Add one from Edit profile to boost your visibility.'}
                </p>
                {displayProfile.resume ? (
                  <a
                    href={displayProfile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary profile-resume-btn"
                  >
                    See My Resume
                  </a>
                ) : (
                  <button type="button" onClick={() => setEditing(true)} className="btn btn-secondary profile-resume-btn">
                    Add Resume
                  </button>
                )}
              </section>

              {!displayProfile.bio && skillsArray.length === 0 && !displayProfile.education && !displayProfile.experience && (
                <section className="card profile-section profile-section-empty profile-span-full">
                  <p>Your profile is empty. Click <strong>Edit profile</strong> to add your bio, skills, and experience.</p>
                  <button type="button" onClick={() => setEditing(true)} className="btn btn-primary">
                    Edit profile
                  </button>
                </section>
              )}
            </div>
          )}

          {helpSection}

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
  const companyProfileCompleteness = Math.round(([
    displayProfile.description,
    displayProfile.website,
    displayProfile.industry,
    displayProfile.location,
    displayProfile.companySize,
    displayProfile.benefits,
    displayProfile.contactEmail || user?.email,
    displayProfile.logo,
    displayProfile.companyTaxId,
    displayProfile.registrationDoc,
  ].filter(Boolean).length / 10) * 100)
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
            {displayProfile.isVerified && (
              <span className="company-verified-badge" title="Verified Company">✓ Verified Company</span>
            )}
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

        <section className="profile-modern-stats profile-modern-stats-company">
          <div className="profile-modern-stat">
            <span className="profile-modern-stat-label">Active jobs</span>
            <strong>{jobsCount}</strong>
          </div>
          <div className="profile-modern-stat">
            <span className="profile-modern-stat-label">Company size</span>
            <strong>{displayProfile.companySize || 'Not set'}</strong>
          </div>
          <div className="profile-modern-stat">
            <span className="profile-modern-stat-label">Industry</span>
            <strong>{displayProfile.industry || 'Not set'}</strong>
          </div>
          <div className="profile-modern-stat">
            <span className="profile-modern-stat-label">Contact email</span>
            <strong>{displayProfile.contactEmail || user?.email || 'Not set'}</strong>
          </div>
        </section>

        <section className="company-profile-summary">
          <div className="company-profile-summary-card">
            <span className="company-profile-summary-label">Profile readiness</span>
            <strong>{companyProfileCompleteness}%</strong>
            <p>How complete your employer profile is for attracting quality intern applicants.</p>
            <div className="company-profile-progress" aria-hidden="true">
              <span style={{ width: `${companyProfileCompleteness}%` }} />
            </div>
          </div>
          <div className="company-profile-summary-card">
            <span className="company-profile-summary-label">Hiring spotlight</span>
            <strong>{displayProfile.hiringPriorities ? 'Configured' : 'Needs setup'}</strong>
            <p>
              {displayProfile.hiringPriorities
                ? 'Your role priorities are visible to candidates.'
                : 'Add role priorities so the right interns apply faster.'}
            </p>
            <Link to="/company/dashboard" className="btn btn-secondary btn-sm">
              Go to hiring dashboard
            </Link>
          </div>
          <div className="company-profile-summary-card">
            <span className="company-profile-summary-label">Verification</span>
            <strong>{displayProfile.isVerified ? 'Verified' : 'Pending verification'}</strong>
            <p>
              {displayProfile.isVerified
                ? 'Your company has completed verification checks.'
                : 'Submit registration document and Company Tax ID to get verified. Adding logo and website is optional, but strongly boosts trust and applicant quality.'}
            </p>
          </div>
        </section>

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
                    <label>Your company's location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="Where your company is based (city, region, country)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company size*</label>
                    <select
                      name="companySize"
                      value={formData.companySize || ''}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="e.g. +233 24 123 4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Intern Intake per Year</label>
                    <input
                      type="text"
                      name="internIntake"
                      value={formData.internIntake || ''}
                      onChange={handleChange}
                      placeholder="e.g. 10 interns"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Your office on Google Maps (optional)</label>
                  <input
                    type="text"
                    name="mapLocation"
                    value={formData.mapLocation || ''}
                    onChange={handleChange}
                    placeholder="URL or embed link"
                  />
                </div>
                <div className="form-group">
                   <label>Company Logo</label>
                   <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="logo-upload"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                        hidden
                      />
                      <label htmlFor="logo-upload" className="btn btn-secondary">
                        {saving ? 'Uploading...' : 'Upload Logo'}
                      </label>
                      {formData.logo && <span className="file-name">✅ Logo uploaded</span>}
                   </div>
                </div>
                <div className="form-group">
                   <label>Registration Document</label>
                   <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="reg-doc-upload"
                        onChange={(e) => handleFileUpload(e, 'registrationDoc')}
                        hidden
                      />
                      <label htmlFor="reg-doc-upload" className="btn btn-secondary">
                        {saving ? 'Uploading...' : 'Upload Registration Doc'}
                      </label>
                      {formData.registrationDoc && <span className="file-name">✅ Document uploaded</span>}
                   </div>
                </div>
                <div className="card profile-card kyi-card">
                  <h2>Company Verification</h2>
                  <p className="profile-field-hint">
                    Verify your company by submitting your registration document and Company Tax ID.
                  </p>
                  <p className="profile-field-hint">
                    Optional but highly recommended: add your company logo and website. Verified companies with complete branding usually attract stronger and more applications.
                  </p>
                  <div className="form-group">
                    <label>Company Tax ID</label>
                    <input
                      type="text"
                      name="companyTaxId"
                      value={formData.companyTaxId || ''}
                      onChange={handleChange}
                      placeholder="e.g. C0001234567"
                    />
                  </div>
                  <p className="kyi-status">
                    Verification status: {(formData.isVerified || displayProfile.isVerified) ? 'Verified' : 'Not verified'}
                  </p>
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
                <h2>Hiring preferences</h2>
                <p className="profile-field-hint">Set expectations so stronger candidates apply and your screening becomes faster.</p>
                <div className="form-group">
                  <label>Priority roles / teams</label>
                  <textarea
                    name="hiringPriorities"
                    value={formData.hiringPriorities || ''}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineering Interns, Product Design Interns, Marketing Operations Interns"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>What you look for in candidates</label>
                  <textarea
                    name="candidateRequirements"
                    value={formData.candidateRequirements || ''}
                    onChange={handleChange}
                    placeholder="e.g. problem solving, communication, portfolio quality, project experience"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Hiring workflow</label>
                  <textarea
                    name="hiringWorkflow"
                    value={formData.hiringWorkflow || ''}
                    onChange={handleChange}
                    placeholder="e.g. CV review -> shortlist -> interview -> offer"
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
          <div className="profile-view profile-view-company">
            {displayProfile.description && (
              <section className="card profile-section profile-company-main">
                <h2>About</h2>
                <p className="profile-bio">{displayProfile.description}</p>
              </section>
            )}

            {displayProfile.benefits && (
              <section className="card profile-section profile-company-main">
                <h2>What we offer interns</h2>
                <p className="profile-bio">{displayProfile.benefits}</p>
              </section>
            )}

            {(displayProfile.hiringPriorities || displayProfile.candidateRequirements || displayProfile.hiringWorkflow) && (
              <section className="card profile-section profile-company-main">
                <h2>Hiring Preferences</h2>
                {displayProfile.hiringPriorities && (
                  <div className="profile-detail-row profile-detail-block">
                    <span className="profile-detail-label">Priority Roles</span>
                    <p>{displayProfile.hiringPriorities}</p>
                  </div>
                )}
                {displayProfile.candidateRequirements && (
                  <div className="profile-detail-row profile-detail-block">
                    <span className="profile-detail-label">Candidate Expectations</span>
                    <p>{displayProfile.candidateRequirements}</p>
                  </div>
                )}
                {displayProfile.hiringWorkflow && (
                  <div className="profile-detail-row profile-detail-block">
                    <span className="profile-detail-label">Hiring Workflow</span>
                    <p>{displayProfile.hiringWorkflow}</p>
                  </div>
                )}
              </section>
            )}

            {(displayProfile.website || displayProfile.industry || displayProfile.location || displayProfile.companySize) && (
              <section className="card profile-section profile-company-side">
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
                {displayProfile.phone && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Phone</span>
                    <span>{displayProfile.phone}</span>
                  </div>
                )}
                {displayProfile.companyTaxId && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Company Tax ID</span>
                    <span>{displayProfile.companyTaxId}</span>
                  </div>
                )}
                {displayProfile.internIntake && (
                  <div className="profile-detail-row">
                    <span className="profile-detail-label">Intern Intake</span>
                    <span>{displayProfile.internIntake} per year</span>
                  </div>
                )}
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Verification</span>
                  <span>{displayProfile.isVerified ? '✅ Verified Company' : 'Not verified yet'}</span>
                </div>
                {displayProfile.mapLocation && (
                   <div className="profile-map-container mt-4">
                      <h3>Find us on Google Maps</h3>
                      {displayProfile.mapLocation.includes('<iframe') ? (
                         <div dangerouslySetInnerHTML={{ __html: displayProfile.mapLocation }} />
                      ) : (
                         <a href={displayProfile.mapLocation} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            View on Google Maps
                         </a>
                      )}
                   </div>
                )}
              </section>
            )}

            {(displayProfile.contactEmail || user?.email) && (
              <section className="card profile-section profile-company-side">
                <h2>Contact</h2>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Enquiries</span>
                  <a href={`mailto:${displayProfile.contactEmail || user?.email}`} className="profile-link">
                    {displayProfile.contactEmail || user?.email}
                  </a>
                </div>
              </section>
            )}

            {displayProfile.registrationDoc && (
              <section className="card profile-section profile-company-side">
                <h2>Verified Documents</h2>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Registration</span>
                  <a href={displayProfile.registrationDoc} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                    View Document
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

        {helpSection}

        <div className="profile-back">
          <Link to="/company/dashboard" className="profile-back-link">← Back to dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
