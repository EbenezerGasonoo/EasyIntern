import { useEffect, useMemo, useState } from 'react'
import api from '../utils/api'
import './AdminSettings.css'

const ROLE_OPTIONS = ['SUPER_ADMIN', 'OPS_ADMIN', 'SUPPORT_ADMIN']

const DEFAULT_SETTINGS = {
  security: {
    sessionTimeoutMinutes: 60,
    passwordMinLength: 10,
    enforceTwoFactor: false,
  },
  moderation: {
    autoHideRiskyJobs: true,
    riskyJobScoreThreshold: 80,
    duplicateCompanySignalThreshold: 2,
    suspiciousSignupBurstPerHour: 20,
  },
  notifications: {
    staleApplicationReminderDays: 7,
    ticketEscalationHours: 24,
    sendTicketDigestDaily: true,
  },
  verification: {
    requireCompanyTaxId: true,
    requireRegistrationDocument: true,
    verificationSlaHours: 48,
  },
}

function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const [smtpLoading, setSmtpLoading] = useState(true)
  const [smtpSaving, setSmtpSaving] = useState(false)
  const [smtpTesting, setSmtpTesting] = useState(false)
  const [smtpMessage, setSmtpMessage] = useState('')
  const [smtpForm, setSmtpForm] = useState({
    host: 'easyintern.app',
    port: 465,
    secure: true,
    username: '',
    password: '',
    fromName: 'EasyIntern',
    fromEmail: 'support@easyintern.app',
    isActive: true,
    testRecipient: '',
  })

  const [admins, setAdmins] = useState([])
  const [adminsLoading, setAdminsLoading] = useState(true)
  const [adminMessage, setAdminMessage] = useState('')
  const [creatingAdmin, setCreatingAdmin] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    role: 'SUPPORT_ADMIN',
  })
  const [updatingAdminId, setUpdatingAdminId] = useState(null)
  const [passwordDrafts, setPasswordDrafts] = useState({})

  const canCreateAdmin = useMemo(() => newAdmin.email && newAdmin.password && newAdmin.role, [newAdmin])

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const response = await api.get('/admin/settings')
        const next = response.data?.settings || DEFAULT_SETTINGS
        setSettings({
          ...DEFAULT_SETTINGS,
          ...next,
          security: { ...DEFAULT_SETTINGS.security, ...(next.security || {}) },
          moderation: { ...DEFAULT_SETTINGS.moderation, ...(next.moderation || {}) },
          notifications: { ...DEFAULT_SETTINGS.notifications, ...(next.notifications || {}) },
          verification: { ...DEFAULT_SETTINGS.verification, ...(next.verification || {}) },
        })
      } catch {
        setMessage('Failed to load admin settings.')
      } finally {
        setLoading(false)
      }
    }

    const fetchSmtp = async () => {
      setSmtpLoading(true)
      try {
        const response = await api.get('/admin/smtp-config')
        const cfg = response.data || {}
        if (cfg.configured) {
          setSmtpForm((prev) => ({
            ...prev,
            host: cfg.host === 'mail.easyintern.app' ? 'easyintern.app' : (cfg.host || 'easyintern.app'),
            port: cfg.port || 465,
            secure: cfg.secure !== undefined ? Boolean(cfg.secure) : true,
            username: cfg.username || '',
            password: '',
            fromName: cfg.fromName || 'EasyIntern',
            fromEmail: cfg.fromEmail || 'support@easyintern.app',
            isActive: cfg.isActive !== false,
          }))
        }
      } catch {
        setSmtpMessage('Failed to load SMTP settings.')
      } finally {
        setSmtpLoading(false)
      }
    }

    const fetchAdmins = async () => {
      setAdminsLoading(true)
      try {
        const response = await api.get('/admin/admin-users')
        setAdmins(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        setAdminMessage(error?.response?.data?.error || 'Failed to load admin users (requires super admin).')
      } finally {
        setAdminsLoading(false)
      }
    }

    fetchSettings()
    fetchSmtp()
    fetchAdmins()
  }, [])

  const updateSection = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }))
  }

  const saveSettings = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api.put('/admin/settings', { settings })
      setMessage('Settings saved.')
    } catch (error) {
      setMessage(error?.response?.data?.error || 'Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  const handleSmtpChange = (event) => {
    const { name, type, value, checked } = event.target
    setSmtpForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const saveSmtp = async (event) => {
    event.preventDefault()
    setSmtpSaving(true)
    setSmtpMessage('')
    try {
      await api.put('/admin/smtp-config', {
        host: smtpForm.host,
        port: Number(smtpForm.port) || 587,
        secure: smtpForm.secure,
        username: smtpForm.username,
        password: smtpForm.password,
        fromName: smtpForm.fromName,
        fromEmail: smtpForm.fromEmail,
        isActive: smtpForm.isActive,
      })
      setSmtpForm((prev) => ({ ...prev, password: '' }))
      setSmtpMessage('SMTP settings saved.')
    } catch (error) {
      setSmtpMessage(error?.response?.data?.error || 'Failed to save SMTP settings.')
    } finally {
      setSmtpSaving(false)
    }
  }

  const testSmtp = async () => {
    setSmtpTesting(true)
    setSmtpMessage('')
    try {
      await api.post('/admin/smtp-config/test', { to: smtpForm.testRecipient || undefined })
      setSmtpMessage('SMTP test email sent.')
    } catch (error) {
      setSmtpMessage(error?.response?.data?.error || 'Failed to send SMTP test email.')
    } finally {
      setSmtpTesting(false)
    }
  }

  const createAdminUser = async (event) => {
    event.preventDefault()
    if (!canCreateAdmin) return
    setCreatingAdmin(true)
    setAdminMessage('')
    try {
      const response = await api.post('/admin/admin-users', newAdmin)
      setAdmins((prev) => [...prev, response.data])
      setNewAdmin({ email: '', password: '', role: 'SUPPORT_ADMIN' })
      setAdminMessage('Admin account created.')
    } catch (error) {
      setAdminMessage(error?.response?.data?.error || 'Failed to create admin account.')
    } finally {
      setCreatingAdmin(false)
    }
  }

  const updateAdminUser = async (adminId, payload) => {
    setUpdatingAdminId(adminId)
    setAdminMessage('')
    try {
      const response = await api.patch(`/admin/admin-users/${adminId}`, payload)
      setAdmins((prev) => prev.map((admin) => (admin.id === adminId ? { ...admin, ...response.data } : admin)))
      setAdminMessage('Admin user updated.')
    } catch (error) {
      setAdminMessage(error?.response?.data?.error || 'Failed to update admin user.')
    } finally {
      setUpdatingAdminId(null)
    }
  }

  const resetAdminPassword = async (adminId) => {
    const newPassword = passwordDrafts[adminId]
    if (!newPassword || newPassword.length < 8) {
      setAdminMessage('New password must be at least 8 characters.')
      return
    }

    setUpdatingAdminId(adminId)
    setAdminMessage('')
    try {
      await api.patch(`/admin/admin-users/${adminId}/reset-password`, { newPassword })
      setPasswordDrafts((prev) => ({ ...prev, [adminId]: '' }))
      setAdminMessage('Admin password reset successfully.')
    } catch (error) {
      setAdminMessage(error?.response?.data?.error || 'Failed to reset admin password.')
    } finally {
      setUpdatingAdminId(null)
    }
  }

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-shell">
        <header className="admin-settings-hero">
          <h1>Admin Settings</h1>
          <p>Configure security policies, moderation thresholds, notifications, SMTP, and admin roles.</p>
        </header>

        <form className="admin-settings-card" onSubmit={saveSettings}>
          <h2>Platform Policy Settings</h2>
          {loading ? <p>Loading settings...</p> : (
            <div className="admin-settings-grid">
              <label>
                <span>Session timeout (minutes)</span>
                <input type="number" min="5" value={settings.security.sessionTimeoutMinutes} onChange={(e) => updateSection('security', 'sessionTimeoutMinutes', Number(e.target.value))} />
              </label>
              <label>
                <span>Password minimum length</span>
                <input type="number" min="6" value={settings.security.passwordMinLength} onChange={(e) => updateSection('security', 'passwordMinLength', Number(e.target.value))} />
              </label>
              <label>
                <span>Risky job score threshold</span>
                <input type="number" min="1" max="100" value={settings.moderation.riskyJobScoreThreshold} onChange={(e) => updateSection('moderation', 'riskyJobScoreThreshold', Number(e.target.value))} />
              </label>
              <label>
                <span>Suspicious signups per hour</span>
                <input type="number" min="1" value={settings.moderation.suspiciousSignupBurstPerHour} onChange={(e) => updateSection('moderation', 'suspiciousSignupBurstPerHour', Number(e.target.value))} />
              </label>
              <label>
                <span>Stale application reminder days</span>
                <input type="number" min="1" value={settings.notifications.staleApplicationReminderDays} onChange={(e) => updateSection('notifications', 'staleApplicationReminderDays', Number(e.target.value))} />
              </label>
              <label>
                <span>Verification SLA (hours)</span>
                <input type="number" min="1" value={settings.verification.verificationSlaHours} onChange={(e) => updateSection('verification', 'verificationSlaHours', Number(e.target.value))} />
              </label>
              <label className="admin-settings-checkbox">
                <input type="checkbox" checked={settings.security.enforceTwoFactor} onChange={(e) => updateSection('security', 'enforceTwoFactor', e.target.checked)} />
                <span>Enforce 2FA for admin users</span>
              </label>
              <label className="admin-settings-checkbox">
                <input type="checkbox" checked={settings.moderation.autoHideRiskyJobs} onChange={(e) => updateSection('moderation', 'autoHideRiskyJobs', e.target.checked)} />
                <span>Auto-hide risky jobs</span>
              </label>
            </div>
          )}
          <div className="admin-settings-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Platform Settings'}</button>
            {message && <p className="admin-settings-message">{message}</p>}
          </div>
        </form>

        <form className="admin-settings-card" onSubmit={saveSmtp}>
          <h2>Email (SMTP) Settings</h2>
          {smtpLoading ? <p>Loading SMTP settings...</p> : (
            <>
              <div className="admin-settings-grid">
                <label><span>Host</span><input name="host" placeholder="easyintern.app" autoComplete="off" value={smtpForm.host} onChange={handleSmtpChange} required /></label>
                <label><span>Port</span><input name="port" type="number" min="1" value={smtpForm.port} onChange={handleSmtpChange} required /></label>
                <label><span>Username</span><input name="username" value={smtpForm.username} onChange={handleSmtpChange} required /></label>
                <label><span>Password (blank keeps current)</span><input name="password" type="password" value={smtpForm.password} onChange={handleSmtpChange} /></label>
                <label><span>From Name</span><input name="fromName" value={smtpForm.fromName} onChange={handleSmtpChange} required /></label>
                <label><span>From Email</span><input name="fromEmail" type="email" value={smtpForm.fromEmail} onChange={handleSmtpChange} required /></label>
                <label><span>Test recipient</span><input name="testRecipient" type="email" value={smtpForm.testRecipient} onChange={handleSmtpChange} /></label>
                <label className="admin-settings-checkbox"><input name="secure" type="checkbox" checked={smtpForm.secure} onChange={handleSmtpChange} /><span>Use secure SMTP</span></label>
                <label className="admin-settings-checkbox"><input name="isActive" type="checkbox" checked={smtpForm.isActive} onChange={handleSmtpChange} /><span>Set active</span></label>
              </div>
              <div className="admin-settings-actions">
                <button type="submit" className="btn btn-primary" disabled={smtpSaving}>{smtpSaving ? 'Saving...' : 'Save SMTP Settings'}</button>
                <button type="button" className="btn btn-secondary" onClick={testSmtp} disabled={smtpTesting}>{smtpTesting ? 'Testing...' : 'Send SMTP Test'}</button>
                {smtpMessage && <p className="admin-settings-message">{smtpMessage}</p>}
              </div>
            </>
          )}
        </form>

        <section className="admin-settings-card">
          <h2>Admin Access Management</h2>
          <form className="admin-create-admin-form" onSubmit={createAdminUser}>
            <input type="email" placeholder="new-admin@easyintern.app" value={newAdmin.email} onChange={(e) => setNewAdmin((prev) => ({ ...prev, email: e.target.value }))} required />
            <input type="password" placeholder="Temporary password" value={newAdmin.password} onChange={(e) => setNewAdmin((prev) => ({ ...prev, password: e.target.value }))} required />
            <select value={newAdmin.role} onChange={(e) => setNewAdmin((prev) => ({ ...prev, role: e.target.value }))}>
              {ROLE_OPTIONS.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            <button type="submit" className="btn btn-primary" disabled={!canCreateAdmin || creatingAdmin}>{creatingAdmin ? 'Creating...' : 'Create Admin'}</button>
          </form>

          {adminMessage && <p className="admin-settings-message">{adminMessage}</p>}

          {adminsLoading ? (
            <p>Loading admin users...</p>
          ) : (
            <div className="admin-users-list">
              {admins.map((admin) => (
                <article key={admin.id} className="admin-user-row">
                  <div>
                    <strong>{admin.email}</strong>
                    <p>{admin.isSuspended ? `Suspended: ${admin.suspensionReason || 'No reason'}` : 'Active'}</p>
                  </div>
                  <div className="admin-user-controls">
                    <select value={admin.adminRole || 'SUPPORT_ADMIN'} onChange={(e) => updateAdminUser(admin.id, { role: e.target.value })} disabled={updatingAdminId === admin.id}>
                      {ROLE_OPTIONS.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => updateAdminUser(admin.id, { isSuspended: !admin.isSuspended, suspensionReason: admin.isSuspended ? null : 'Suspended by super admin' })}
                      disabled={updatingAdminId === admin.id}
                    >
                      {admin.isSuspended ? 'Reactivate' : 'Suspend'}
                    </button>
                  </div>
                  <div className="admin-user-password-reset">
                    <input
                      type="password"
                      placeholder="New password (8+ chars)"
                      value={passwordDrafts[admin.id] || ''}
                      onChange={(e) => setPasswordDrafts((prev) => ({ ...prev, [admin.id]: e.target.value }))}
                      disabled={updatingAdminId === admin.id}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => resetAdminPassword(admin.id)}
                      disabled={updatingAdminId === admin.id}
                    >
                      Reset Password
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminSettings
