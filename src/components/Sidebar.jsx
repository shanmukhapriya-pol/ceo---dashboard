import React from 'react';

const MEMBER_BADGES = {
  'Max Maraston': '2',
  'Yana Snezin': '1',
};

const MEMBER_COLORS = [
  { bg: '#e879f9', text: '#fff' },
  { bg: '#fb923c', text: '#fff' },
  { bg: '#a78bfa', text: '#fff' },
];

const IconPeople = () => (
  <svg width="17" height="15" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="5" r="4" fill="white"/>
    <path d="M1 19c0-4.418 3.582-7 8-7s8 2.582 8 7" fill="white"/>
    <circle cx="21" cy="5" r="3" fill="white" opacity="0.75"/>
    <path d="M17.5 19c0-3 1.5-5.5 3.5-6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
  </svg>
);

const IconCalendarCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="17" rx="2" fill="white"/>
    <rect x="3" y="4" width="18" height="6" rx="2" fill="white"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="8,14 11,17 16,12" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDashboard = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="white"/>
    <rect x="14" y="3" width="7" height="7" rx="1" fill="white"/>
    <rect x="3" y="14" width="7" height="7" rx="1" fill="white"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="white"/>
  </svg>
);

const IconInteractions = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
  </svg>
);

const IconTasks = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="white" opacity="0.2" stroke="white" strokeWidth="1.5"/>
    <line x1="7" y1="8" x2="17" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <polyline points="7,16 9,18 13,14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NAV_LINKS = [
  { name: 'Dashboard',    Icon: IconDashboard },
  { name: 'Board Members', Icon: IconPeople },
  { name: 'Meetings',      Icon: IconCalendarCheck },
  { name: 'Tasks',         Icon: IconTasks },
  { name: 'Interactions',  Icon: IconInteractions },
];

function MemberAvatar({ name, index }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = MEMBER_COLORS[index % MEMBER_COLORS.length];
  return (
    <span className="sidebar-member-avatar" style={{ background: color.bg, color: color.text }}>
      {initials}
    </span>
  );
}

function Sidebar({ members, activeNav, onNavChange, onManagerClick, activeManager, onProfileClick }) {
  return (
    <aside className="sidebar" data-testid="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => onNavChange('Dashboard')}>
        <span className="sidebar-logo-title">Management<br />Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {NAV_LINKS.map(({ name, badge, Icon }) => (
            <li key={name} className="sidebar-nav-item">
              <button
                className={`sidebar-nav-link${activeNav === name ? ' active' : ''}`}
                onClick={() => onNavChange(name)}
              >
                <span className="sidebar-nav-icon"><Icon /></span>
                <span className="sidebar-nav-label">{name}</span>
                {badge && <span className="sidebar-nav-badge">{badge}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Management Team */}
      <div className="sidebar-members">
        <div className="sidebar-members-header">
          <h3 className="sidebar-section-title">Management Team</h3>
        </div>
        <ul className="sidebar-members-list">
          {members.map((member, index) => (
            <li key={member.id} className="sidebar-member-item">
              <button
                className={`sidebar-member-btn${activeManager === member.name ? ' active' : ''}`}
                onClick={() => onManagerClick(member.name)}
              >
                <MemberAvatar name={member.name} index={index} />
                <span className="sidebar-member-name">{member.name}</span>
                {MEMBER_BADGES[member.name] && (
                  <span className="sidebar-member-badge">{MEMBER_BADGES[member.name]}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Account */}
      <div className="sidebar-account" onClick={onProfileClick} style={{ cursor: 'pointer' }} title="View Profile">
        <img
          src="https://i.pravatar.cc/96?img=12"
          alt="AmirBaqian"
          className="sidebar-account-avatar"
        />
        <div className="sidebar-account-info">
          <span className="sidebar-account-username">AmirBaqian</span>
          <span className="sidebar-account-role">Product Manager</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
