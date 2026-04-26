import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AccountDeletionPanel from '../components/AccountDeletionPanel'
import api from '../utils/api'
import './UserSettings.css'

const DEFAULT_PREFS = {
  profileVisibility: 'public',
  showContactInfo: true,
  notifyJobRecommendations: true,
  notifyApplicationUpdates: true,
  notifyNewApplicants: true,
  channelEmail: true,
  channelInApp: true,
}

function getTokenIssuedAt() {
  try {
    const token = localStorage.getItem('token')
    if (!token || token.startsWith('demo-')) return null
    const payload = token.split('.')[1]
    if (!payload) return null
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return typeof json.iat === 'number' ? new Date(json.iat * 1000) : null
  } catch {
    return null
  }
}

function UserSettings() {
  const { user, logout } = useAuth()
  const [preferences, setPreferences] = useState(DEFAULT_PREFS)
  const [accountMessage, setAccountMessage] = useState('')
  const [settingsMessage, setSettingsMessage] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [emailDraft, setEmailDraft] = useState(user?.email || '')

  useEffect(() => {
    let active = true
    const loadSettings = async () => {
      setLoadingSettings(true)
      setSettingsError('')
      try {
        const { data } = await api.get('/auth/settings')
        if (!active) return
        setPreferences((prev) => ({ ...prev, ...data }))
      } catch {
        if (!active) return
        setSettingsError('Could not load settings right now. You can retry and save again.')
      } finally {
        if (active) setLoadingSettings(false)
      }
    }
    loadSettings()
    return () => {
      active = false
    }
  }, [])

  const handlePreferenceChange = (name) => {
    setPreferences((prev) => ({ ...prev, [name]: !prev[name] }))
    setSettingsMessage('')
    setSettingsError('')
  }

  const handleVisibilityChange = (value) => {
    setPreferences((prev) => ({ ...prev, profileVisibility: value }))
    setSettingsMessage('')
    setSettingsError('')
  }

  const handleSaveSettings = async () => {
    setSavingSettings(true)
    setSettingsMessage('')
    setSettingsError('')
    try {
      const { data } = await api.put('/auth/settings', preferences)
      setPreferences((prev) => ({ ...prev, ...data }))
      setSettingsMessage('Settings saved successfully.')
    } catch (err) {
      setSettingsError(err.response?.data?.error || 'Could not save settings. Please try again.')
    } finally {
      setSavingSettings(false)
    }
  }

  const issuedAt = getTokenIssuedAt()
  const dashboardPath = user?.userType === 'COMPANY' ? '/company/dashboard' : '/intern/dashboard'
  const canShowCompanyApplicantAlert = user?.userType === 'COMPANY'

  return (
    <div className="settings-page">
      <div className="container settings-shell">
        <header className="settings-header">
          <h1>Settings</h1>
          <p>Manage your privacy, account access, and notification preferences.</p>
        </header>

        <section className="card settings-section">
          <h2>Privacy &amp; Security</h2>
          <div className="settings-control-group">
            <p className="settings-control-label">Profile visibility</p>
            <div className="settings-radio-row">
              <label>
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={preferences.profileVisibility === 'public'}
                  onChange={() => handleVisibilityChange('public')}
                />
                <span>Public</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={preferences.profileVisibility === 'limited'}
                  onChange={() => handleVisibilityChange('limited')}
                />
                <span>Limited</span>
              </label>
            </div>
          </div>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={preferences.showContactInfo}
              onChange={() => handlePreferenceChange('showContactInfo')}
            />
            <span>Show contact info on profile</span>
          </label>
          <div className="settings-inline-note">
            <strong>2FA:</strong> Planned for a future release.
          </div>
          <div className="settings-control-group">
            <p className="settings-control-label">Recent login activity</p>
            <p className="settings-muted-text">
              {issuedAt
                ? `Current session started on ${issuedAt.toLocaleString()}.`
                : 'No recent login activity available for this session.'}
            </p>
          </div>
        </section>

        <section className="card settings-section">
          <h2>Account</h2>
          <div className="settings-actions">
            <Link to="/profile" className="btn btn-secondary">Edit profile</Link>
            <Link to={dashboardPath} className="btn btn-secondary">Back to dashboard</Link>
            <Link to="/forgot-password" className="btn btn-secondary">Change password</Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setAccountMessage('Logged out on this device. For full multi-device sign-out, token revocation will be enabled next.')
                logout()
              }}
            >
              Logout all devices/sessions
            </button>
          </div>
          <div className="settings-email-change">
            <label htmlFor="settings-email" className="settings-control-label">Change email (re-verification required)</label>
            <div className="settings-email-row">
              <input
                id="settings-email"
                type="email"
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                placeholder="new-email@example.com"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setAccountMessage('Email change with automatic re-verification will be connected in backend next.')}
              >
                Update email
              </button>
            </div>
          </div>
          {accountMessage && <p className="settings-status">{accountMessage}</p>}
        </section>

        <section className="card settings-section">
          <h2>Notifications</h2>
          <p className="settings-section-sub">Choose which alerts you receive and where they are delivered.</p>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={preferences.notifyJobRecommendations}
              onChange={() => handlePreferenceChange('notifyJobRecommendations')}
            />
            <span>Job recommendations alerts</span>
          </label>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={preferences.notifyApplicationUpdates}
              onChange={() => handlePreferenceChange('notifyApplicationUpdates')}
            />
            <span>Application status updates</span>
          </label>
          {canShowCompanyApplicantAlert && (
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={preferences.notifyNewApplicants}
                onChange={() => handlePreferenceChange('notifyNewApplicants')}
              />
              <span>New applicant alerts</span>
            </label>
          )}
          <div className="settings-control-group">
            <p className="settings-control-label">Notification channels</p>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={preferences.channelEmail}
                onChange={() => handlePreferenceChange('channelEmail')}
              />
              <span>Email</span>
            </label>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={preferences.channelInApp}
                onChange={() => handlePreferenceChange('channelInApp')}
              />
              <span>In-app</span>
            </label>
          </div>
          <div className="settings-save-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveSettings}
              disabled={loadingSettings || savingSettings}
            >
              {savingSettings ? 'Saving...' : 'Save settings'}
            </button>
            {loadingSettings && <p className="settings-muted-text">Loading your saved preferences...</p>}
          </div>
          {settingsMessage && <p className="settings-status">{settingsMessage}</p>}
          {settingsError && <p className="settings-error">{settingsError}</p>}
        </section>

        <AccountDeletionPanel />
      </div>
    </div>
  )
}

export default UserSettings
