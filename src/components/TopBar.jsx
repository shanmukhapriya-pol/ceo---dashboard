import React from 'react';

function TopBar({ onNavigate, activePage, unreadCount = 0 }) {
  return (
    <div className="topbar">
      <div className="topbar__search-wrap">
        <svg className="topbar__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2"/>
          <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input className="topbar__search" type="text" placeholder="Type to Search..." />
      </div>
      <div className="topbar__actions">
        <button
          className={`topbar__icon-btn${activePage === 'Notifications' ? ' topbar__icon-btn--active' : ''}`}
          aria-label="Notifications"
          onClick={() => onNavigate('Notifications')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {unreadCount > 0 && <span className="topbar__notif-dot" />}
        </button>
        <button
          className={`topbar__icon-btn${activePage === 'Settings' ? ' topbar__icon-btn--active' : ''}`}
          aria-label="Settings"
          onClick={() => onNavigate('Settings')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="2"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#64748b" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TopBar;
