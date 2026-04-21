import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Logo from '../components/Logo'
import { GHANA_UNIVERSITIES } from '../data/ghanaUniversities'
import './Register.css'

function Register() {
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get('type')
  const [userType, setUserType] = useState(typeParam === 'company' ? 'COMPANY' : 'INTERN')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    studentId: '',
    name: '',
    description: '',
    website: '',
    industry: '',
    location: '',
    phone: '',
    companySize: '',
    internIntake: '',
    mapLocation: '',
    bio: '',
    experience: '',
    skills: '',
    education: '',
    customEducation: '',
    educationWebsite: '',
    confirmEducationWebsite: false,
  })
  const [error, setError] = useState('')
  const [socialNotice, setSocialNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const nextValue = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: nextValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSocialNotice('')

    if (userType === 'INTERN') {
      const selectedEducation = formData.education
      const isOtherEducation = selectedEducation === 'OTHER'
      const finalEducation = isOtherEducation
        ? formData.customEducation.trim()
        : selectedEducation

      if (!finalEducation) {
        setError('Please select your university.')
        return
      }

      if (isOtherEducation) {
        if (!formData.educationWebsite.trim()) {
          setError('Please provide your university website.')
          return
        }
        if (!formData.confirmEducationWebsite) {
          setError('Please confirm the university website is correct.')
          return
        }
      }
    }

    setLoading(true)

    try {
      const endpoint =
        userType === 'COMPANY' ? '/auth/register/company' : '/auth/register/intern'
      const payload =
        userType === 'COMPANY'
          ? {
              email: formData.email,
              password: formData.password,
              name: formData.name,
              description: formData.description,
              website: formData.website,
              industry: formData.industry,
              location: formData.location,
              phone: formData.phone,
              companySize: formData.companySize,
              internIntake: formData.internIntake,
              mapLocation: formData.mapLocation,
            }
          : {
              email: formData.email,
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
              studentId: formData.studentId,
              phone: formData.phone,
              bio: formData.bio,
              experience: formData.experience,
              skills: formData.skills
                ? formData.skills.split(',').map((s) => s.trim())
                : [],
              education:
                formData.education === 'OTHER'
                  ? formData.customEducation.trim()
                  : formData.education,
              educationWebsite:
                formData.education === 'OTHER'
                  ? formData.educationWebsite.trim()
                  : null,
              location: formData.location,
            }

      const response = await api.post(endpoint, payload)
      login(response.data.token, response.data.user)
      navigate('/verify-email-notice')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = (provider) => {
    setError('')
    setSocialNotice(`${provider} signup will be available soon.`)
  }

  return (
    <div className="register-page">
      <div className="register-shell">
        <div className={`register-visual ${userType === 'COMPANY' ? 'register-visual-company' : 'register-visual-intern'}`}>
          <Link to="/" className="register-logo">
            <Logo size="xlarge" theme="light" />
          </Link>
          <div className="register-visual-copy">
            <h2>Build your profile and get matched faster.</h2>
            <p>
              Join EasyIntern as an intern or company and start connecting with
              the right opportunities.
            </p>
          </div>
        </div>

        <div className="register-card">
          <h1 className="register-title">Create an Account</h1>
          <p className="register-subtitle">
            Sign up to find internships or hire great interns.
          </p>

          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${userType === 'INTERN' ? 'active' : ''}`}
              onClick={() => setUserType('INTERN')}
            >
              I&apos;m an Intern
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'COMPANY' ? 'active' : ''}`}
              onClick={() => setUserType('COMPANY')}
            >
              I&apos;m a Company
            </button>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="register-password">Password</label>
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-phone">Phone Number</label>
              <input
                id="register-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            {userType === 'COMPANY' ? (
              <>
                <div className="form-group">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    id="company-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Company name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-description">Description</label>
                  <textarea
                    id="company-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell interns about your company"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-website">Website</label>
                  <input
                    id="company-website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-industry">Industry</label>
                  <input
                    id="company-industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. FinTech"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-size">Company Size*</label>
                  <select
                    id="company-size"
                    name="companySize"
                    value={formData.companySize}
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
                <div className="form-group">
                  <label htmlFor="company-intake">Intern Intake per Year</label>
                  <input
                    id="company-intake"
                    type="text"
                    name="internIntake"
                    value={formData.internIntake}
                    onChange={handleChange}
                    placeholder="e.g. 5 interns"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-location">Location</label>
                  <input
                    id="company-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company-map">Google Maps Location</label>
                  <input
                    id="company-map"
                    type="text"
                    name="mapLocation"
                    value={formData.mapLocation}
                    onChange={handleChange}
                    placeholder="URL or embed link"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="intern-first-name">First Name</label>
                  <input
                    id="intern-first-name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-last-name">Last Name</label>
                  <input
                    id="intern-last-name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-student-id">Student ID</label>
                  <input
                    id="intern-student-id"
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-bio">Bio</label>
                  <textarea
                    id="intern-bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell companies about yourself"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-skills">Skills (comma-separated)</label>
                  <input
                    id="intern-skills"
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="JavaScript, React, Python"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-experience">Experience</label>
                  <textarea
                    id="intern-experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Share internships, projects, volunteer work, or practical experience"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="intern-education">Education</label>
                  <select
                    id="intern-education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your university or college</option>
                    {GHANA_UNIVERSITIES.map((university) => (
                      <option key={university} value={university}>
                        {university}
                      </option>
                    ))}
                    <option value="OTHER">My university is not listed</option>
                  </select>
                </div>
                {formData.education === 'OTHER' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="intern-custom-education">University Name</label>
                      <input
                        id="intern-custom-education"
                        type="text"
                        name="customEducation"
                        value={formData.customEducation}
                        onChange={handleChange}
                        placeholder="Enter your university name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="intern-education-website">University Website</label>
                      <input
                        id="intern-education-website"
                        type="url"
                        name="educationWebsite"
                        value={formData.educationWebsite}
                        onChange={handleChange}
                        placeholder="https://youruniversity.edu"
                        required
                      />
                    </div>
                    <label className="education-confirm">
                      <input
                        type="checkbox"
                        name="confirmEducationWebsite"
                        checked={formData.confirmEducationWebsite}
                        onChange={handleChange}
                      />
                      <span>I confirm this is my university's official website.</span>
                    </label>
                  </>
                )}
                <div className="form-group">
                  <label htmlFor="intern-location">Location</label>
                  <input
                    id="intern-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
              </>
            )}

            {error && <div className="register-error">{error}</div>}

            <div className="register-divider">
              <span>or continue with</span>
            </div>

            <div className="register-social-buttons">
              <button
                type="button"
                className="register-social-btn"
                onClick={() => handleSocialSignup('Google')}
              >
                <span className="register-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.95h5.5c-.24 1.28-.97 2.36-2.06 3.08l3.33 2.58c1.94-1.79 3.06-4.42 3.06-7.53 0-.72-.06-1.42-.18-2.08H12Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 22c2.77 0 5.1-.92 6.8-2.49l-3.33-2.58c-.92.62-2.1.99-3.47.99-2.66 0-4.92-1.8-5.72-4.22l-3.44 2.66A10 10 0 0 0 12 22Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M6.28 13.7A6 6 0 0 1 6 12c0-.59.1-1.15.28-1.7L2.84 7.64A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.52l3.2-2.82Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 6.08c1.5 0 2.84.52 3.89 1.54l2.92-2.92C17.09 3.1 14.77 2 12 2A10 10 0 0 0 3.08 7.48l3.2 2.82C7.08 7.88 9.34 6.08 12 6.08Z"
                    />
                  </svg>
                </span>
                Continue with Google
              </button>
              <button
                type="button"
                className="register-social-btn"
                onClick={() => handleSocialSignup('LinkedIn')}
              >
                <span className="register-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path
                      fill="#0A66C2"
                      d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.35-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3ZM5.31 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.09 20.45H3.52V9h3.57v11.45Z"
                    />
                  </svg>
                </span>
                Sign up with LinkedIn
              </button>
            </div>

            {socialNotice && (
              <div className="register-social-notice" role="status">
                {socialNotice}
              </div>
            )}

            <button type="submit" className="register-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <p className="register-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
