import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  MEETINGS_DATA,
  UPCOMING_MEETINGS,
  MEETING_MANAGER_OPTIONS,
  MEETING_PERIOD_OPTIONS,
  MEETING_TYPE_OPTIONS,
} from '../data/constants.js';
import AllMeetings from './AllMeetings.jsx';
import MoreMenu from './MoreMenu.jsx';
import AttendeesBuilder from './AttendeesBuilder.jsx';

const TYPE_COLORS = {
  Strategic: '#dbeafe',
  Technical: '#e0f2fe',
  Executive: '#ede9fe',
  Creative: '#fce7f3',
  Research: '#fef9c3',
  'HR Review': '#dcfce7',
  Culture: '#ffedd5',
};

const MANAGER_AVATARS = {
  'Max Maraston': 'https://i.pravatar.cc/48?img=3',
  'Sasha Glinsky': 'https://i.pravatar.cc/48?img=9',
  'Yana Snezin': 'https://i.pravatar.cc/48?img=20',
};

const ATTENDEE_AVATARS = {
  'David Chen': 'https://i.pravatar.cc/32?img=11',
  'Emma Wilson': 'https://i.pravatar.cc/32?img=5',
  'Michael Torres': 'https://i.pravatar.cc/32?img=15',
  'Sarah Johnson': 'https://i.pravatar.cc/32?img=25',
  'James Anderson': 'https://i.pravatar.cc/32?img=7',
  'Sasha Glinsky': 'https://i.pravatar.cc/32?img=9',
  'Yana Snezin': 'https://i.pravatar.cc/32?img=20',
  'Max Maraston': 'https://i.pravatar.cc/32?img=3',
};

function MeetingCard({ meeting, onSelect }) {
  const tagBg = TYPE_COLORS[meeting.type] || '#f1f5f9';
  const tagColor = {
    Strategic: '#1a3a8f', Technical: '#0369a1', Executive: '#7c3aed',
    Creative: '#db2777', Research: '#a16207', 'HR Review': '#16a34a', Culture: '#ea580c',
  }[meeting.type] || '#475569';

  return (
    <div className="mtg-card mtg-card--clickable" onClick={() => onSelect(meeting)}>
      <div className="mtg-card__top">
        <div className="mtg-card__title-row">
          <span className="mtg-card__title">{meeting.title}</span>
          <span className="mtg-card__type-badge" style={{ background: tagBg, color: tagColor }}>
            📈 {meeting.type}
          </span>
        </div>
        <span className={`mtg-card__status mtg-card__status--${meeting.status === 'Completed' ? 'done' : 'progress'}`}>
          {meeting.status === 'Completed' ? '✅' : '🔄'} {meeting.status}
        </span>
      </div>

      <div className="mtg-card__meta">
        <span>🗓 {meeting.date}</span>
        <span>🕐 {meeting.time}</span>
        <span>⏱ {meeting.duration}</span>
        <span>📍 {meeting.location}</span>
      </div>

      <div className="mtg-card__body">
        <p><strong>Purpose:</strong> {meeting.purpose}</p>
        <p><strong>Key Outcomes:</strong> {meeting.outcomes}</p>
      </div>

      <div className="mtg-card__attendees">
        <div className="mtg-card__attendees-header">
          <span className="mtg-card__attendees-label">👥 Attendees ({meeting.attendeeCount})</span>
        </div>
        <div className="mtg-card__attendee-list">
          {meeting.attendees.map((a) => (
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
          {meeting.extraAttendees > 0 && (
            <div className="mtg-attendee mtg-attendee--more-card">
              <span className="mtg-attendee__more">+{meeting.extraAttendees} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ORGANIZER_AVATARS = {
  'Max M.': 'https://i.pravatar.cc/32?img=3',
  'Sasha G.': 'https://i.pravatar.cc/32?img=9',
  'Yana S.': 'https://i.pravatar.cc/32?img=20',
};

const ATTENDEE_STACK = {
  'u1': ['https://i.pravatar.cc/28?img=11', 'https://i.pravatar.cc/28?img=5', 'https://i.pravatar.cc/28?img=15'],
  'u2': ['https://i.pravatar.cc/28?img=7', 'https://i.pravatar.cc/28?img=25'],
  'u3': ['https://i.pravatar.cc/28?img=3', 'https://i.pravatar.cc/28?img=9', 'https://i.pravatar.cc/28?img=20'],
};

const BAR_DATA = [
  { name: 'Max Maraston', meetings: 8 },
  { name: 'Sasha Glinsky', meetings: 5 },
  { name: 'Yana Snezin', meetings: 4 },
];

const PIE_DATA = [
  { name: 'Strategic', value: 36.4 },
  { name: 'Technical', value: 22.7 },
  { name: 'Creative', value: 18.2 },
  { name: 'HR Review', value: 13.6 },
  { name: 'Executive', value: 9.1 },
];

const PIE_COLORS = ['#1a3a8f', '#4a90d9', '#f97316', '#22c55e', '#ec4899'];

function Meetings({ onNavChange }) {
  const [selectedManager, setSelectedManager] = useState('All Managers');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [viewAllManager, setViewAllManager] = useState(null);
  const [form, setForm] = useState({
    title: '', manager: '', date: '', startTime: '', endTime: '', duration: '',
    type: '', location: '', purpose: '', status: 'Upcoming', outcomes: '',
  });
  const [meetingAttendees, setMeetingAttendees] = useState([]);
  const [agendaPoints, setAgendaPoints] = useState([{ title: '', desc: '' }]);
  const handleFormChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleClose = () => { setShowSchedule(false); setAgendaPoints([{ title: '', desc: '' }]); setMeetingAttendees([]); };

  function handleAgendaChange(i, field, value) {
    setAgendaPoints((pts) => pts.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  }
  function addAgendaPoint() { setAgendaPoints((pts) => [...pts, { title: '', desc: '' }]); }
  function removeAgendaPoint(i) { setAgendaPoints((pts) => pts.filter((_, idx) => idx !== i)); }

  const visibleGroups = MEETINGS_DATA.filter((g) =>
    selectedManager === 'All Managers' || g.manager === selectedManager
  );

  if (viewAllManager !== null) {
    return <AllMeetings managerName={viewAllManager} onBack={() => setViewAllManager(null)} />;
  }

  return (
    <main className="main-content">
      {/* Header + Filters row */}
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Meeting Management</h1>
          <p className="main-content__subtitle">
            Track meetings conducted by management with detailed attendee information and outcomes.
          </p>
        </header>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
            {MEETING_MANAGER_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            {MEETING_PERIOD_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button type="button" className="bm-add-btn" onClick={() => setShowSchedule(true)}>+ Schedule Meeting</button>
        </div>
      </div>

      {/* Stats */}
      <div className="main-content__row">
        <div className="stats-card mtg-stat-card">
          <div className="mtg-stat-card__top">
            <div className="stats-label">Total Meetings</div>
            <span className="at-stat-icon at-stat-icon--blue">📅</span>
          </div>
          <div className="stats-value">47</div>
        </div>
        <div className="stats-card mtg-stat-card">
          <div className="mtg-stat-card__top">
            <div className="stats-label">Avg. Attendees</div>
            <span className="at-stat-icon at-stat-icon--purple">👥</span>
          </div>
          <div className="stats-value">6.4</div>
          <div className="stats-supplementary">per meeting</div>
        </div>
        <div className="stats-card mtg-stat-card">
          <div className="mtg-stat-card__top">
            <div className="stats-label">Upcoming</div>
            <span className="at-stat-icon at-stat-icon--green">🔔</span>
          </div>
          <div className="stats-value">12</div>
          <div className="stats-supplementary">next 7 days</div>
        </div>
        <div className="stats-card mtg-stat-card">
          <div className="mtg-stat-card__top">
            <div className="stats-label">Avg. Duration</div>
            <span className="at-stat-icon at-stat-icon--orange">⏱</span>
          </div>
          <div className="stats-value">52min</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="main-content__row" style={{ marginBottom: 20 }}>
        {/* Bar chart */}
        <div className="bm-section" style={{ flex: 1.4, marginBottom: 0 }}>
          <div className="bm-section__header">
            <div>
              <h2>Meetings by Manager</h2>
              <p className="bm-section__subtitle">Distribution across management team</p>
            </div>
            <button type="button" className="bm-btn-outline">📤 Export</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BAR_DATA} margin={{ top: 16, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} label={{ value: 'Number of Meetings', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 10, fill: '#94a3b8' } }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="meetings" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 11, fill: '#64748b' }}>
                {BAR_DATA.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#1a3a8f' : '#4a90d9'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bm-section" style={{ marginBottom: 0 }}>
          <div className="bm-section__header">
            <h2>Meeting Types</h2>
            <button type="button" className="bm-btn-outline">📤 Export</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={0} outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false} fontSize={10}>
                {PIE_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Manager meeting groups */}
      {visibleGroups.map((group) => (
        <div key={group.id} className="mtg-group">
          <div className="mtg-group__header">
            <img
              src={MANAGER_AVATARS[group.manager] || `https://i.pravatar.cc/48?u=${group.manager}`}
              alt={group.manager}
              className="mtg-group__avatar-img"
            />
            <div>
              <span className="mtg-group__name">{group.manager}</span>
              <span className="mtg-group__meta">
                {group.managerRole} • {group.meetingCount} meetings conducted
              </span>
            </div>
            <button type="button" className="bm-btn-outline mtg-group__filter" onClick={() => setViewAllManager(group.manager)}>View All</button>
            <MoreMenu />
          </div>
          <div className="mtg-cards">
            {group.meetings.map((m) => <MeetingCard key={m.id} meeting={m} onSelect={setSelectedMeeting} />)}
          </div>
        </div>
      ))}

      {/* Upcoming meetings table */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Upcoming Meetings</h2>
            <p className="bm-section__subtitle">Scheduled for the next 7 days</p>
          </div>
          <MoreMenu />
        </div>
        <table className="bm-table">
          <thead>
            <tr>
              <th>Meeting Title</th>
              <th>Organized By</th>
              <th>Date &amp; Time</th>
              <th>Attendees</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {UPCOMING_MEETINGS.map((m) => {
              const stack = ATTENDEE_STACK[m.id] || [];
              const extra = m.attendees - stack.length;
              const isVirtual = m.location === 'Virtual';
              return (
                <tr key={m.id} className="mtg-table-row--clickable" onClick={() => setSelectedMeeting(m)}>
                  <td>
                    <div className="bm-member-name">{m.title}</div>
                    <div className="bm-member-email">{m.type}</div>
                  </td>
                  <td>
                    <div className="bm-chair-cell">
                      <img src={ORGANIZER_AVATARS[m.organizer]} alt={m.organizer} className="bm-chair-avatar" />
                      <span>{m.organizer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bm-member-name">{m.date}</div>
                    <div className="bm-member-email">{m.time}</div>
                  </td>
                  <td>
                    <div className="mtg-avatar-stack">
                      {stack.map((src, i) => (
                        <img key={i} src={src} alt="" className="mtg-avatar-stack__img" style={{ zIndex: stack.length - i }} />
                      ))}
                      {extra > 0 && <span className="mtg-avatar-stack__extra">+{extra}</span>}
                    </div>
                  </td>
                  <td>
                    <span className="mtg-location">
                      {isVirtual ? '🖥' : '📍'} {m.location}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="mtg-action-btn mtg-action-btn--join" onClick={(e) => { e.stopPropagation(); }}>
                      🔗 Join
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Meeting Detail Side Drawer */}
      {selectedMeeting && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedMeeting(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div>
                <span className="side-drawer__type">{selectedMeeting.type}</span>
                <h2 className="side-drawer__title">{selectedMeeting.title}</h2>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedMeeting(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field">
                <label className="overlay-label">Title</label>
                <input className="overlay-input" defaultValue={selectedMeeting.title} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <input className="overlay-input" defaultValue={selectedMeeting.type} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" defaultValue={selectedMeeting.date} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Time</label>
                <input className="overlay-input" defaultValue={selectedMeeting.time} readOnly />
              </div>
              {selectedMeeting.duration && (
                <div className="overlay-field">
                  <label className="overlay-label">Duration</label>
                  <input className="overlay-input" defaultValue={selectedMeeting.duration} readOnly />
                </div>
              )}
              <div className="overlay-field">
                <label className="overlay-label">Location</label>
                <input className="overlay-input" defaultValue={selectedMeeting.location} readOnly />
              </div>
              {selectedMeeting.organizer && (
                <div className="overlay-field">
                  <label className="overlay-label">Organizer</label>
                  <input className="overlay-input" defaultValue={selectedMeeting.organizer} readOnly />
                </div>
              )}
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" defaultValue={selectedMeeting.status} disabled>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Upcoming</option>
                </select>
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedMeeting.description || selectedMeeting.purpose} readOnly rows={2} />
              </div>
              {selectedMeeting.outcomes && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Key Outcomes</label>
                  <textarea className="overlay-input overlay-textarea" defaultValue={selectedMeeting.outcomes} readOnly rows={2} />
                </div>
              )}
              {Array.isArray(selectedMeeting.attendees) && selectedMeeting.attendees.length > 0 && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Attendees</label>
                  <div className="drawer-attendees-list">
                    {selectedMeeting.attendees.map((a, i) => (
                      <div key={i} className="drawer-attendee-chip">
                        <img
                          src={ATTENDEE_AVATARS[a.name] || `https://i.pravatar.cc/32?u=${a.name}`}
                          alt={a.name}
                          className="drawer-attendee-chip__avatar"
                        />
                        <div className="drawer-attendee-chip__info">
                          <span className="drawer-attendee-chip__name">{a.name}</span>
                          <span className="drawer-attendee-chip__role">{a.role}</span>
                        </div>
                      </div>
                    ))}
                    {selectedMeeting.extraAttendees > 0 && (
                      <div className="drawer-attendee-chip drawer-attendee-chip--more">
                        <span className="drawer-attendee-chip__more">+{selectedMeeting.extraAttendees} more</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {Array.isArray(selectedMeeting.agenda) && selectedMeeting.agenda.length > 0 && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Agenda Points</label>
                  <div className="drawer-agenda-list">
                    {selectedMeeting.agenda.map((item, i) => (
                      <div key={i} className="drawer-agenda-item">
                        <span className="drawer-agenda-item__num">{i + 1}</span>
                        <div className="drawer-agenda-item__body">
                          <span className="drawer-agenda-item__title">{item.title || item}</span>
                          {item.desc && <span className="drawer-agenda-item__desc">{item.desc}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="side-drawer__footer">
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedMeeting(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedMeeting(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}

      {/* Schedule Meeting Overlay */}
      {showSchedule && (
        <div className="overlay-backdrop" onClick={handleClose}>
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Schedule Meeting</h2>
                <p className="overlay-panel__subtitle">Set up a new meeting with your team</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleClose}>✕</button>
            </div>
            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Meeting Title</label>
                <input className="overlay-input" name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Q3 Product Roadmap Review" />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <select className="overlay-input" name="type" value={form.type} onChange={handleFormChange}>
                  <option value="">Select type</option>
                  {MEETING_TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" name="status" value={form.status || 'Upcoming'} onChange={handleFormChange}>
                  <option>Upcoming</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" name="date" type="date" value={form.date} onChange={handleFormChange} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Location</label>
                <input className="overlay-input" name="location" value={form.location} onChange={handleFormChange} placeholder="e.g. Conference Room A" />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Start Time</label>
                <input className="overlay-input" name="startTime" type="time" value={form.startTime} onChange={handleFormChange} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">End Time</label>
                <input className="overlay-input" name="endTime" type="time" value={form.endTime} onChange={handleFormChange} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Duration</label>
                <input className="overlay-input" name="duration" value={form.duration} onChange={handleFormChange} placeholder="e.g. 60 min" />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Organizer / Manager</label>
                <select className="overlay-input" name="manager" value={form.manager} onChange={handleFormChange}>
                  <option value="">Select manager</option>
                  {['Max Maraston', 'Sasha Glinsky', 'Yana Snezin'].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Attendees</label>
                <AttendeesBuilder attendees={meetingAttendees} onChange={setMeetingAttendees} showHeading={false} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" name="purpose" value={form.purpose} onChange={handleFormChange} placeholder="Describe the meeting purpose..." rows={2} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <textarea className="overlay-input overlay-textarea" name="outcomes" value={form.outcomes || ''} onChange={handleFormChange} placeholder="Summarise expected or actual outcomes..." rows={2} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Agenda Points</label>
                <div className="agenda-builder">
                  {agendaPoints.map((pt, i) => (
                    <div key={i} className="agenda-builder__item">
                      <span className="agenda-builder__num">{i + 1}</span>
                      <div className="agenda-builder__fields">
                        <input className="overlay-input" placeholder="Point title" value={pt.title} onChange={(e) => handleAgendaChange(i, 'title', e.target.value)} />
                        <input className="overlay-input agenda-builder__desc-input" placeholder="Short description (optional)" value={pt.desc} onChange={(e) => handleAgendaChange(i, 'desc', e.target.value)} />
                      </div>
                      {agendaPoints.length > 1 && (
                        <button type="button" className="agenda-builder__remove" onClick={() => removeAgendaPoint(i)}>✕</button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="agenda-builder__add" onClick={addAgendaPoint}>+ Add point</button>
                </div>
              </div>
              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={handleClose}>Cancel</button>
                <button type="submit" className="bm-add-btn">Schedule Meeting</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Meetings;
