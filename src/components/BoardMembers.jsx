import { useState } from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  BOARD_MEMBERS,
  BOARD_INTERACTIONS,
  PROGRESS_COLORS,
  DEPARTMENT_OPTIONS,
} from '../data/constants.js';
import MoreMenu from './MoreMenu.jsx';

const TIMELINE_DATA = [
  { day: 'Mon', tasks: 4, interactions: 3 },
  { day: 'Tue', tasks: 6, interactions: 5 },
  { day: 'Wed', tasks: 5, interactions: 4 },
  { day: 'Thu', tasks: 8, interactions: 6 },
  { day: 'Fri', tasks: 7, interactions: 5 },
  { day: 'Sat', tasks: 2, interactions: 1 },
  { day: 'Sun', tasks: 1, interactions: 0 },
];

function BoardMembers({ onNavChange }) {
  const [selectedCommittee, setSelectedCommittee] = useState('All Departments');
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', role: '', status: 'Active', notes: '' });

  const handleFormChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleClose = () => setShowAddMember(false);

  const [showAllMembers, setShowAllMembers] = useState(false);

  const filtered = showAllMembers
    ? BOARD_MEMBERS
    : BOARD_MEMBERS.filter((m) => selectedCommittee === 'All Departments' || m.department === selectedCommittee);

  return (
    <main className="main-content">
      {/* Header + Filters row */}
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Board Member Management</h1>
          <p className="main-content__subtitle">
            Monitor board member activities, task assignments, and performance metrics.
          </p>
        </header>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <select value={selectedCommittee} onChange={(e) => setSelectedCommittee(e.target.value)}>
            {DEPARTMENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button type="button" className="bm-add-btn" onClick={() => setShowAddMember(true)}>+ Add Member</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Members</div>
            <div className="stats-value">12</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">👥</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Active Tasks</div>
            <div className="stats-value">48</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">☰</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Interactions</div>
            <div className="stats-value">156</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">💬</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Meetings</div>
            <div className="stats-value">24</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">📅</div>
        </div>
      </div>

      {/* Directory table */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Board Member Directory</h2>
            <p className="bm-section__subtitle">Complete list with task assignments and interactions</p>
          </div>
          <div className="bm-section__actions">
            <button type="button" className="bm-btn-outline" onClick={() => setShowAllMembers((v) => !v)}>
              {showAllMembers ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>

        <table className="bm-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Department</th>
              <th>Active Tasks</th>
              <th>Completion Rate</th>
              <th>Last Interaction</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const barColor = PROGRESS_COLORS[m.id] || '#22c55e';
              return (
                <tr key={m.id} className="mtg-table-row--clickable" onClick={() => setSelectedMember(m)}>
                  <td>
                    <div className="bm-member-cell">
                      <img src={m.avatar} alt={m.name} className="bm-member-avatar" />
                      <div>
                        <span className="bm-member-name">{m.name}</span>
                        <span className="bm-member-email">{m.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="bm-badge bm-badge--committee">
                      {m.department}
                    </span>
                  </td>
                  <td>{m.activeTasks}</td>
                  <td>
                    <div className="bm-progress-cell">
                      <div className="bm-progress">
                        <div className="bm-progress__bar" style={{ width: `${m.completionRate}%`, background: barColor }} />
                      </div>
                      <span className="bm-progress__label">{m.completionRate}%</span>
                    </div>
                  </td>
                  <td>{m.lastInteraction}</td>
                  <td>
                    <span className="bm-badge bm-badge--active">
                      <span className="bm-badge__dot" />
                      {m.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom row */}
      <div className="main-content__row">
        {/* Recent Interactions */}
        <div className="bm-section bm-section--card">
          <div className="bm-interactions-header">
            <div>
              <h2 className="bm-interactions-title">Recent Board Member Interactions</h2>
              <p className="bm-section__subtitle">Manager feedback and inputs</p>
            </div>
            <button type="button" className="meeting-overview__view-all-btn" onClick={() => onNavChange('Interactions')}>View All</button>
          </div>
          <ul className="bm-interactions">
            {BOARD_INTERACTIONS.map((item) => (
              <li key={item.id} className="bm-interaction mtg-table-row--clickable" onClick={() => setSelectedInteraction(item)}>
                <div className="bm-interaction__avatar-initials">
                  {item.chair.charAt(0)}
                </div>
                <div className="bm-interaction__body">
                  <div className="bm-interaction__header">
                    <span className="bm-interaction__chair">{item.chair}</span>
                    <span className="bm-interaction__time">{item.timeAgo}</span>
                  </div>
                  <p className="bm-interaction__desc">
                    {item.descriptionParts[0]}
                    <span style={{ color: item.memberColor, fontWeight: 500 }}>{item.descriptionParts[1]}</span>
                  </p>
                  <div className="bm-interaction__tags">
                    <span
                      className="bm-badge"
                      style={{ background: item.typeBg, color: item.typeColor }}
                    >
                      {item.typeIcon} {item.type}
                    </span>
                    <span className="bm-badge bm-badge--plain">{item.department}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Task Progress Timeline */}
        <div className="bm-section bm-section--card">
          <div className="bm-interactions-header">
            <div>
              <h2 className="bm-interactions-title">Task Progress Timeline</h2>
              <p className="bm-section__subtitle">Board member task completion over time</p>
            </div>
            <button type="button" className="bm-btn-outline">📤 Export</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tasksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="tasks"
                name="Tasks Completed"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeDasharray="6 3"
                fill="url(#tasksGrad)"
                dot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="interactions"
                name="Interactions"
                stroke="#1a3a8f"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#1a3a8f', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interaction Detail Side Drawer */}
      {selectedInteraction && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedInteraction(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div>
                <span
                  className="side-drawer__type"
                  style={{ background: selectedInteraction.typeBg, color: selectedInteraction.typeColor }}
                >
                  {selectedInteraction.typeIcon} {selectedInteraction.type}
                </span>
                <h2 className="side-drawer__title">{selectedInteraction.chair}</h2>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedInteraction(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field">
                <label className="overlay-label">Manager</label>
                <input className="overlay-input" defaultValue={selectedInteraction.chair} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Department</label>
                <input className="overlay-input" defaultValue={selectedInteraction.department} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Time</label>
                <input className="overlay-input" defaultValue={selectedInteraction.timeAgo} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <input className="overlay-input" defaultValue={selectedInteraction.type} readOnly />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedInteraction.fullDescription} readOnly rows={3} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <div className="drawer-agenda-list">
                  {selectedInteraction.outcomes.map((o, i) => (
                    <div key={i} className="drawer-agenda-item">
                      <span className="drawer-agenda-item__num">{i + 1}</span>
                      <div className="drawer-agenda-item__body">
                        <span className="drawer-agenda-item__title">{o}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="side-drawer__footer">
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedInteraction(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedInteraction(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}

      {/* Member Detail Side Drawer */}
      {selectedMember && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedMember(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={selectedMember.avatar} alt={selectedMember.name} className="side-drawer__avatar" />
                <div>
                  <span className="side-drawer__type">{selectedMember.department}</span>
                  <h2 className="side-drawer__title">{selectedMember.name}</h2>
                </div>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedMember(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Full Name</label>
                <input className="overlay-input" defaultValue={selectedMember.name} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Email Address</label>
                <input className="overlay-input" defaultValue={selectedMember.email} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Phone Number</label>
                <input className="overlay-input" defaultValue={selectedMember.phone || '—'} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Department</label>
                <input className="overlay-input" defaultValue={selectedMember.department} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Role / Title</label>
                <input className="overlay-input" defaultValue={selectedMember.role || '—'} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Chair / Manager</label>
                <input className="overlay-input" defaultValue={selectedMember.chair} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" defaultValue={selectedMember.status} disabled>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Last Interaction</label>
                <input className="overlay-input" defaultValue={selectedMember.lastInteraction} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Active Tasks</label>
                <input className="overlay-input" defaultValue={selectedMember.activeTasks} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Completion Rate</label>
                <input className="overlay-input" defaultValue={`${selectedMember.completionRate}%`} readOnly />
              </div>
              {selectedMember.notes && (
                <div className="overlay-field overlay-field--full">
                  <label className="overlay-label">Notes</label>
                  <textarea className="overlay-input overlay-textarea" defaultValue={selectedMember.notes} readOnly rows={3} />
                </div>
              )}
            </div>

            <div className="side-drawer__footer">
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedMember(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedMember(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}

      {/* Add Member Overlay */}
      {showAddMember && (
        <div className="overlay-backdrop" onClick={handleClose}>
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Add Board Member</h2>
                <p className="overlay-panel__subtitle">Fill in the details to add a new member</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleClose}>✕</button>
            </div>

            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>

              {/* Photo upload */}
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Profile Photo</label>
                <label className="overlay-photo-upload">
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setForm((f) => ({ ...f, photoName: file.name }));
                  }} />
                  <div className="overlay-photo-preview">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#94a3b8" strokeWidth="1.5"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="overlay-photo-info">
                    <span className="overlay-photo-btn">Upload Photo</span>
                    <span className="overlay-photo-hint">{form.photoName || 'JPG, PNG up to 5MB'}</span>
                  </div>
                </label>
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Full Name</label>
                <input className="overlay-input" name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. David Chen" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Email Address</label>
                <input className="overlay-input" name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="e.g. david@company.com" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Phone Number</label>
                <input className="overlay-input" name="phone" value={form.phone || ''} onChange={handleFormChange} placeholder="e.g. +1 (555) 000-0000" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Department</label>
                <input className="overlay-input" name="department" value={form.department || ''} onChange={handleFormChange} placeholder="e.g. Engineering" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Role / Title</label>
                <input className="overlay-input" name="role" value={form.role || ''} onChange={handleFormChange} placeholder="e.g. Independent Director" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" name="status" value={form.status} onChange={handleFormChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Notes</label>
                <textarea className="overlay-input overlay-textarea" name="notes" value={form.notes || ''} onChange={handleFormChange} placeholder="Any additional notes..." rows={3} />
              </div>

              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={handleClose}>Cancel</button>
                <button type="submit" className="bm-add-btn">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default BoardMembers;
