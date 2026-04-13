import { useState, useEffect } from 'react';
import api from '../utils/api';
import './Dashboard.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;

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
