import { useState } from 'react';
import { MEETINGS_DATA } from '../data/constants.js';

const TYPE_COLORS = {
  Strategic: { bg: '#dbeafe', color: '#1a3a8f' },
  Technical:  { bg: '#e0f2fe', color: '#0369a1' },
  Executive:  { bg: '#ede9fe', color: '#7c3aed' },
  Creative:   { bg: '#fce7f3', color: '#db2777' },
  Research:   { bg: '#fef9c3', color: '#a16207' },
  'HR Review':{ bg: '#dcfce7', color: '#16a34a' },
  Culture:    { bg: '#ffedd5', color: '#ea580c' },
};

const MANAGER_AVATARS = {
  'Max Maraston':  'https://i.pravatar.cc/48?img=3',
  'Sasha Glinsky': 'https://i.pravatar.cc/48?img=9',
  'Yana Snezin':   'https://i.pravatar.cc/48?img=20',
};

const ATTENDEE_AVATARS = {
  'David Chen':    'https://i.pravatar.cc/32?img=11',
  'Emma Wilson':   'https://i.pravatar.cc/32?img=5',
  'Michael Torres':'https://i.pravatar.cc/32?img=15',
  'Sarah Johnson': 'https://i.pravatar.cc/32?img=25',
  'James Anderson':'https://i.pravatar.cc/32?img=7',
  'Sasha Glinsky': 'https://i.pravatar.cc/32?img=9',
  'Yana Snezin':   'https://i.pravatar.cc/32?img=20',
  'Max Maraston':  'https://i.pravatar.cc/32?img=3',
};

function AllMeetings({ managerName, onBack }) {
  const [filter, setFilter] = useState('All');

  // Collect all meetings, optionally filtered by manager
  const allMeetings = MEETINGS_DATA.flatMap((g) =>
    g.meetings.map((m) => ({ ...m, manager: g.manager, managerRole: g.managerRole }))
  ).filter((m) => !managerName || m.manager === managerName);

  const types = ['All', ...Array.from(new Set(allMeetings.map((m) => m.type)))];
  const visible = filter === 'All' ? allMeetings : allMeetings.filter((m) => m.type === filter);

  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <button type="button" className="all-mtg-back-btn" onClick={onBack}>← Back</button>
          <h1>{managerName ? `${managerName}'s Meetings` : 'All Meetings'}</h1>
          <p className="main-content__subtitle">
            {visible.length} meeting{visible.length !== 1 ? 's' : ''} conducted
          </p>
        </header>
      </div>

      {/* Type filter tabs */}
      <div className="notif-filters" style={{ marginBottom: 20 }}>
        {types.map((t) => (
          <button
            key={t}
            className={`notif-filter-btn${filter === t ? ' notif-filter-btn--active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Meeting cards */}
      <div className="all-mtg-grid">
        {visible.map((m) => {
          const tc = TYPE_COLORS[m.type] || { bg: '#f1f5f9', color: '#475569' };
          return (
            <div key={m.id} className="all-mtg-card">
              <div className="all-mtg-card__top">
                <div className="all-mtg-card__title-row">
                  <span className="all-mtg-card__title">{m.title}</span>
                  <span className="all-mtg-card__badge" style={{ background: tc.bg, color: tc.color }}>{m.type}</span>
                </div>
                <span className={`mtg-card__status mtg-card__status--${m.status === 'Completed' ? 'done' : 'progress'}`}>
                  {m.status === 'Completed' ? '✅' : '🔄'} {m.status}
                </span>
              </div>

              <div className="all-mtg-card__manager">
                <img
                  src={MANAGER_AVATARS[m.manager] || `https://i.pravatar.cc/28?u=${m.manager}`}
                  alt={m.manager}
                  className="all-mtg-card__manager-img"
                />
                <span className="all-mtg-card__manager-name">{m.manager}</span>
                <span className="all-mtg-card__manager-role">{m.managerRole}</span>
              </div>

              <div className="mtg-card__meta">
                <span>🗓 {m.date}</span>
                <span>🕐 {m.time}</span>
                <span>⏱ {m.duration}</span>
                <span>📍 {m.location}</span>
              </div>

              <div className="all-mtg-card__purpose">
                <p><strong>Purpose:</strong> {m.purpose}</p>
                <p><strong>Key Outcomes:</strong> {m.outcomes}</p>
              </div>

              <div className="all-mtg-card__attendees">
                {m.attendees.map((a) => (
                  <div key={a.name} className="mtg-attendee mtg-attendee--card">
                    <img
                      src={ATTENDEE_AVATARS[a.name] || `https://i.pravatar.cc/32?u=${a.name}`}
                      alt={a.name}
                      className="mtg-attendee__img"
                    />
                    <div className="mtg-attendee__info">
                      <span className="mtg-attendee__name">{a.name}</span>
                      <span className="mtg-attendee__role">{a.role}</span>
                    </div>
                  </div>
                ))}
                {m.extraAttendees > 0 && (
                  <div className="mtg-attendee mtg-attendee--more-card">
                    <span className="mtg-attendee__more">+{m.extraAttendees} more</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default AllMeetings;
