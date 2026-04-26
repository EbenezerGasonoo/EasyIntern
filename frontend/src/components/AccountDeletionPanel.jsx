import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

function formatDeletionCountdown(isoDate) {
  const end = new Date(isoDate).getTime()
  const now = Date.now()
  const ms = Math.max(0, end - now)
  const totalSec = Math.floor(ms / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  if (days > 0) return `${days} day${days === 1 ? '' : 's'}, ${hours} hour${hours === 1 ? '' : 's'}`
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'}, ${mins} minute${mins === 1 ? '' : 's'}`
  return `${mins} minute${mins === 1 ? '' : 's'}`
}

export default function AccountDeletionPanel({ backendUnavailable = false }) {
  const { user, fetchUser } = useAuth()
  const [password, setPassword] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  const isDemoToken = token === 'demo-intern' || token === 'demo-company'

  const scheduledAt = user?.scheduledAccountDeletionAt

  useEffect(() => {
    if (!backendUnavailable && !isDemoToken) {
      fetchUser().catch(() => {})
    }
  }, [backendUnavailable, isDemoToken, fetchUser])

  const refreshUser = useCallback(async () => {
    await fetchUser()
  }, [fetchUser])

  const handleSchedule = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!acknowledged) {
      setError('Please confirm that you understand your account will be permanently deleted.')
      return
    }
    if (!password.trim()) {
      setError('Enter your password to confirm.')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/account/schedule-deletion', { password })
      setPassword('')
      setAcknowledged(false)
      setSuccess('Deletion scheduled. Admins have been notified. You can still cancel below before the deadline.')
      await refreshUser()
    } catch (err) {
      setError(err.response?.data?.error || 'Could not schedule deletion. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/auth/account/cancel-deletion')
      setSuccess('Scheduled deletion has been cancelled.')
      await refreshUser()
    } catch (err) {
      setError(err.response?.data?.error || 'Could not cancel.')
    } finally {
      setLoading(false)
    }
  }

  if (isDemoToken || backendUnavailable) {
    return (
      <section className="dashboard-section account-deletion-section" aria-label="Account deletion">
        <div className="card account-deletion-card account-deletion-card--muted">
          <h2>Delete account</h2>
          <p className="account-deletion-muted">
            Connect to the live app with a real account to schedule or manage account deletion.
          </p>
        </div>
      </section>
    )
  }

  if (scheduledAt) {
    const when = new Date(scheduledAt)
    const countdown = formatDeletionCountdown(scheduledAt)
    return (
      <section className="dashboard-section account-deletion-section" aria-label="Account deletion scheduled">
        <div className="card account-deletion-card account-deletion-card--warning">
          <h2>Account deletion scheduled</h2>
          <p>
            Your account is set to be <strong>permanently deleted</strong> on{' '}
            <strong>{when.toLocaleString()}</strong> (about {countdown} from now).
          </p>
          <p className="account-deletion-note">
            Until then you can keep using EasyIntern. Admins were notified when you requested this. You may cancel
            anytime before the deadline.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? 'Working…' : 'Cancel deletion and keep my account'}
          </button>
          {(error || success) && (
            <p className={error ? 'account-deletion-error' : 'account-deletion-success'} role="status">
              {error || success}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-section account-deletion-section" aria-label="Delete account">
      <div className="card account-deletion-card">
        <h2>Delete account</h2>
        <p>
          You can request permanent deletion of your account and data. There is a <strong>3-day waiting period</strong>{' '}
          before removal; you can cancel anytime during that period. <strong>Admins are notified</strong> when you
          request deletion.
        </p>
        <form className="account-deletion-form" onSubmit={handleSchedule}>
          <label className="account-deletion-checkbox">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span>I understand my account and profile will be permanently removed after the waiting period.</span>
          </label>
          <div className="form-group">
            <label htmlFor="account-delete-password">Confirm with your password</label>
            <input
              id="account-delete-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>
          {(error || success) && (
            <p className={error ? 'account-deletion-error' : 'account-deletion-success'} role="status">
              {error || success}
            </p>
          )}
          <button type="submit" className="btn btn-danger account-deletion-btn-strong" disabled={loading}>
            {loading ? 'Scheduling…' : 'Request account deletion'}
          </button>
        </form>
      </div>
    </section>
  )
}
