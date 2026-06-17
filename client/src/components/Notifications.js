import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    fetch('/api/notifications?userId=Alice')
      .then(res => res.json())
      .then(data => setNotifs(data))
      .catch(() => {});
  }, []);

  const markRead = async (id) => {
    const res = await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    const updated = await res.json();
    setNotifs(notifs.map(n => (n._id === id ? updated : n)));
  };

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div>
      <h2>Notifications ({unread} unread)</h2>
      {notifs.map(n => (
        <div key={n._id} className={`card notification-item ${!n.read ? 'unread' : ''}`} onClick={() => !n.read && markRead(n._id)}>
          <p>{n.message}</p>
          <small style={{ color: '#888' }}>{new Date(n.createdAt).toLocaleString()}</small>
        </div>
      ))}
      {notifs.length === 0 && <div className="empty-state"><h3>No notifications</h3></div>}
    </div>
  );
}

export default Notifications;
