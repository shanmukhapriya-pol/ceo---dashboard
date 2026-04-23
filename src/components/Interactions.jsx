import React, { useState } from 'react';

const AVATAR_COLORS = [
  { bg: '#6366f1', text: '#fff' },
  { bg: '#f97316', text: '#fff' },
  { bg: '#a855f7', text: '#fff' },
  { bg: '#ec4899', text: '#fff' },
  { bg: '#22c55e', text: '#fff' },
  { bg: '#0ea5e9', text: '#fff' },
];

function Avatar({ name, index, size = 32 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: color.bg, color: color.text,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.34, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </span>
  );
}

const INTERACTIONS_TABLE = [
  {
    id: '1',
    manager: 'Max Maraston', managerRole: 'Operations',
    employee: 'David Chen', employeeRole: 'Developer',
    date: 'Apr 20, 2026', type: 'Verbal',
    topic: 'Performance feedback',
    feedback: 'Provided clear direction and next steps; alignment confirmed.',
    acknowledged: 'warning',
    followUp: 'Required',
    description: 'Max Maraston held a verbal performance feedback session with David Chen to review his recent contributions, address areas of improvement, and set clear expectations for the upcoming sprint. The session covered code quality standards, communication practices, and career growth opportunities.',
    outcomes: ['Alignment confirmed on performance expectations', 'Action plan created for skill improvement', 'Follow-up scheduled for next week'],
  },
  {
    id: '2',
    manager: 'Sasha Glinsky', managerRole: 'VP Design',
    employee: 'Emma Wilson', employeeRole: 'Designer',
    date: 'Apr 19, 2026', type: 'Written',
    topic: 'Task Assignment',
    feedback: 'Assigned new audit review tasks with clear deadlines and expectations.',
    acknowledged: 'done',
    followUp: 'None',
    description: 'Sasha Glinsky issued a written task assignment to Emma Wilson covering a series of design audit reviews. The tasks include evaluating current UI components against the design system, documenting inconsistencies, and proposing improvements with clear deadlines.',
    outcomes: ['5 audit tasks assigned with deadlines', 'Design system checklist provided', 'Deliverables due by end of month'],
  },
  {
    id: '3',
    manager: 'Yana Snezin', managerRole: 'VP HR',
    employee: 'Michael Torres', employeeRole: 'Marketing',
    date: 'Apr 18, 2026', type: 'Meeting',
    topic: 'Compensation review',
    feedback: 'Discussed executive compensation package and benefits alignment.',
    acknowledged: 'done',
    followUp: 'Scheduled',
    description: 'Yana Snezin conducted a formal compensation review meeting with Michael Torres to discuss his current package, market benchmarks, and proposed adjustments. The conversation included performance-based incentives, equity considerations, and long-term retention strategies.',
    outcomes: ['Current package reviewed against market data', 'Revised incentive structure proposed', 'Follow-up meeting scheduled with finance'],
  },
  {
    id: '4',
    manager: 'Max Maraston', managerRole: 'Operations',
    employee: 'James Anderson', employeeRole: 'Backend Dev',
    date: 'Apr 17, 2026', type: 'Verbal',
    topic: 'Sprint planning',
    feedback: 'Reviewed blockers and re-prioritized tasks for the current sprint.',
    acknowledged: 'warning',
    followUp: 'Required',
    description: 'Max Maraston met verbally with James Anderson to review current sprint blockers, re-prioritize the task backlog, and align on delivery timelines. Key technical dependencies were identified and escalation paths were discussed to ensure sprint goals are met.',
    outcomes: ['3 blockers identified and escalated', 'Task backlog re-prioritized', 'Sprint delivery timeline confirmed'],
  },
  {
    id: '5',
    manager: 'Sasha Glinsky', managerRole: 'VP Design',
    employee: 'Sarah Johnson', employeeRole: 'Sales',
    date: 'Apr 16, 2026', type: 'Written',
    topic: 'Design review',
    feedback: 'Provided detailed feedback on campaign assets and brand guidelines.',
    acknowledged: 'done',
    followUp: 'None',
    description: 'Sasha Glinsky provided written design review feedback to Sarah Johnson on the latest marketing campaign assets. The review covered brand consistency, typography usage, color palette adherence, and overall visual communication effectiveness.',
    outcomes: ['Feedback delivered on 8 campaign assets', 'Brand guideline violations flagged', 'Revised assets requested by Apr 20'],
  },
];

const TYPE_STYLES = {
  Verbal:  { bg: '#f1f5f9', color: '#475569', icon: '💬' },
  Written: { bg: '#dbeafe', color: '#1e3a8a', icon: '📝' },
  Meeting: { bg: '#dcfce7', color: '#16a34a', icon: '📅' },
};

const FOLLOW_UP_STYLES = {
  Required:  { bg: '#fef9c3', color: '#a16207' },
  Scheduled: { bg: '#dbeafe', color: '#1e3a8a' },
  None:      { bg: '#f1f5f9', color: '#94a3b8' },
};

const STAT_ICONS = [
  { icon: '💬', colorClass: 'at-stat-icon--blue' },
  { icon: '📋', colorClass: 'at-stat-icon--purple' },
  { icon: '🗣️', colorClass: 'at-stat-icon--green' },
  { icon: '✅', colorClass: 'at-stat-icon--orange' },
];

const MANAGER_FILTER_OPTIONS = ['All Managers', 'Max Maraston', 'Sasha Glinsky', 'Yana Snezin'];
const TYPE_FILTER_OPTIONS = ['All Types', 'Verbal', 'Written', 'Meeting'];

function Interactions() {
  const [selectedManager, setSelectedManager] = useState('All Managers');
  const [selectedType, setSelectedType] = useState('All Types');
  const [showAddInteraction, setShowAddInteraction] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [form, setForm] = useState({
    manager: '', employee: '', employeeRole: '', date: '', type: '',
    topic: '', feedback: '', acknowledged: 'done', followUp: 'None',
  });

  const handleFormChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleClose = () => setShowAddInteraction(false);

  const filtered = INTERACTIONS_TABLE.filter((row) => {
    const managerMatch = selectedManager === 'All Managers' || row.manager === selectedManager;
    const typeMatch = selectedType === 'All Types' || row.type === selectedType;
    return managerMatch && typeMatch;
  });

  const stats = [
    { label: 'Total Interactions', value: filtered.length, sub: 'This week' },
    { label: 'Reviews', value: filtered.filter(i => i.topic.toLowerCase().includes('review')).length, sub: 'Completed' },
    { label: 'Discussions', value: filtered.filter(i => i.type === 'Verbal' || i.type === 'Meeting').length, sub: 'Active' },
    { label: 'Task Assignments', value: filtered.filter(i => i.topic.toLowerCase().includes('task')).length, sub: 'Pending' },
  ];

  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Interactions</h1>
          <p className="main-content__subtitle">Track all manager and board member interactions.</p>
        </header>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
            {MANAGER_FILTER_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {TYPE_FILTER_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button type="button" className="bm-add-btn" onClick={() => setShowAddInteraction(true)}>+ Add Interaction</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="main-content__row" style={{ marginBottom: 20 }}>
        {stats.map((stat, i) => (
          <div key={stat.label} className="stats-card mtg-stat-card">
            <div className="mtg-stat-card__top">
              <div className="stats-label">{stat.label}</div>
              <span className={`at-stat-icon ${STAT_ICONS[i].colorClass}`}>{STAT_ICONS[i].icon}</span>
            </div>
            <div className="stats-value">{stat.value}</div>
            <div className="stats-supplementary">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Interactions table */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>Recent Interactions</h2>
            <p className="bm-section__subtitle">Latest activity across all managers</p>
          </div>
          <button className="bm-btn-outline">Export</button>
        </div>
        <table className="bm-table int-table">
          <thead>
            <tr>
              <th>Manager</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Type</th>
              <th>Topic</th>
              <th>Feedback / Instruction</th>
              <th>Acknowledged</th>
              <th>Follow-Up</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const typeStyle = TYPE_STYLES[row.type] || TYPE_STYLES.Verbal;
              const fuStyle = FOLLOW_UP_STYLES[row.followUp] || FOLLOW_UP_STYLES.None;
              return (
                <tr key={row.id} className="mtg-table-row--clickable" onClick={() => setSelectedRow(row)}>
                  <td>
                    <div className="bm-chair-cell">
                      <Avatar name={row.manager} index={i} size={32} />
                      <div>
                        <div className="bm-member-name">{row.manager}</div>
                        <div className="bm-member-email">{row.managerRole}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="bm-member-name">{row.employee}</div>
                    <div className="bm-member-email">{row.employeeRole}</div>
                  </td>
                  <td style={{ color: '#475569', fontSize: 11 }}>{row.date}</td>
                  <td>
                    <span className="bm-badge" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                      {typeStyle.icon} {row.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 11, color: '#1e293b' }}>{row.topic}</td>
                  <td className="int-feedback">{row.feedback}</td>
                  <td style={{ textAlign: 'center' }}>
                    {row.acknowledged === 'done'
                      ? <span style={{ color: '#16a34a', fontSize: 16 }}>✓</span>
                      : <span style={{ color: '#f59e0b', fontSize: 16 }}>⚠</span>}
                  </td>
                  <td>
                    {row.followUp !== 'None' && (
                      <span className="bm-badge" style={{ background: fuStyle.bg, color: fuStyle.color }}>
                        {row.followUp}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interaction Detail Side Drawer */}
      {selectedRow && (
        <>
          <div className="side-drawer-backdrop" onClick={() => setSelectedRow(null)} />
          <div className="side-drawer">
            <div className="side-drawer__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={selectedRow.manager} index={INTERACTIONS_TABLE.findIndex(r => r.id === selectedRow.id)} size={44} />
                <div>
                  <span className="side-drawer__type">{selectedRow.topic}</span>
                  <h2 className="side-drawer__title">{selectedRow.manager}</h2>
                </div>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setSelectedRow(null)}>✕</button>
            </div>

            <div className="overlay-detail-body">
              <div className="overlay-field">
                <label className="overlay-label">Manager</label>
                <input className="overlay-input" defaultValue={selectedRow.manager} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <input className="overlay-input" defaultValue={selectedRow.type} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Employee</label>
                <input className="overlay-input" defaultValue={selectedRow.employee} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Employee Role</label>
                <input className="overlay-input" defaultValue={selectedRow.employeeRole} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" defaultValue={selectedRow.date} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Topic</label>
                <input className="overlay-input" defaultValue={selectedRow.topic} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Acknowledged</label>
                <select className="overlay-input" defaultValue={selectedRow.acknowledged} disabled>
                  <option value="done">Yes — Acknowledged</option>
                  <option value="warning">No — Pending</option>
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Follow-Up</label>
                <select className="overlay-input" defaultValue={selectedRow.followUp} disabled>
                  <option>None</option>
                  <option>Required</option>
                  <option>Scheduled</option>
                </select>
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Feedback / Instruction</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedRow.feedback} readOnly rows={2} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" defaultValue={selectedRow.description} readOnly rows={3} />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <div className="drawer-agenda-list">
                  {selectedRow.outcomes.map((o, i) => (
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
              <button type="button" className="bm-btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setSelectedRow(null)}>Delete</button>
              <button type="button" className="bm-btn-outline" onClick={() => setSelectedRow(null)}>Close</button>
              <button type="button" className="bm-add-btn">Edit</button>
            </div>
          </div>
        </>
      )}

      {/* Add Interaction Overlay */}
      {showAddInteraction && (
        <div className="overlay-backdrop" onClick={handleClose}>
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Add Interaction</h2>
                <p className="overlay-panel__subtitle">Log a new manager-employee interaction</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleClose}>✕</button>
            </div>

            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>

              <div className="overlay-field">
                <label className="overlay-label">Manager</label>
                <select className="overlay-input" name="manager" value={form.manager} onChange={handleFormChange}>
                  <option value="">Select manager</option>
                  {['Max Maraston', 'Sasha Glinsky', 'Yana Snezin'].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Type</label>
                <select className="overlay-input" name="type" value={form.type} onChange={handleFormChange}>
                  <option value="">Select type</option>
                  <option>Verbal</option>
                  <option>Written</option>
                  <option>Meeting</option>
                </select>
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Employee</label>
                <input className="overlay-input" name="employee" value={form.employee} onChange={handleFormChange} placeholder="e.g. David Chen" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Employee Role</label>
                <input className="overlay-input" name="employeeRole" value={form.employeeRole} onChange={handleFormChange} placeholder="e.g. Developer" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Date</label>
                <input className="overlay-input" name="date" type="date" value={form.date} onChange={handleFormChange} />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Topic</label>
                <input className="overlay-input" name="topic" value={form.topic} onChange={handleFormChange} placeholder="e.g. Performance feedback" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Acknowledged</label>
                <select className="overlay-input" name="acknowledged" value={form.acknowledged} onChange={handleFormChange}>
                  <option value="done">Yes — Acknowledged</option>
                  <option value="warning">No — Pending</option>
                </select>
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Follow-Up</label>
                <select className="overlay-input" name="followUp" value={form.followUp} onChange={handleFormChange}>
                  <option>None</option>
                  <option>Required</option>
                  <option>Scheduled</option>
                </select>
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Feedback / Instruction</label>
                <textarea className="overlay-input overlay-textarea" name="feedback" value={form.feedback} onChange={handleFormChange} placeholder="Describe the feedback or instruction given..." rows={2} />
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea className="overlay-input overlay-textarea" name="description" value={form.description || ''} onChange={handleFormChange} placeholder="Provide a detailed description of the interaction..." rows={2} />
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Key Outcomes</label>
                <textarea className="overlay-input overlay-textarea" name="outcomes" value={form.outcomes || ''} onChange={handleFormChange} placeholder="e.g. Action plan created, follow-up scheduled..." rows={2} />
              </div>

              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={handleClose}>Cancel</button>
                <button type="submit" className="bm-add-btn">Save Interaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Interactions;
