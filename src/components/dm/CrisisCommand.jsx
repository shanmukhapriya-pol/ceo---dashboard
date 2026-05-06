import React from 'react';
import { CRISIS_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const SEVERITY_COLORS = {
  'Critical': { bg: '#fee2e2', color: '#dc2626', icon: '🔴' },
  'High':     { bg: '#ffedd5', color: '#ea580c', icon: '🟠' },
  'Medium':   { bg: '#fef9c3', color: '#a16207', icon: '🟡' },
  'Low':      { bg: '#dcfce7', color: '#16a34a', icon: '🟢' },
};

const STATUS_COLORS = {
  'In Progress': { bg: '#dbeafe', color: '#1a3a8f' },
  'Monitoring':  { bg: '#fef9c3', color: '#a16207' },
  'Resolved':    { bg: '#dcfce7', color: '#16a34a' },
  'Escalated':   { bg: '#fee2e2', color: '#dc2626' },
  'Under Review':{ bg: '#ede9fe', color: '#7c3aed' },
};

function CrisisCommand() {
  const hasCritical = CRISIS_DATA.activeCrises.some(c => c.severity === 'Critical');

  return (
    <>
      {/* Active Crisis Banner */}
      {hasCritical && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🚨</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626' }}>Active Critical Crisis Detected</div>
            <div style={{ fontSize: 11, color: '#b91c1c' }}>Immediate attention required — review escalation log below</div>
          </div>
        </div>
      )}

      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Active Crises</div>
            <div className="stats-value">{CRISIS_DATA.activeCrises.length}</div>
            <div className="stats-supplementary">Requires action</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">🚨</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Legal Issues</div>
            <div className="stats-value">{CRISIS_DATA.legalIssues.length}</div>
            <div className="stats-supplementary">Under review</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">⚖️</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">PR Risks</div>
            <div className="stats-value">{CRISIS_DATA.prRisks.length}</div>
            <div className="stats-supplementary">Being monitored</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📰</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Critical Issues</div>
            <div className="stats-value">{CRISIS_DATA.activeCrises.filter(c => c.severity === 'Critical').length}</div>
            <div className="stats-supplementary">Severity: Critical</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">🔴</div>
        </div>
      </div>

      {/* Escalation Log */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Escalation Log</h2>
            <p className="bm-section__subtitle">Active issues requiring immediate attention</p>
          </div>
        </div>
        <table className="bm-table">
          <thead>
            <tr><th>Issue</th><th>Severity</th><th>Owner</th><th>Status</th><th>Date Raised</th></tr>
          </thead>
          <tbody>
            {CRISIS_DATA.activeCrises.map((c, i) => {
              const sv = SEVERITY_COLORS[c.severity] || SEVERITY_COLORS['Medium'];
              const st = STATUS_COLORS[c.status] || STATUS_COLORS['In Progress'];
              return (
                <tr key={i} style={{ background: c.severity === 'Critical' ? '#fff5f5' : 'transparent' }}>
                  <td><span className="bm-member-name" style={{ fontSize: 11, color: c.severity === 'Critical' ? '#dc2626' : '#0f172a' }}>{c.issue}</span></td>
                  <td><span className="bm-badge" style={{ background: sv.bg, color: sv.color }}>{sv.icon} {c.severity}</span></td>
                  <td style={{ fontSize: 11, color: '#475569' }}>{c.owner}</td>
                  <td><span className="bm-badge" style={{ background: st.bg, color: st.color }}>{c.status}</span></td>
                  <td style={{ fontSize: 11, color: '#94a3b8' }}>{c.dateRaised}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="main-content__row">
        {/* Legal Issues */}
        <div className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header">
            <div><h2>Legal Issues</h2></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CRISIS_DATA.legalIssues.map((l, i) => {
              const sc = STATUS_COLORS[l.status] || STATUS_COLORS['Under Review'];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{l.issue}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>Deadline: {l.deadline}</div>
                  </div>
                  <span className="bm-badge" style={{ background: sc.bg, color: sc.color }}>{l.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PR Risks */}
        <div className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header">
            <div><h2>PR Risks</h2></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CRISIS_DATA.prRisks.map((r, i) => {
              const sv = SEVERITY_COLORS[r.severity] || SEVERITY_COLORS['Medium'];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{r.risk}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>Owner: {r.owner}</div>
                  </div>
                  <span className="bm-badge" style={{ background: sv.bg, color: sv.color }}>{sv.icon} {r.severity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BriefSection
        title="Crisis Daily Brief"
        defaultAttendees={['CEO', 'Legal Head', 'PR Head']}
        discussionPlaceholder="Active crises, escalations, risk mitigation steps"
      />
    </>
  );
}

export default CrisisCommand;
