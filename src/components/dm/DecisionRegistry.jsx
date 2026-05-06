import React, { useState } from 'react';
import { DECISIONS_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const STATUS_COLORS = {
  'Open':    { bg: '#dbeafe', color: '#1a3a8f' },
  'Pending': { bg: '#fef9c3', color: '#a16207' },
  'Closed':  { bg: '#dcfce7', color: '#16a34a' },
};

function DecisionRegistry() {
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const depts = ['All', ...Array.from(new Set(DECISIONS_DATA.decisions.map(d => d.department)))];
  const statuses = ['All', 'Open', 'Pending', 'Closed'];

  const visible = DECISIONS_DATA.decisions.filter(d =>
    (deptFilter === 'All' || d.department === deptFilter) &&
    (statusFilter === 'All' || d.status === statusFilter)
  );

  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Decisions</div>
            <div className="stats-value">{DECISIONS_DATA.decisions.length}</div>
            <div className="stats-supplementary">In registry</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">📋</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Open Decisions</div>
            <div className="stats-value">{DECISIONS_DATA.openCount}</div>
            <div className="stats-supplementary">Awaiting action</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">🔓</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Due Today</div>
            <div className="stats-value">{DECISIONS_DATA.dueTodayCount}</div>
            <div className="stats-supplementary">Follow-up required</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">⏰</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Closed Decisions</div>
            <div className="stats-value">{DECISIONS_DATA.decisions.filter(d => d.status === 'Closed').length}</div>
            <div className="stats-supplementary">Resolved</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">✅</div>
        </div>
      </div>

      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Decision Log</h2>
            <p className="bm-section__subtitle">All decisions with owners and follow-up dates</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select className="overlay-input" style={{ fontSize: 11, padding: '5px 10px', width: 'auto' }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
              {depts.map(d => <option key={d}>{d}</option>)}
            </select>
            <select className="overlay-input" style={{ fontSize: 11, padding: '5px 10px', width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <table className="bm-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>Owner</th>
              <th>Date</th>
              <th>Follow-up</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((d, i) => {
              const sc = STATUS_COLORS[d.status] || STATUS_COLORS['Open'];
              return (
                <tr key={i}>
                  <td><span className="bm-member-name" style={{ fontSize: 11 }}>{d.decision}</span></td>
                  <td style={{ fontSize: 11, color: '#475569' }}>{d.owner}</td>
                  <td style={{ fontSize: 11, color: '#64748b' }}>{d.date}</td>
                  <td style={{ fontSize: 11, color: d.status === 'Pending' ? '#a16207' : '#64748b', fontWeight: d.status === 'Pending' ? 600 : 400 }}>{d.followUpDate}</td>
                  <td><span className="bm-badge" style={{ background: sc.bg, color: sc.color }}>{d.status}</span></td>
                  <td style={{ fontSize: 11, color: '#64748b' }}>{d.department}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BriefSection
        title="Decision Daily Brief"
        defaultAttendees={['CEO', 'All Department Heads']}
        discussionPlaceholder="Pending decisions, follow-ups overdue, new decisions needed"
      />
    </>
  );
}

export default DecisionRegistry;
