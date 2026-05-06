import React from 'react';
import { PLATFORM_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const HEALTH_COLORS = {
  'Healthy':  { bg: '#dcfce7', color: '#16a34a', dot: '#22c55e' },
  'Degraded': { bg: '#fef9c3', color: '#a16207', dot: '#f59e0b' },
  'Down':     { bg: '#fee2e2', color: '#dc2626', dot: '#ef4444' },
};

const TREND_COLOR = (t) => t.startsWith('↑') ? '#16a34a' : '#dc2626';

function PlatformHealth() {
  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">App Uptime</div>
            <div className="stats-value">{PLATFORM_DATA.uptime}%</div>
            <div className="stats-supplementary">Last 30 days</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">🟢</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Crash Reports</div>
            <div className="stats-value">{PLATFORM_DATA.crashReports}</div>
            <div className="stats-supplementary">Today</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">⚠️</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">User Drop-off Rate</div>
            <div className="stats-value">{PLATFORM_DATA.dropOffRate}%</div>
            <div className="stats-supplementary">Session abandonment</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📉</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Services Monitored</div>
            <div className="stats-value">{PLATFORM_DATA.systemHealth.length}</div>
            <div className="stats-supplementary">{PLATFORM_DATA.systemHealth.filter(s => s.status === 'Healthy').length} healthy</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">🖥️</div>
        </div>
      </div>

      <div className="main-content__row">
        {/* Feature Usage */}
        <div className="bm-section" style={{ flex: 1.4, marginBottom: 20 }}>
          <div className="bm-section__header">
            <div>
              <h2>Feature Usage</h2>
              <p className="bm-section__subtitle">Usage count and trend per feature</p>
            </div>
          </div>
          <table className="bm-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Usage Count</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_DATA.featureUsage.map((f, i) => (
                <tr key={i}>
                  <td><span className="bm-member-name">{f.feature}</span></td>
                  <td style={{ fontSize: 11, color: '#475569' }}>{f.count.toLocaleString()}</td>
                  <td style={{ fontSize: 11, fontWeight: 700, color: TREND_COLOR(f.trend) }}>{f.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Health */}
        <div className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header">
            <div>
              <h2>System Health</h2>
              <p className="bm-section__subtitle">Live service status indicators</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PLATFORM_DATA.systemHealth.map((s, i) => {
              const hc = HEALTH_COLORS[s.status] || HEALTH_COLORS['Healthy'];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="dm-health-dot" style={{ background: hc.dot }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{s.service}</span>
                  </div>
                  <span className="bm-badge" style={{ background: hc.bg, color: hc.color }}>{s.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BriefSection
        title="Tech Daily Brief"
        defaultAttendees={['CEO', 'CTO', 'Product Head']}
        discussionPlaceholder="System issues, crashes, feature performance, upcoming releases"
      />
    </>
  );
}

export default PlatformHealth;
