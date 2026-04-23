import { useState } from 'react';
import PropTypes from 'prop-types';

const ATTENDEE_AVATARS = {
  'Max Maraston':   'https://i.pravatar.cc/32?img=3',
  'Sasha Glinsky':  'https://i.pravatar.cc/32?img=9',
  'Yana Snezin':    'https://i.pravatar.cc/32?img=20',
  'David Chen':     'https://i.pravatar.cc/32?img=11',
  'Emma Wilson':    'https://i.pravatar.cc/32?img=5',
  'Michael Torres': 'https://i.pravatar.cc/32?img=15',
  'James Anderson': 'https://i.pravatar.cc/32?img=7',
  'Sarah Johnson':  'https://i.pravatar.cc/32?img=25',
};

const PURPOSE_STYLES = {
  'Q3 Review':    { bg: '#ede9fe', color: '#7c3aed' },
  'Project Sync': { bg: '#fce7f3', color: '#db2777' },
  '1-on-1':       { bg: '#d1fae5', color: '#059669' },
};

const MANAGER_COLORS = [
  { bg: '#f97316', text: '#fff' },
  { bg: '#a855f7', text: '#fff' },
  { bg: '#ec4899', text: '#fff' },
];

function ManagerAvatar({ name, index }) {
  const initials = name.replace('.', '').split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = MANAGER_COLORS[index % MANAGER_COLORS.length];
  return (
    <span style={{
      width: 30, height: 30, borderRadius: '50%',
      background: color.bg, color: color.text,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </span>
  );
}

function MeetingOverview({ meetings, onViewAll }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="meeting-overview">
      <div className="meeting-overview__header">
        <h2>Meeting Overview</h2>
        <button className="meeting-overview__view-all-btn" onClick={onViewAll}>View All</button>
      </div>

      {meetings.length === 0 ? (
        <p className="meeting-overview__empty">No meetings available</p>
      ) : (
        <table className="meeting-overview__table">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Purpose</th>
              <th>Manager</th>
              <th>Outcomes</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, i) => {
              const purposeStyle = PURPOSE_STYLES[meeting.purpose] || { bg: '#e0f2fe', color: '#0284c7' };
              return (
                <tr key={meeting.id} className="mtg-table-row--clickable" onClick={() => setSelected(meeting)}>
                  <td>
                    <div className="mo-date">{meeting.date}</div>
                    <div className="mo-time">{meeting.time}</div>
                  </td>
                  <td>
                    <span className="mo-purpose-badge" style={{ background: purposeStyle.bg, color: purposeStyle.color }}>
                      {meeting.purpose}
                    </span>
                  </td>
                  <td>
                    <div className="mo-manager-cell">
                      <ManagerAvatar name={meeting.manager} index={i} />
                      <span className="mo-manager-name">{meeting.manager}</span>
                    </div>
                  </td>
                  <td className="mo-outcomes">{meeting.outcomes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Side Drawer */}
      {selected && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelected(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ManagerAvatar name={selected.manager} index={meetings.findIndex(m => m.id === selected.id)} />
                <div>
                  <span className="side-drawer__type">{selected.type || selected.purpose}</span>
                  <h2 className="side-drawer__title">{selected.title || selected.date}</h2>
                </div>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field">
                <label className="overlay-label">Title</label>
                <input className="overlay-input" defaultValue={selected.title || selected.purpose} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <input className="overlay-input" defaultValue={selected.type || selected.purpose} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" defaultValue={selected.date} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Time</label>
                <input className="overlay-input" defaultValue={selected.time} readOnly />
              </div>
              {selected.duration && (
                <div className="overlay-field">
                  <label className="overlay-label">Duration</label>
                  <input className="overlay-input" defaultValue={selected.duration} readOnly />
                </div>
              )}
              {selected.location && (
                <div className="overlay-field">
                  <label className="overlay-label">Location</label>
                  <input className="overlay-input" defaultValue={selected.location} readOnly />
                </div>
              )}
              {selected.status && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Status</label>
                  <select className="overlay-input" defaultValue={selected.status} disabled>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Upcoming</option>
                  </select>
                </div>
              )}
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selected.description} readOnly rows={3} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selected.outcomes} readOnly rows={2} />
              </div>
              {Array.isArray(selected.attendees) && selected.attendees.length > 0 && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Attendees</label>
                  <div className="drawer-attendees-list">
                    {selected.attendees.map((a, i) => (
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
                    {selected.extraAttendees > 0 && (
                      <div className="drawer-attendee-chip drawer-attendee-chip--more">
                        <span className="drawer-attendee-chip__more">+{selected.extraAttendees} more</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {Array.isArray(selected.agenda) && selected.agenda.length > 0 && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Agenda Points</label>
                  <div className="drawer-agenda-list">
                    {selected.agenda.map((item, i) => (
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
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelected(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

MeetingOverview.propTypes = {
  meetings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      purpose: PropTypes.string.isRequired,
      manager: PropTypes.string.isRequired,
      outcomes: PropTypes.string.isRequired,
    })
  ).isRequired,
  onViewAll: PropTypes.func,
};

export default MeetingOverview;
