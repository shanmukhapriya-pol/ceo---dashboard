import { useState } from 'react';
import AttendeesBuilder from './AttendeesBuilder.jsx';

const TASKS_DATA = [
  { id: '1', name: 'Implement user authentication flow', description: 'Build secure login, registration, and session management using JWT tokens and refresh logic.', category: 'Frontend Development', manager: 'Max Maraston', managerAvatar: 'https://i.pravatar.cc/32?img=3', assignee: 'David Chen', assigneeAvatar: 'https://i.pravatar.cc/32?img=11', assignedDate: 'Apr 10, 2024', deadline: 'Apr 20, 2024', priority: 'high', status: 'In Progress', progress: 75 },
  { id: '2', name: 'Design new dashboard widgets', description: 'Create reusable chart and stat card components following the updated design system guidelines.', category: 'UI/UX Design', manager: 'Max Maraston', managerAvatar: 'https://i.pravatar.cc/32?img=3', assignee: 'Emma Wilson', assigneeAvatar: 'https://i.pravatar.cc/32?img=5', assignedDate: 'Apr 12, 2024', deadline: 'Apr 18, 2024', priority: 'medium', status: 'Completed', progress: 100 },
  { id: '3', name: 'API integration for payment gateway', description: 'Integrate Stripe payment API including webhooks, error handling, and refund flows.', category: 'Backend Development', manager: 'Max Maraston', managerAvatar: 'https://i.pravatar.cc/32?img=3', assignee: 'James Anderson', assigneeAvatar: 'https://i.pravatar.cc/32?img=7', assignedDate: 'Apr 8, 2024', deadline: 'Apr 15, 2024', priority: 'high', status: 'Overdue', progress: 45 },
  { id: '4', name: 'Create marketing campaign assets', description: 'Design social media banners, email headers, and landing page visuals for the Q2 campaign.', category: 'Marketing', manager: 'Max Maraston', managerAvatar: 'https://i.pravatar.cc/32?img=3', assignee: 'Michael Torres', assigneeAvatar: 'https://i.pravatar.cc/32?img=15', assignedDate: 'Apr 14, 2024', deadline: 'Apr 25, 2024', priority: 'medium', status: 'In Progress', progress: 30 },
  { id: '5', name: 'Database optimization and cleanup', description: 'Audit slow queries, add missing indexes, and archive stale records to improve performance.', category: 'Database', manager: 'Max Maraston', managerAvatar: 'https://i.pravatar.cc/32?img=3', assignee: 'James Anderson', assigneeAvatar: 'https://i.pravatar.cc/32?img=7', assignedDate: 'Apr 16, 2024', deadline: 'Apr 22, 2024', priority: 'low', status: 'Not Started', progress: 0 },
  { id: '6', name: 'Design system component audit', description: 'Review all shared components for consistency, accessibility compliance, and documentation gaps.', category: 'UI/UX Design', manager: 'Sasha Glinsky', managerAvatar: 'https://i.pravatar.cc/32?img=9', assignee: 'Emma Wilson', assigneeAvatar: 'https://i.pravatar.cc/32?img=5', assignedDate: 'Apr 11, 2024', deadline: 'Apr 19, 2024', priority: 'high', status: 'Completed', progress: 100 },
  { id: '7', name: 'Accessibility standards review', description: 'Evaluate all UI screens against WCAG 2.1 AA criteria and document remediation steps.', category: 'Design', manager: 'Sasha Glinsky', managerAvatar: 'https://i.pravatar.cc/32?img=9', assignee: 'David Chen', assigneeAvatar: 'https://i.pravatar.cc/32?img=11', assignedDate: 'Apr 13, 2024', deadline: 'Apr 21, 2024', priority: 'medium', status: 'In Progress', progress: 60 },
  { id: '8', name: 'Q2 performance review documentation', description: 'Compile individual performance summaries, ratings, and development plans for all direct reports.', category: 'HR', manager: 'Yana Snezin', managerAvatar: 'https://i.pravatar.cc/32?img=20', assignee: 'Sarah Johnson', assigneeAvatar: 'https://i.pravatar.cc/32?img=25', assignedDate: 'Apr 9, 2024', deadline: 'Apr 17, 2024', priority: 'high', status: 'Completed', progress: 100 },
  { id: '9', name: 'Employee onboarding materials update', description: 'Refresh onboarding decks, policy documents, and tool access guides to reflect current processes.', category: 'HR', manager: 'Yana Snezin', managerAvatar: 'https://i.pravatar.cc/32?img=20', assignee: 'Michael Torres', assigneeAvatar: 'https://i.pravatar.cc/32?img=15', assignedDate: 'Apr 15, 2024', deadline: 'Apr 26, 2024', priority: 'low', status: 'Not Started', progress: 0 },
];

const STATUS_STYLES = {
  'Completed':   { bg: '#dcfce7', color: '#16a34a', dot: '#16a34a' },
  'In Progress': { bg: '#dbeafe', color: '#1a3a8f', dot: '#3b82f6' },
  'Overdue':     { bg: '#fee2e2', color: '#dc2626', dot: '#dc2626' },
  'Not Started': { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8' },
};

const PRIORITY_STYLES = {
  high:   { bg: '#fee2e2', color: '#dc2626' },
  medium: { bg: '#fef9c3', color: '#a16207' },
  low:    { bg: '#f1f5f9', color: '#64748b' },
};

const MANAGERS = ['All Managers', 'Max Maraston', 'Sasha Glinsky', 'Yana Snezin'];
const STATUSES = ['All Statuses', 'Completed', 'In Progress', 'Overdue', 'Not Started'];

const ASSIGNEE_AVATARS = {
  'David Chen':    'https://i.pravatar.cc/32?img=11',
  'Emma Wilson':   'https://i.pravatar.cc/32?img=5',
  'James Anderson':'https://i.pravatar.cc/32?img=7',
  'Michael Torres':'https://i.pravatar.cc/32?img=15',
  'Sarah Johnson': 'https://i.pravatar.cc/32?img=25',
};

const MANAGER_AVATARS_MAP = {
  'Max Maraston':  'https://i.pravatar.cc/32?img=3',
  'Sasha Glinsky': 'https://i.pravatar.cc/32?img=9',
  'Yana Snezin':   'https://i.pravatar.cc/32?img=20',
};

const EMPTY_FORM = { name: '', description: '', category: '', manager: 'Max Maraston', assignee: 'David Chen', assignedDate: '', deadline: '', priority: 'medium', status: 'Not Started' };

function TaskForm({ form, onChange, onSubmit, onCancel, submitLabel, attendees, onAttendeesChange }) {
  return (
    <form className="overlay-panel__form" onSubmit={onSubmit}>
      <div className="overlay-field overlay-field--full">
        <label className="overlay-label">Task Name</label>
        <input className="overlay-input" name="name" value={form.name} onChange={onChange} placeholder="e.g. Design landing page" required />
      </div>
      <div className="overlay-field overlay-field--full">
        <label className="overlay-label">Description</label>
        <textarea className="overlay-input overlay-textarea" name="description" value={form.description} onChange={onChange} placeholder="Describe the task in detail..." rows={2} />
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Category</label>
        <input className="overlay-input" name="category" value={form.category} onChange={onChange} placeholder="e.g. UI/UX Design" required />
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Assigned By (Manager)</label>
        <select className="overlay-input" name="manager" value={form.manager} onChange={onChange}>
          {['Max Maraston', 'Sasha Glinsky', 'Yana Snezin'].map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Assign To</label>
        <select className="overlay-input" name="assignee" value={form.assignee} onChange={onChange}>
          {['David Chen', 'Emma Wilson', 'James Anderson', 'Michael Torres', 'Sarah Johnson'].map(a => <option key={a}>{a}</option>)}
        </select>
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Assigned Date</label>
        <input className="overlay-input" name="assignedDate" type="date" value={form.assignedDate} onChange={onChange} required />
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Deadline</label>
        <input className="overlay-input" name="deadline" type="date" value={form.deadline} onChange={onChange} required />
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Priority</label>
        <select className="overlay-input" name="priority" value={form.priority} onChange={onChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="overlay-field">
        <label className="overlay-label">Status</label>
        <select className="overlay-input" name="status" value={form.status} onChange={onChange}>
          {['Not Started', 'In Progress', 'Completed', 'Overdue'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="overlay-field overlay-field--full">
        <AttendeesBuilder attendees={attendees} onChange={onAttendeesChange} />
      </div>
      <div className="overlay-panel__actions">
        <button type="button" className="bm-btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="bm-add-btn">{submitLabel}</button>
      </div>
    </form>
  );
}

function Tasks() {
  const [filterManager, setFilterManager] = useState('All Managers');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [tasks, setTasks] = useState(TASKS_DATA);
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [addAttendees, setAddAttendees] = useState([]);
  const [editAttendees, setEditAttendees] = useState([]);

  const handleAddChange = e => setAddForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));

  function handleAddSubmit(e) {
    e.preventDefault();
    const newTask = {
      ...addForm,
      id: String(Date.now()),
      managerAvatar: MANAGER_AVATARS_MAP[addForm.manager] || 'https://i.pravatar.cc/32?img=3',
      assigneeAvatar: ASSIGNEE_AVATARS[addForm.assignee] || `https://i.pravatar.cc/32?u=${addForm.assignee}`,
      progress: addForm.status === 'Completed' ? 100 : addForm.status === 'In Progress' ? 50 : 0,
    };
    setTasks(prev => [newTask, ...prev]);
    setAddForm(EMPTY_FORM);
    setAddAttendees([]);
    setShowAdd(false);
  }

  function openEdit(t) {
    setEditForm({ name: t.name, description: t.description || '', category: t.category, manager: t.manager, assignee: t.assignee, assignedDate: t.assignedDate, deadline: t.deadline, priority: t.priority, status: t.status });
    const existing = t.attendees && t.attendees.length > 0
      ? t.attendees
      : t.assignee
        ? [{ name: t.assignee, department: t.category || '', preview: t.assigneeAvatar || null }]
        : [];
    setEditAttendees(existing);
    setEditTask(t);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setTasks(prev => prev.map(t => t.id !== editTask.id ? t : {
      ...t,
      ...editForm,
      attendees: editAttendees,
      managerAvatar: MANAGER_AVATARS_MAP[editForm.manager] || t.managerAvatar,
      assigneeAvatar: ASSIGNEE_AVATARS[editForm.assignee] || t.assigneeAvatar,
      progress: editForm.status === 'Completed' ? 100 : editForm.status === 'In Progress' ? Math.max(t.progress, 10) : 0,
    }));
    setEditTask(null);
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function cycleStatus(id) {
    const order = ['Not Started', 'In Progress', 'Completed'];
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = order[(order.indexOf(t.status) + 1) % order.length];
      return { ...t, status: next, progress: next === 'Completed' ? 100 : next === 'In Progress' ? 50 : 0 };
    }));
  }

  const visible = tasks.filter(t =>
    (filterManager === 'All Managers' || t.manager === filterManager) &&
    (filterStatus === 'All Statuses' || t.status === filterStatus)
  );

  const counts = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => t.status === 'Overdue').length,
  };

  return (
    <main className="main-content">
      {/* Header */}
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Task Management</h1>
          <p className="main-content__subtitle">Track tasks assigned by managers and monitor progress.</p>
        </header>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <select value={filterManager} onChange={e => setFilterManager(e.target.value)}>
            {MANAGERS.map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {STATUSES.map(o => <option key={o}>{o}</option>)}
          </select>
          <button type="button" className="bm-add-btn" onClick={() => setShowAdd(true)}>+ Add Task</button>
        </div>
      </div>

      {/* Stats */}
      <div className="main-content__row">
        {[
          { label: 'Total Tasks', value: counts.total, icon: '📋', color: 'blue' },
          { label: 'Completed', value: counts.completed, icon: '✅', color: 'green' },
          { label: 'In Progress', value: counts.inProgress, icon: '🔄', color: 'purple' },
          { label: 'Overdue', value: counts.overdue, icon: '⚠️', color: 'orange' },
        ].map(s => (
          <div key={s.label} className={`stats-card bm-stat-card bm-stat-card--${s.color}`}>
            <div className="bm-stat-card__body">
              <div className="stats-label">{s.label}</div>
              <div className="stats-value">{s.value}</div>
            </div>
            <div className={`bm-stat-card__icon bm-stat-card__icon--${s.color}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bm-section">
        <div className="bm-section__header">
          <div>
            <h2>All Tasks</h2>
            <p className="bm-section__subtitle">{visible.length} task{visible.length !== 1 ? 's' : ''} shown</p>
          </div>
          <button type="button" className="bm-btn-outline">📤 Export</button>
        </div>
        <table className="bm-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned By</th>
              <th>Assigned To</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(t => {
              const ss = STATUS_STYLES[t.status] || STATUS_STYLES['Not Started'];
              const ps = PRIORITY_STYLES[t.priority] || PRIORITY_STYLES.low;
              return (
                <tr key={t.id}>
                  <td style={{ maxWidth: 220 }}>
                    <div className="bm-member-name">{t.name}</div>
                    <div className="bm-member-email">{t.category}</div>
                    {t.description && (
                      <div className="task-description">{t.description}</div>
                    )}
                  </td>
                  <td>
                    <div className="bm-chair-cell">
                      <img src={t.managerAvatar} alt={t.manager} className="bm-chair-avatar" />
                      <span>{t.manager}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bm-chair-cell">
                      <img src={t.assigneeAvatar} alt={t.assignee} className="bm-chair-avatar" />
                      <span>{t.assignee}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bm-member-name">{t.deadline}</div>
                    <div className="bm-member-email">Assigned {t.assignedDate}</div>
                  </td>
                  <td>
                    <span className="bm-badge" style={{ background: ps.bg, color: ps.color }}>
                      {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="bm-progress-cell">
                      <div className="bm-progress">
                        <div className="bm-progress__bar" style={{ width: `${t.progress}%`, background: ss.dot }} />
                      </div>
                      <span className="bm-progress__label">{t.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <button type="button" className="tasks-status-btn" style={{ background: ss.bg, color: ss.color }} onClick={() => cycleStatus(t.id)} title="Click to cycle status">
                      <span className="tasks-status-btn__dot" style={{ background: ss.dot }} />
                      {t.status}
                    </button>
                  </td>
                  <td>
                    <div className="task-action-btns">
                      <button type="button" className="task-action-btn task-action-btn--edit" onClick={() => openEdit(t)} title="Edit">✏️</button>
                      <button type="button" className="task-action-btn task-action-btn--delete" onClick={() => deleteTask(t.id)} title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Task Overlay */}
      {showAdd && (
        <div className="overlay-backdrop" onClick={() => setShowAdd(false)}>
          <div className="overlay-panel" onClick={e => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Add Task</h2>
                <p className="overlay-panel__subtitle">Assign a new task to a team member</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <TaskForm form={addForm} onChange={handleAddChange} onSubmit={handleAddSubmit} onCancel={() => setShowAdd(false)} submitLabel="Add Task" attendees={addAttendees} onAttendeesChange={setAddAttendees} />
          </div>
        </div>
      )}

      {/* Edit Task Overlay */}
      {editTask && (
        <div className="overlay-backdrop" onClick={() => setEditTask(null)}>
          <div className="overlay-panel" onClick={e => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Edit Task</h2>
                <p className="overlay-panel__subtitle">Update task details</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setEditTask(null)}>✕</button>
            </div>
            <TaskForm form={editForm} onChange={handleEditChange} onSubmit={handleEditSubmit} onCancel={() => setEditTask(null)} submitLabel="Save Changes" attendees={editAttendees} onAttendeesChange={setEditAttendees} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Tasks;
