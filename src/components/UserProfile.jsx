import React, { useState } from 'react';

const USER = {
  name: 'AmirBaqian',
  role: 'Product Manager',
  email: 'amir@managic.io',
  phone: '+1 (555) 987-6543',
  department: 'Product',
  location: 'San Francisco, CA',
  joined: 'Joined Mar 2021',
  avatar: 'https://i.pravatar.cc/96?img=12',
  bio: 'Experienced product manager focused on building data-driven management tools. Passionate about team performance, strategic planning, and cross-functional collaboration.',
  stats: [
    { label: 'Meetings This Month', value: 24 },
    { label: 'Tasks Assigned', value: 87 },
    { label: 'Team Members', value: 3 },
    { label: 'Interactions', value: 42 },
  ],
  recentActivity: [
    { action: 'Scheduled meeting', detail: 'Q3 Product Roadmap Review', time: '2h ago', type: 'meeting' },
    { action: 'Assigned task', detail: 'Dashboard widget redesign → Emma Wilson', time: '4h ago', type: 'task' },
    { action: 'Logged interaction', detail: 'Performance feedback with David Chen', time: '1d ago', type: 'interaction' },
    { action: 'Completed meeting', detail: 'Weekly Stakeholder Update', time: '2d ago', type: 'meeting' },
  ],
};

const ACTIVITY_COLORS = {
  meeting:     { bg: '#dbeafe', color: '#1a3a8f', icon: '📅' },
  task:        { bg: '#dcfce7', color: '#16a34a', icon: '✅' },
  interaction: { bg: '#ede9fe', color: '#7c3aed', icon: '💬' },
};

function UserProfile({ onClose }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: USER.name, email: USER.email, phone: USER.phone, role: USER.role, department: USER.department, location: USER.location, bio: USER.bio });

  return (
    <main className="main-content">
      {/* Header */}
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>My Profile</h1>
          <p className="main-content__subtitle">View and manage your personal account details.</p>
        </header>
        <div style={{ display: 'flex', gap: 8 }}>
          {editing
            ? <>
                <button className="bm-btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                <button className="bm-add-btn" onClick={() => setEditing(false)}>Save Changes</button>
              </>
            : <button className="bm-add-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          }
          <button className="bm-btn-outline" onClick={onClose}>← Back</button>
        </div>
      </div>

      {/* Profile card */}
      <div className="mp-header-card" style={{ marginTop: 16 }}>
        <div className="mp-avatar-wrap">
          <img src={USER.avatar} alt={USER.name} className="mp-avatar-img" style={{ width: 80, height: 80 }} />
          <span className="mp-avatar-status" title="Active" />
        </div>
        <div className="mp-header-info">
          <h1 className="mp-name">{form.name}</h1>
          <p className="mp-role">{form.role} • {form.department}</p>
          <div className="mp-meta">
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" stroke="#64748b" strokeWidth="1.5"/>
                <path d="M2.5 6l7.5 5 7.5-5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {form.email}
            </span>
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M6.5 3C6.5 3 5 3 4 4.5c-1 1.5-.5 4 2 6.5s5 3 6.5 2c1.5-1 1.5-2.5 1.5-2.5l-2.5-1.5-1 1s-1.5-.5-3-2-2-3-2-3l1-1L6.5 3z" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              {form.phone}
            </span>
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="#f97316" strokeWidth="1.5"/>
                <circle cx="10" cy="7" r="2" stroke="#f97316" strokeWidth="1.5"/>
              </svg>
              {form.location}
            </span>
            <span className="mp-meta-item" style={{ color: '#94a3b8', fontSize: 10 }}>{USER.joined}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="main-content__row">
        {USER.stats.map((s, i) => {
          const colors = ['blue', 'green', 'purple', 'orange'];
          return (
            <div key={s.label} className={`stats-card bm-stat-card bm-stat-card--${colors[i]}`}>
              <div className="bm-stat-card__body">
                <div className="stats-label">{s.label}</div>
                <div className="stats-value">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="main-content__row">
        {/* Edit / View details */}
        <div className="bm-section" style={{ flex: 1.2 }}>
          <div className="bm-section__header">
            <div>
              <h2>{editing ? 'Edit Profile' : 'Profile Details'}</h2>
              <p className="bm-section__subtitle">Personal and contact information</p>
            </div>
          </div>
          {editing ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Role', key: 'role' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone' },
                { label: 'Department', key: 'department' },
                { label: 'Location', key: 'location' },
              ].map(f => (
                <div key={f.key} className="overlay-field">
                  <label className="overlay-label">{f.label}</label>
                  <input className="overlay-input" type={f.type || 'text'} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div className="overlay-field" style={{ gridColumn: '1 / -1' }}>
                <label className="overlay-label">Bio</label>
                <textarea className="overlay-input overlay-textarea" rows={3} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
              {[
                { label: 'Full Name', value: form.name },
                { label: 'Role', value: form.role },
                { label: 'Email', value: form.email },
                { label: 'Phone', value: form.phone },
                { label: 'Department', value: form.department },
                { label: 'Location', value: form.location },
              ].map(f => (
                <div key={f.label} className="overlay-field">
                  <label className="overlay-label">{f.label}</label>
                  <input className="overlay-input" value={f.value} readOnly />
                </div>
              ))}
              <div className="overlay-field" style={{ gridColumn: '1 / -1' }}>
                <label className="overlay-label">Bio</label>
                <textarea className="overlay-input overlay-textarea" rows={3} value={form.bio} readOnly />
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bm-section">
          <div className="bm-section__header">
            <div>
              <h2>Recent Activity</h2>
              <p className="bm-section__subtitle">Your latest actions</p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {USER.recentActivity.map((a, i) => {
              const meta = ACTIVITY_COLORS[a.type];
              return (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: meta.bg, color: meta.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {meta.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{a.action}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{a.detail}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>{a.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
