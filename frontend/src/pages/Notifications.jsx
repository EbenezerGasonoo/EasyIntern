import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';
import './Notifications.css';

function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketSummary, setTicketSummary] = useState(null);
  const [ticketDrafts, setTicketDrafts] = useState({});
  const [savingTicketId, setSavingTicketId] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, [user?.isAdmin]);

  const fetchNotifications = async () => {
    try {
      if (user?.isAdmin) {
        const response = await api.get('/admin/tickets');
        const ticketData = response.data || {};
        const ticketItems = Array.isArray(ticketData.tickets) ? ticketData.tickets : [];
        setNotifications(ticketItems);
        setTicketSummary(ticketData.summary || null);
      } else {
        const response = await api.get('/notifications');
        const items = Array.isArray(response.data) ? response.data : [];
        setNotifications(items);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    if (user?.isAdmin) {
      return;
    }
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (user?.isAdmin) {
      return;
    }
    try {
      await api.patch('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    if (user?.isAdmin) {
      setNotifications(notifications.filter(n => n.id !== id));
      return;
    }
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const updateTicketDraft = (id, field, value) => {
    setTicketDrafts((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value,
      },
    }));
  };

  const saveTicketWorkflow = async (ticket) => {
    const draft = ticketDrafts[ticket.id] || {};
    const payload = {
      status: draft.status ?? ticket.status,
      priority: draft.priority ?? ticket.priority,
      ownerAdminEmail: draft.ownerAdminEmail ?? ticket.ownerAdminEmail ?? '',
      dueAt: draft.dueAt ?? (ticket.dueAt ? String(ticket.dueAt).slice(0, 10) : ''),
      internalNotes: draft.internalNotes ?? ticket.internalNotes ?? '',
      slaBreached: draft.slaBreached ?? ticket.slaBreached ?? false,
    };

    try {
      setSavingTicketId(ticket.id);
      await api.patch(`/admin/tickets/${ticket.id}`, payload);
      await fetchNotifications();
    } catch (error) {
      console.error('Failed to update ticket workflow:', error);
    } finally {
      setSavingTicketId(null);
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;

  const isAdmin = Boolean(user?.isAdmin);

  if (isAdmin) {
    return (
      <div className="admin-notifications-page container mt-5">
        <div className="admin-notifications-header">
          <div>
            <p className="admin-notifications-eyebrow">Admin queue</p>
            <h1>Ticket Center</h1>
            <p>Operational tickets and platform alerts requiring admin attention.</p>
          </div>
          <Link to="/admin" className="btn btn-secondary">Back to dashboard</Link>
        </div>

        {ticketSummary && (
          <div className="admin-ticket-summary-grid">
            <div className="admin-ticket-summary-card">
              <span>Total tickets</span>
              <strong>{ticketSummary.total || 0}</strong>
            </div>
            <div className="admin-ticket-summary-card">
              <span>Open tickets</span>
              <strong>{ticketSummary.open || 0}</strong>
            </div>
            <div className="admin-ticket-summary-card">
              <span>High priority</span>
              <strong>{ticketSummary.highPriority || 0}</strong>
            </div>
          </div>
        )}

        <div className="admin-ticket-list">
          {notifications.length === 0 ? (
            <p className="empty-state">No admin tickets at the moment.</p>
          ) : (
            notifications.map((item) => (
              <article key={item.id} className={`admin-ticket-card priority-${String(item.priority || 'LOW').toLowerCase()}`}>
                <div className="admin-ticket-card-head">
                  <span className="admin-ticket-category">{item.category}</span>
                  <span className="admin-ticket-priority">{item.priority}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <div className="admin-ticket-card-foot">
                  <small>{new Date(item.createdAt).toLocaleString()}</small>
                  {item.link && <Link to={item.link}>Open</Link>}
                </div>

                {item.source === 'SUPPORT' && (
                  <div className="admin-ticket-workflow">
                    <div className="admin-ticket-workflow-row">
                      <label>Status</label>
                      <select
                        value={ticketDrafts[item.id]?.status ?? item.status}
                        onChange={(e) => updateTicketDraft(item.id, 'status', e.target.value)}
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </div>
                    <div className="admin-ticket-workflow-row">
                      <label>Priority</label>
                      <select
                        value={ticketDrafts[item.id]?.priority ?? item.priority}
                        onChange={(e) => updateTicketDraft(item.id, 'priority', e.target.value)}
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                      </select>
                    </div>
                    <div className="admin-ticket-workflow-row">
                      <label>Owner</label>
                      <input
                        type="text"
                        value={ticketDrafts[item.id]?.ownerAdminEmail ?? item.ownerAdminEmail ?? ''}
                        onChange={(e) => updateTicketDraft(item.id, 'ownerAdminEmail', e.target.value)}
                        placeholder="admin@easyintern.app"
                      />
                    </div>
                    <div className="admin-ticket-workflow-row">
                      <label>Due date</label>
                      <input
                        type="date"
                        value={ticketDrafts[item.id]?.dueAt ?? (item.dueAt ? String(item.dueAt).slice(0, 10) : '')}
                        onChange={(e) => updateTicketDraft(item.id, 'dueAt', e.target.value)}
                      />
                    </div>
                    <div className="admin-ticket-workflow-row admin-ticket-workflow-row-full">
                      <label>Internal notes</label>
                      <textarea
                        value={ticketDrafts[item.id]?.internalNotes ?? item.internalNotes ?? ''}
                        onChange={(e) => updateTicketDraft(item.id, 'internalNotes', e.target.value)}
                        placeholder="Internal notes for support/admin team"
                      />
                    </div>
                    <div className="admin-ticket-workflow-row admin-ticket-workflow-row-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={Boolean(ticketDrafts[item.id]?.slaBreached ?? item.slaBreached)}
                          onChange={(e) => updateTicketDraft(item.id, 'slaBreached', e.target.checked)}
                        />
                        Mark SLA breached
                      </label>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => saveTicketWorkflow(item)}
                        disabled={savingTicketId === item.id}
                      >
                        {savingTicketId === item.id ? 'Saving...' : 'Save workflow'}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Notifications</h1>
        {notifications.some(n => !n.isRead) && (
          <button onClick={markAllAsRead} className="btn btn-secondary">Mark all as read</button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty-state">No notifications yet.</p>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`notification-item card mb-2 ${!n.isRead ? 'unread' : ''}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">{n.message}</p>
                  <small className="text-muted">{new Date(n.createdAt).toLocaleString()}</small>
                </div>
                <div className="actions">
                  {!n.isRead && (
                    <button onClick={() => markAsRead(n.id)} className="btn btn-sm btn-outline-primary me-2">Mark Read</button>
                  )}
                  <button onClick={() => deleteNotification(n.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <style>{`
        .notification-item.unread {
          border-left: 4px solid var(--primary-color);
          background-color: #f8f9ff;
        }
        .notification-item {
          transition: transform 0.2s;
        }
        .notification-item:hover {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}

export default Notifications;
