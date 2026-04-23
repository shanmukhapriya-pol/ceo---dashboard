import { useState } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { MANAGER_PROFILES, MEETING_TYPE_OPTIONS } from '../data/constants.js';
import MoreMenu from './MoreMenu.jsx';
import AttendeesBuilder from './AttendeesBuilder.jsx';

const STATUS_STYLE = {
  'In Progress':  { bg: '#dbeafe', color: '#1d4ed8' },
  'Completed':    { bg: '#dcfce7', color: '#16a34a' },
  'Overdue':      { bg: '#fee2e2', color: '#dc2626' },
  'Not Started':  { bg: '#f1f5f9', color: '#64748b' },
};

const ATTENDANCE_STYLE = {
  'Present': { bg: '#dcfce7', color: '#16a34a' },
  'Remote':  { bg: '#dbeafe', color: '#023e8a' },
};

function ManagerProfile({ managerName, onNavChange }) {
  const profile = MANAGER_PROFILES[managerName];
  const [taskFilter, setTaskFilter] = useState('All Status');
  const [attendancePeriod, setAttendancePeriod] = useState('Last 7 Days');
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    title: '', date: '', startTime: '', endTime: '', duration: '', type: '', location: '', purpose: '', outcomes: '', status: 'Upcoming',
  });
  const [meetingAttendees, setMeetingAttendees] = useState([]);
  const [agendaPoints, setAgendaPoints] = useState([{ title: '', desc: '' }]);
  const handleScheduleChange = (e) => setScheduleForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleScheduleClose = () => { setShowSchedule(false); setAgendaPoints([{ title: '', desc: '' }]); setMeetingAttendees([]); };
  const handleAgendaChange = (i, field, val) => setAgendaPoints(pts => pts.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  const addAgendaPoint = () => setAgendaPoints(pts => [...pts, { title: '', desc: '' }]);
  const removeAgendaPoint = (i) => setAgendaPoints(pts => pts.filter((_, idx) => idx !== i));

  if (!profile) {
    return (
      <main className="main-content">
        <p style={{ color: '#94a3b8', marginTop: 40, textAlign: 'center' }}>
          Profile not available for {managerName}.
        </p>
      </main>
    );
  }

  const taskStatuses = ['All Status', 'In Progress', 'Completed', 'Overdue'];
  const filteredTasks = profile.assignedTasks.filter(
    (t) => taskFilter === 'All Status' || t.status === taskFilter
  );

  return (
    <main className="main-content">
      {/* Profile header card */}
      <div className="mp-header-card">
        <div className="mp-avatar-wrap">
          {profile.avatar
            ? <img src={profile.avatar} alt={profile.name} className="mp-avatar-img" />
            : <div className="mp-avatar">{profile.name.charAt(0)}</div>
          }
          <span className="mp-avatar-status" title="Active" />
        </div>
        <div className="mp-header-info">
          <h1 className="mp-name">{profile.name}</h1>
          <p className="mp-role">{profile.role} • {profile.department}</p>
          <div className="mp-meta">
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
                <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" stroke="#64748b" strokeWidth="1.5"/>
                <path d="M2.5 6l7.5 5 7.5-5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {profile.email}
            </span>
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
                <path d="M6.5 3C6.5 3 5 3 4 4.5c-1 1.5-.5 4 2 6.5s5 3 6.5 2c1.5-1 1.5-2.5 1.5-2.5l-2.5-1.5-1 1s-1.5-.5-3-2-2-3-2-3l1-1L6.5 3z" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              {profile.phone}
            </span>
            <span className="mp-meta-item">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="#f97316" strokeWidth="1.5"/>
                <path d="M3 8h14" stroke="#f97316" strokeWidth="1.5"/>
                <path d="M7 2v3M13 2v3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {profile.joined}
            </span>
          </div>
        </div>
        <div className="mp-header-actions">
          <button type="button" className="bm-add-btn mp-schedule-btn" onClick={() => setShowSchedule(true)}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
              <rect x="3" y="4" width="14" height="13" rx="2" stroke="#fff" strokeWidth="1.5"/>
              <path d="M3 8h14" stroke="#fff" strokeWidth="1.5"/>
              <path d="M7 2v3M13 2v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Schedule Meeting
          </button>
          <button type="button" className="bm-btn-outline mp-msg-btn">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
              <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Message
          </button>
          <button type="button" className="bm-btn-outline mp-more-btn"><MoreMenu /></button>
        </div>
      </div>

      {/* Stats */}
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Tasks Assigned</div>
            <div className="stats-value">{profile.stats.tasksAssigned}</div>
            <div className="stats-supplementary">This month</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">📋</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Completion Rate</div>
            <div className="stats-value">{profile.stats.completionRate}</div>
            <div className="stats-supplementary">Avg. rate</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">✅</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Meetings Conducted</div>
            <div className="stats-value">{profile.stats.meetingsConducted}</div>
            <div className="stats-supplementary">This week</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📅</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Employee Interactions</div>
            <div className="stats-value">{profile.stats.employeeInteractions}</div>
            <div className="stats-supplementary">This week</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">💬</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="main-content__row">
        {/* Pie — Task Status Distribution */}
        <div className="bm-section bm-section--card">
          <div className="bm-interactions-header">
            <div>
              <h2 className="bm-interactions-title">Task Status Distribution</h2>
              <p className="bm-section__subtitle">Current task breakdown</p>
            </div>
            <button type="button" className="bm-btn-outline">📤 Export</button>
          </div>
          {(() => {
            const pieData = [
              { name: 'In Progress', value: profile.assignedTasks.filter(t => t.status === 'In Progress').length,  color: '#3b82f6' },
              { name: 'Completed',   value: profile.assignedTasks.filter(t => t.status === 'Completed').length,    color: '#22c55e' },
              { name: 'Overdue',     value: profile.assignedTasks.filter(t => t.status === 'Overdue').length,      color: '#ef4444' },
              { name: 'Not Started', value: profile.assignedTasks.filter(t => t.status === 'Not Started').length,  color: '#64748b' },
            ].filter(d => d.value > 0);
            const total = pieData.reduce((s, d) => s + d.value, 0);
            return (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={70}
                    dataKey="value"
                    label={({ cx, cy, midAngle, outerRadius, name, value }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 36;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const pct = ((value / total) * 100).toFixed(1) + '%';
                      const anchor = x > cx ? 'start' : 'end';
                      return (
                        <text textAnchor={anchor} dominantBaseline="central" fontSize={10} fill="#475569">
                          <tspan x={x} y={y} dy="-0.6em">{name}</tspan>
                          <tspan x={x} y={y} dy="0.8em" fontWeight={700} fill="#1e293b">{pct}</tspan>
                        </text>
                      );
                    }}
                    labelLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} tasks (${((value / total) * 100).toFixed(1)}%)`, name]}
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            );
          })()}
        </div>

        {/* Bar — Weekly Activity Overview */}
        <div className="bm-section bm-section--card">
          <div className="bm-interactions-header">
            <div>
              <h2 className="bm-interactions-title">Weekly Activity Overview</h2>
              <p className="bm-section__subtitle">Tasks assigned per day</p>
            </div>
            <button type="button" className="bm-btn-outline">📤 Export</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={[
                { day: 'Mon', tasks: 5 },
                { day: 'Tue', tasks: 8 },
                { day: 'Wed', tasks: 3 },
                { day: 'Thu', tasks: 6 },
                { day: 'Fri', tasks: 7 },
                { day: 'Sat', tasks: 2 },
                { day: 'Sun', tasks: 3 },
              ]}
              margin={{ top: 16, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="tasks" name="Tasks Assigned" fill="#3b82f6" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#475569' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance log */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Office Attendance &amp; Activity Log</h2>
            <p className="bm-section__subtitle">Days present and activities performed</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="mp-period-select-wrap">
              <select
                className="mp-period-select"
                value={attendancePeriod}
                onChange={(e) => setAttendancePeriod(e.target.value)}
              >
                {['Last 7 Days', 'Last 30 Days', 'This Quarter'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <MoreMenu />
          </div>
        </div>
        <div className="mp-attendance-grid">
          {profile.attendanceLogs.map((log) => {
            const s = ATTENDANCE_STYLE[log.status] || ATTENDANCE_STYLE['Present'];
            const isRemote = log.status === 'Remote';
            return (
              <div key={log.id} className="mp-attendance-card">
                <div className="mp-attendance-card__header">
                  <div>
                    <div className="mp-attendance-card__day">{log.day}</div>
                    <div className="mp-attendance-card__hours">{log.hours}</div>
                  </div>
                  <span className="mp-attendance-card__badge" style={{ background: s.bg, color: s.color }}>
                    {isRemote
                      ? <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}><rect x="2" y="5" width="16" height="11" rx="2" stroke={s.color} strokeWidth="1.5"/><path d="M7 16l1.5-3h3L13 16" stroke={s.color} strokeWidth="1.5" strokeLinecap="round"/><path d="M5 19h10" stroke={s.color} strokeWidth="1.5" strokeLinecap="round"/></svg>
                      : <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
                    }
                    {log.status}
                  </span>
                </div>
                <ul className="mp-attendance-card__list">
                  {log.activities.map((a, i) => (
                    <li key={i} className="mp-attendance-card__item">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{flexShrink:0, marginTop:1}}>
                        <circle cx="10" cy="10" r="8" fill={isRemote ? '#dbeafe' : '#dcfce7'}/>
                        <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke={isRemote ? '#2563eb' : '#16a34a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tasks table */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Tasks Assigned by {profile.name}</h2>
            <p className="bm-section__subtitle">Complete task assignment overview with progress tracking</p>
          </div>
          <div className="mp-period-select-wrap">
            <select
              className="mp-period-select"
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
            >
              {taskStatuses.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <table className="bm-table mp-task-table">
          <thead>
            <tr>
              <th>Task Description</th>
              <th>Assigned To</th>
              <th>Assigned Date</th>
              <th>Deadline</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t) => {
              const s = STATUS_STYLE[t.status] || STATUS_STYLE['Not Started'];
              const barColor = t.status === 'Completed' ? '#22c55e'
                : t.status === 'Overdue' ? '#ef4444'
                : t.status === 'In Progress' ? '#3b82f6'
                : '#cbd5e1';
              const deadlineColor = t.status === 'Overdue' ? '#ef4444' : '#334155';
              const statusIcon = t.status === 'Completed' ? '✅'
                : t.status === 'Overdue' ? '⚠'
                : t.status === 'In Progress' ? '🔄'
                : '⏸';
              return (
                <tr key={t.id}>
                  <td>
                    <div className="bm-member-name" style={{ fontSize: 12 }}>{t.description}</div>
                    <div className="bm-member-email">{t.category}</div>
                  </td>
                  <td>
                    <div className="bm-chair-cell">
                      <div className="mp-task-avatar">{t.assignee.charAt(0)}</div>
                      <div>
                        <div className="bm-member-name">{t.assignee}</div>
                        <div className="bm-member-email">{t.assigneeRole}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#475569', fontSize: 11 }}>{t.assignedDate}</td>
                  <td style={{ color: deadlineColor, fontSize: 11, fontWeight: t.status === 'Overdue' ? 600 : 400 }}>{t.deadline}</td>
                  <td>
                    <div className="bm-progress-cell">
                      <div className="bm-progress">
                        <div className="bm-progress__bar" style={{ width: `${t.progress}%`, background: barColor }} />
                      </div>
                      <span className="bm-progress__label">{t.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="bm-badge" style={{ background: s.bg, color: s.color, gap: 5 }}>
                      <span style={{ fontSize: 11 }}>{statusIcon}</span> {t.status}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="mp-view-btn" onClick={() => setSelectedTask(t)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Employee interactions */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Employee Interactions &amp; Feedback</h2>
            <p className="bm-section__subtitle">Employees who received inputs and instructions</p>
          </div>
          <MoreMenu />
        </div>
        <div className="mp-emp-grid">
          {profile.interactions.map((emp, i) => {
            const RING_COLORS = ['#6366f1', '#a855f7', '#22c55e'];
            const ring = RING_COLORS[i % RING_COLORS.length];
            return (
              <div key={emp.id} className="mp-emp-card">
                <div className="mp-emp-card__header">
                  <div className="mp-emp-avatar-wrap" style={{ '--ring': ring }}>
                    <div className="mp-emp-avatar">{emp.name.charAt(0)}</div>
                  </div>
                  <div>
                    <div className="bm-member-name" style={{ fontSize: 13 }}>{emp.name}</div>
                    <div className="bm-member-email">{emp.role}</div>
                    <div className="bm-member-email">Last interaction: {emp.lastInteraction}</div>
                  </div>
                </div>
                <p className="mp-emp-card__label">Recent Inputs:</p>
                <div className="mp-emp-card__quote">"{emp.recentInput}"</div>
                <div className="mp-emp-card__footer">
                  <span style={{ fontSize: 11, color: '#475569' }}>{emp.tasksAssigned} tasks assigned</span>
                  <button type="button" className="mp-view-btn">View History</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent meetings */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Recent Meetings Summary</h2>
            <p className="bm-section__subtitle">Meetings conducted with outcomes</p>
          </div>
          <button type="button" className="mp-view-all-btn" onClick={() => onNavChange('Meetings')}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
              <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="1.5"/>
              <path d="M10 6v4l2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            View All Meetings
          </button>
        </div>
        <div className="mp-meetings">
          {profile.recentMeetings.map((m) => (
            <div key={m.id} className="mp-meeting-card">
              <div className="mp-meeting-card__title">{m.title}</div>
              <div className="mp-meeting-card__meta">
                <span className="mp-meeting-card__meta-item">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="#94a3b8" strokeWidth="1.5"/>
                    <path d="M3 8h14" stroke="#94a3b8" strokeWidth="1.5"/>
                    <path d="M7 2v3M13 2v3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {m.date}
                </span>
                <span className="mp-meeting-card__meta-item">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="#94a3b8" strokeWidth="1.5"/>
                    <path d="M10 6v4l2.5 2.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {m.time}
                </span>
                <span className="mp-meeting-card__meta-item">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                    <path d="M13 11c2 .5 4 1.5 4 3v1H3v-1c0-1.5 2-2.5 4-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="10" cy="7" r="3" stroke="#94a3b8" strokeWidth="1.5"/>
                  </svg>
                  {m.attendees} attendees
                </span>
              </div>
              <p className="mp-meeting-card__outcome">
                <strong>Outcome:</strong> {m.outcome}
              </p>
              <div className="mp-meeting-card__avatars">
                {[...Array(Math.min(3, m.attendees - m.extraAttendees))].map((_, i) => (
                  <div key={i} className="mp-meeting-avatar" style={{ background: ['#dbeafe','#dcfce7','#f3e8ff'][i], color: ['#1d4ed8','#16a34a','#7c3aed'][i], zIndex: 3 - i }}>
                    {['D','E','J'][i]}
                  </div>
                ))}
                {m.extraAttendees > 0 && (
                  <div className="mp-meeting-avatar mp-meeting-avatar--extra">+{m.extraAttendees}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Side Drawer */}
      {selectedTask && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedTask(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div>
                <span className="side-drawer__type">{selectedTask.category}</span>
                <h2 className="side-drawer__title">{selectedTask.description}</h2>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedTask(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Task Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedTask.description} readOnly rows={2} />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Category</label>
                <input className="overlay-input" defaultValue={selectedTask.category} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Assigned To</label>
                <input className="overlay-input" defaultValue={selectedTask.assignee} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Assignee Role</label>
                <input className="overlay-input" defaultValue={selectedTask.assigneeRole} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Assigned Date</label>
                <input className="overlay-input" defaultValue={selectedTask.assignedDate} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Deadline</label>
                <input className="overlay-input" defaultValue={selectedTask.deadline} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Progress</label>
                <input className="overlay-input" defaultValue={`${selectedTask.progress}%`} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" defaultValue={selectedTask.status} disabled>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                  <option>Not Started</option>
                </select>
              </div>
            </div>

            <div className="side-drawer__footer">
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedTask(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedTask(null)}>Close</button>
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
                <p className="overlay-panel__subtitle">Schedule a meeting with {profile.name}</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleScheduleClose}>✕</button>
            </div>
            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleScheduleClose(); }}>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Meeting Title</label>
                <input className="overlay-input" name="title" value={scheduleForm.title} onChange={handleScheduleChange} placeholder="e.g. 1-on-1 Review" />
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
                <select className="overlay-input" name="status" value={scheduleForm.status} onChange={handleScheduleChange}>
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
              <div className="overlay-field">
                <label className="overlay-label">Duration</label>
                <input className="overlay-input" name="duration" value={scheduleForm.duration} onChange={handleScheduleChange} placeholder="e.g. 60 min" />
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
                <textarea className="overlay-input overlay-textarea" name="outcomes" value={scheduleForm.outcomes} onChange={handleScheduleChange} placeholder="Summarise expected or actual outcomes..." rows={2} />
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

export default ManagerProfile;
