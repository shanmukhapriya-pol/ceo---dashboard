import React, { useState } from 'react';
import { INITIAL_MEMBERS, MANAGER_OPTIONS, PERIOD_OPTIONS, UPCOMING_MEETINGS, INITIAL_MEETINGS, MEETING_TYPE_OPTIONS } from '../data/constants.js';
import TaskDistribution from './TaskDistribution.jsx';
import MeetingOverview from './MeetingOverview.jsx';
import MemberStatus from './MemberStatus.jsx';
import AttendeesBuilder from './AttendeesBuilder.jsx';

const MEMBER_AVATAR_COLORS = [
  { bg: '#f97316', text: '#fff' },
  { bg: '#a855f7', text: '#fff' },
  { bg: '#ec4899', text: '#fff' },
];

const TASK_AVATAR_COLORS = [
  { bg: '#f97316', text: '#fff' },
  { bg: '#22c55e', text: '#fff' },
  { bg: '#a855f7', text: '#fff' },
];

function Avatar({ name, index, size = 28, colors = MEMBER_AVATAR_COLORS }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = colors[index % colors.length];
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: color.bg, color: color.text,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </span>
  );
}

const ACTIVITY_LOG = [
  { id: 1, manager: 'Max Maraston', action: 'Assigned task', detail: 'Logo Design → David Chen', time: '2h ago', type: 'task' },
  { id: 2, manager: 'Sasha Glinsky', action: 'Completed meeting', detail: 'Design System Workshop', time: '4h ago', type: 'meeting' },
  { id: 3, manager: 'Yana Snezin', action: 'Updated task', detail: 'Branding guidelines review', time: '5h ago', type: 'task' },
  { id: 4, manager: 'Max Maraston', action: 'Scheduled meeting', detail: 'Q3 Roadmap Review', time: '1d ago', type: 'meeting' },
];

function ActivityTracking({ members = INITIAL_MEMBERS, onNavChange }) {
  const [manager, setManager] = useState('All Managers');
  const [period, setPeriod] = useState('This Week');
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedMtg, setSelectedMtg] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [moreFilters, setMoreFilters] = useState({ meetingType: 'All Types', status: 'All Statuses', location: 'All Locations' });
  const [scheduleForm, setScheduleForm] = useState({
    title: '', manager: '', date: '', startTime: '', endTime: '', type: '', location: '', purpose: '', outcomes: '', status: 'Upcoming',
  });
  const [meetingAttendees, setMeetingAttendees] = useState([]);
  const [agendaPoints, setAgendaPoints] = useState([{ title: '', desc: '' }]);
  const handleScheduleChange = (e) => setScheduleForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleScheduleClose = () => { setShowSchedule(false); setAgendaPoints([{ title: '', desc: '' }]); setMeetingAttendees([]); };
  const handleAgendaChange = (i, field, val) => setAgendaPoints(pts => pts.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  const addAgendaPoint = () => setAgendaPoints(pts => [...pts, { title: '', desc: '' }]);
  const removeAgendaPoint = (i) => setAgendaPoints(pts => pts.filter((_, idx) => idx !== i));

  return (
    <main className="main-content" data-testid="activity-tracking">
      {/* Header row */}
      <div className="at-header-row">
        <div>
          <h1 className="main-content__header" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>
            Management Activity Tracking
          </h1>
          <p style={{ fontSize: 11, color: '#64748b' }}>Overview of team performance, meetings, and task progress.</p>
        </div>
        <div className="at-filters">
          <select className="at-select" value={manager} onChange={e => setManager(e.target.value)}>
            {MANAGER_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
          <select className="at-select" value={period} onChange={e => setPeriod(e.target.value)}>
            {PERIOD_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
          <button className={`at-filter-btn${showMoreFilters ? ' at-filter-btn--active' : ''}`} onClick={() => setShowMoreFilters(v => !v)}>▼ More Filters</button>
        </div>
      </div>

      {/* Inline More Filters panel */}
      {showMoreFilters && (
        <div className="at-more-filters-panel">
          <div className="at-more-filters-panel__item">
            <div className="at-more-filters-dropdown__label">Meeting Type</div>
            <select className="at-select" value={moreFilters.meetingType} onChange={e => setMoreFilters(f => ({ ...f, meetingType: e.target.value }))}>
              {['All Types', 'Strategic', 'Technical', 'Executive', 'Creative', 'Research', 'HR Review', 'Culture'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="at-more-filters-panel__item">
            <div className="at-more-filters-dropdown__label">Status</div>
            <select className="at-select" value={moreFilters.status} onChange={e => setMoreFilters(f => ({ ...f, status: e.target.value }))}>
              {['All Statuses', 'Upcoming', 'In Progress', 'Completed'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="at-more-filters-panel__item">
            <div className="at-more-filters-dropdown__label">Location</div>
            <select className="at-select" value={moreFilters.location} onChange={e => setMoreFilters(f => ({ ...f, location: e.target.value }))}>
              {['All Locations', 'Virtual', 'Room A', 'Room B', 'Off-site'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="at-more-filters-panel__actions">
            <button className="at-more-filters-dropdown__clear" onClick={() => { setMoreFilters({ meetingType: 'All Types', status: 'All Statuses', location: 'All Locations' }); setShowMoreFilters(false); }}>Clear</button>
            <button className="at-more-filters-dropdown__apply" onClick={() => setShowMoreFilters(false)}>Apply</button>
          </div>
        </div>
      )}
      {/* Stats row */}
      <div className="at-stats-row">
        <div className="at-stat-card">
          <div className="at-stat-card__top">
            <span className="at-stat-label">Meetings Conducted</span>
            <span className="at-stat-icon at-stat-icon--blue">📅</span>
          </div>
          <div className="at-stat-value">42</div>
          <div className="at-stat-attendees">
            <div className="at-avatar-stack">
              {members.slice(0, 3).map((m, i) => (
                <span key={m.id} className="at-avatar-stack__item">
                  <Avatar name={m.name} index={i} size={22} />
                </span>
              ))}
            </div>
            <span className="at-stat-extra">+18 attendees</span>
          </div>
        </div>
        <div className="at-stat-card">
          <div className="at-stat-card__top">
            <span className="at-stat-label">Members</span>
            <span className="at-stat-icon at-stat-icon--purple">👥</span>
          </div>
          <div className="at-stat-value">{members.length}</div>
          <div className="at-stat-sub">All online</div>
        </div>
        <div className="at-stat-card">
          <div className="at-stat-card__top">
            <span className="at-stat-label">Interactions</span>
            <span className="at-stat-icon at-stat-icon--green">💬</span>
          </div>
          <div className="at-stat-value">24</div>
          <div className="at-stat-sub">+5 this week</div>
        </div>
        <div className="at-stat-card">
          <div className="at-stat-card__top">
            <span className="at-stat-label">Tasks Assigned</span>
            <span className="at-stat-icon at-stat-icon--orange">✅</span>
          </div>
          <div className="at-stat-value">87</div>
          <div className="at-stat-sub">+12 this week</div>
        </div>
      </div>

      {/* Chart + Upcoming Meetings row */}
      <div className="at-main-row">
        {/* Task Distribution chart */}
        <div className="at-chart-card">
          <TaskDistribution tasks={[]} onAddTask={() => {}} />
        </div>

        {/* Upcoming Meetings panel — dark blue card style */}
        <div className="at-priority-card">
          <div className="at-priority-card__header">
            <span className="at-priority-title">Upcoming Meetings</span>
            <button className="at-new-task-btn" onClick={() => setShowSchedule(true)}>+ Add Meeting</button>
          </div>
          <ul className="at-priority-list">
            {(UPCOMING_MEETINGS || []).map((mtg, i) => (
              <li key={mtg.id} className="at-priority-item mtg-table-row--clickable" onClick={() => setSelectedMtg(mtg)}>
                <button className="at-priority-check" aria-label="Mark done" onClick={e => e.stopPropagation()}>
                  <span className="at-priority-check__circle" />
                </button>
                <Avatar name={mtg.organizer} index={i} size={32} colors={TASK_AVATAR_COLORS} />
                <div className="at-priority-info">
                  <div className="at-priority-category">{mtg.type}</div>
                  <div className="at-priority-desc">{mtg.title}</div>
                  <div className="at-priority-meta">{mtg.date} · {mtg.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Meeting Overview + Activity Log row */}
      <div className="at-bottom-row">
        <MeetingOverview meetings={INITIAL_MEETINGS} onViewAll={() => onNavChange('Meetings')} />
        <MemberStatus members={members} />
      </div>

      {/* Upcoming Meeting Detail Side Drawer */}
      {selectedMtg && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedMtg(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={selectedMtg.organizer} index={0} size={44} colors={TASK_AVATAR_COLORS} />
                <div>
                  <span className="side-drawer__type">{selectedMtg.type}</span>
                  <h2 className="side-drawer__title">{selectedMtg.title}</h2>
                </div>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedMtg(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field">
                <label className="overlay-label">Title</label>
                <input className="overlay-input" defaultValue={selectedMtg.title} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <input className="overlay-input" defaultValue={selectedMtg.type} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" defaultValue={selectedMtg.date} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Time</label>
                <input className="overlay-input" defaultValue={selectedMtg.time} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Location</label>
                <input className="overlay-input" defaultValue={selectedMtg.location} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Organizer</label>
                <input className="overlay-input" defaultValue={selectedMtg.organizer} readOnly />
              </div>
              {selectedMtg.status && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Status</label>
                  <select className="overlay-input" defaultValue={selectedMtg.status} disabled>
                    <option>Upcoming</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              )}
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedMtg.description} readOnly rows={3} />
              </div>
              {Array.isArray(selectedMtg.agenda) && selectedMtg.agenda.length > 0 && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Agenda Points</label>
                  <div className="drawer-agenda-list">
                    {selectedMtg.agenda.map((item, i) => (
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
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedMtg(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedMtg(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}

      {/* Schedule Meeting Overlay */}
      {showSchedule && (
        <div className="overlay-backdrop" onClick={handleScheduleClose}>
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Schedule Meeting</h2>
                <p className="overlay-panel__subtitle">Set up a new meeting with your team</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleScheduleClose}>✕</button>
            </div>
            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleScheduleClose(); }}>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Meeting Title</label>
                <input className="overlay-input" name="title" value={scheduleForm.title} onChange={handleScheduleChange} placeholder="e.g. Q3 Product Roadmap Review" />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <select className="overlay-input" name="type" value={scheduleForm.type} onChange={handleScheduleChange}>
                  <option value="">Select type</option>
                  {MEETING_TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" name="status" value={scheduleForm.status || 'Upcoming'} onChange={handleScheduleChange}>
                  <option>Upcoming</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" name="date" type="date" value={scheduleForm.date} onChange={handleScheduleChange} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Location</label>
                <input className="overlay-input" name="location" value={scheduleForm.location} onChange={handleScheduleChange} placeholder="e.g. Conference Room A" />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Start Time</label>
                <input className="overlay-input" name="startTime" type="time" value={scheduleForm.startTime} onChange={handleScheduleChange} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">End Time</label>
                <input className="overlay-input" name="endTime" type="time" value={scheduleForm.endTime} onChange={handleScheduleChange} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Organizer / Manager</label>
                <select className="overlay-input" name="manager" value={scheduleForm.manager} onChange={handleScheduleChange}>
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
                <textarea className="overlay-input overlay-textarea" name="purpose" value={scheduleForm.purpose} onChange={handleScheduleChange} placeholder="Describe the meeting purpose..." rows={2} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <textarea className="overlay-input overlay-textarea" name="outcomes" value={scheduleForm.outcomes || ''} onChange={handleScheduleChange} placeholder="Summarise expected or actual outcomes..." rows={2} />
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
                <button type="button" className="bm-btn-outline" onClick={handleScheduleClose}>Cancel</button>
                <button type="submit" className="bm-add-btn">Schedule Meeting</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default ActivityTracking;
