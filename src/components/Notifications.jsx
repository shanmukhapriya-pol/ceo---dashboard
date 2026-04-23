import React, { useState } from 'react';

const NOTIFS = [
  {
    id: 1, type: 'meeting', unread: true,
    title: 'Meeting Scheduled',
    desc: 'Max Maraston scheduled a Strategic meeting for tomorrow at 10:00 AM.',
    time: '2 min ago',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 2, type: 'task', unread: true,
    title: 'Task Assigned',
    desc: 'You have been assigned "Q3 Budget Review" by Sasha Glinsky.',
    time: '18 min ago',
    avatar: 'https://i.pravatar.cc/40?img=9',
  },
  {
    id: 3, type: 'mention', unread: true,
    title: 'Mentioned in Comment',
    desc: 'Yana Snezin mentioned you in the HR Review meeting notes.',
    time: '1 hr ago',
    avatar: 'https://i.pravatar.cc/40?img=20',
  },
  {
    id: 4, type: 'system', unread: false,
    title: 'System Update',
    desc: 'Managic Pro has been updated to version 2.4.1 with new dashboard features.',
    time: '3 hr ago',
    avatar: null,
  },
  {
    id: 5, type: 'meeting', unread: false,
    title: 'Meeting Completed',
    desc: 'Executive Alignment meeting with Max Maraston has been marked as completed.',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 6, type: 'task', unread: false,
    title: 'Task Overdue',
    desc: '"Stakeholder Report" task is 2 days overdue. Please update the status.',
    time: 'Yesterday',
    avatar: null,
  },
  {
    id: 7, type: 'mention', unread: false,
    title: 'New Interaction Logged',
    desc: 'Sasha Glinsky logged a new board interaction for the Creative session.',
    time: '2 days ago',
    avatar: 'https://i.pravatar.cc/40?img=9',
  },
];

const TYPE_META = {
  meeting:  { icon: '📅', color: '#dbeafe', text: '#1a3a8f', label: 'Meeting' },
  task:     { icon: '✅', color: '#dcfce7', text: '#16a34a', label: 'Task' },
  mention:  { icon: '💬', color: '#ede9fe', text: '#7c3aed', label: 'Mention' },
  system:   { icon: '⚙️', color: '#f1f5f9', text: '#475569', label: 'System' },
};

const FILTERS = ['All', 'Unread', 'Meeting', 'Task', 'Mention', 'System'];

function Notifications() {
  const [filter, setFilter] = useState('All');
  const [notifs, setNotifs] = useState(NOTIFS);

  const visible = notifs.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return n.unread;
    return n.type === filter.toLowerCase();
  });

  const unreadCount = notifs.filter((n) => n.unread).length;

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markRead(id) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));
  }

  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Notifications {unreadCount > 0 && <span style={{ fontSize: 13, fontWeight: 700, background: '#1a3a8f', color: '#fff', borderRadius: 20, padding: '2px 10px', marginLeft: 8, verticalAlign: 'middle' }}>{unreadCount} unread</span>}</h1>
          <p className="main-content__subtitle">Stay up to date with your team activity and alerts.</p>
        </header>
        {unreadCount > 0 && (
          <button className="bm-btn-outline" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>



      <div className="bm-section">
        {/* Filter tabs */}
        <div className="notif-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`notif-filter-btn${filter === f ? ' notif-filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <ul className="notif-list">
          {visible.length === 0 && (
            <li className="notif-empty">No notifications here.</li>
          )}
          {visible.map((n) => {
            const meta = TYPE_META[n.type];
            return (
              <li key={n.id} className={`notif-item${n.unread ? ' notif-item--unread' : ''}`}>
                <div className="notif-item__avatar-wrap">
                  {n.avatar
                    ? <img src={n.avatar} alt="" className="notif-item__avatar" />
                    : <span className="notif-item__avatar-icon" style={{ background: meta.color, color: meta.text }}>{meta.icon}</span>
                  }
                  {n.unread && <span className="notif-item__dot" />}
                </div>
                <div className="notif-item__body">
                  <div className="notif-item__header">
                    <span className="notif-item__title">{n.title}</span>
                    <span className="notif-item__badge" style={{ background: meta.color, color: meta.text }}>{meta.label}</span>
                  </div>
                  <p className="notif-item__desc">{n.desc}</p>
                  <span className="notif-item__time">{n.time}</span>
                </div>
                {n.unread && (
                  <button className="notif-item__read-btn" onClick={() => markRead(n.id)}>Mark read</button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default Notifications;
