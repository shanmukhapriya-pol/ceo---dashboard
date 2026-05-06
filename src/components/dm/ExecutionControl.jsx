import React from 'react';
import { EXECUTION_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const TASK_STATUS_COLORS = {
  'Blocked':  { bg: '#fee2e2', color: '#dc2626' },
  'Overdue':  { bg: '#fee2e2', color: '#dc2626' },
  'At Risk':  { bg: '#fef9c3', color: '#a16207' },
  'On Track': { bg: '#dcfce7', color: '#16a34a' },
};

function ExecutionControl() {
  return (
    <>
      {/* RAG Status */}
      <div className="dm-rag-row">
        <div className="dm-rag-card" style={{ background: '#fee2e2', color: '#dc2626' }}>
          <span style={{ fontSize: 28 }}>🔴</span>
          <div>
            <div className="dm-rag-card__count">{EXECUTION_DATA.ragStatus.red}</div>
            <div className="dm-rag-card__label">Blocked / Critical</div>
          </div>
        </div>
        <div className="dm-rag-card" style={{ background: '#fef9c3', color: '#a16207' }}>
          <span style={{ fontSize: 28 }}>🟡</span>
          <div>
            <div className="dm-rag-card__count">{EXECUTION_DATA.ragStatus.amber}</div>
            <div className="dm-rag-card__label">At Risk / Amber</div>
          </div>
        </div>
        <div className="dm-rag-card" style={{ background: '#dcfce7', color: '#16a34a' }}>
          <span style={{ fontSize: 28 }}>🟢</span>
          <div>
            <div className="dm-rag-card__count">{EXECUTION_DATA.ragStatus.green}</div>
            <div className="dm-rag-card__label">On Track / Green</div>
          </div>
        </div>
      </div>

      {/* Task Ownership Table */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Task Ownership</h2>
            <p className="bm-section__subtitle">Current task status by owner and department</p>
          </div>
        </div>
        <table className="bm-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Owner</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {EXECUTION_DATA.tasks.map((t, i) => {
              const s = TASK_STATUS_COLORS[t.status] || { bg: '#f1f5f9', color: '#475569' };
              const isOverdue = t.status === 'Overdue' || t.status === 'Blocked';
              return (
                <tr key={i} style={{ background: isOverdue ? '#fff5f5' : 'transparent' }}>
                  <td><span className="bm-member-name" style={{ fontSize: 11, color: isOverdue ? '#dc2626' : '#0f172a' }}>{t.task}</span></td>
                  <td style={{ fontSize: 11, color: '#475569' }}>{t.owner}</td>
                  <td style={{ fontSize: 11, color: isOverdue ? '#dc2626' : '#475569', fontWeight: isOverdue ? 600 : 400 }}>{t.deadline}</td>
                  <td><span className="bm-badge" style={{ background: s.bg, color: s.color }}>{t.status}</span></td>
                  <td style={{ fontSize: 11, color: '#64748b' }}>{t.department}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Department Progress */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Department Progress</h2>
            <p className="bm-section__subtitle">Task completion rate by department</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {EXECUTION_DATA.deptProgress.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#334155', width: 100, flexShrink: 0 }}>{d.dept}</span>
              <div className="bm-progress" style={{ flex: 1, height: 8 }}>
                <div className="bm-progress__bar" style={{ width: `${d.progress}%`, background: d.progress >= 80 ? '#22c55e' : d.progress >= 60 ? '#3b82f6' : '#f97316' }} />
              </div>
              <span className="bm-progress__label" style={{ width: 36, textAlign: 'right' }}>{d.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <BriefSection
        title="Execution Daily Brief"
        defaultAttendees={['CEO', 'All Department Heads']}
        discussionPlaceholder="Blocked tasks, delays, ownership issues, priority changes"
      />
    </>
  );
}

export default ExecutionControl;
