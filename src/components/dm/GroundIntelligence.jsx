import React, { useState } from 'react';
import { FEEDBACK_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const STATUS_COLORS = {
  'Open':      { bg: '#dbeafe', color: '#1a3a8f' },
  'In Review': { bg: '#fef9c3', color: '#a16207' },
  'Resolved':  { bg: '#dcfce7', color: '#16a34a' },
  'Pending':   { bg: '#f1f5f9', color: '#64748b' },
};

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Rural'];

function GroundIntelligence() {
  const [regionFilter, setRegionFilter] = useState('All');
  const { positive, neutral, negative } = FEEDBACK_DATA.sentimentBreakdown;

  const visible = FEEDBACK_DATA.citizenFeedback.filter(f =>
    regionFilter === 'All' || f.region === regionFilter
  );

  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Feedback</div>
            <div className="stats-value">{FEEDBACK_DATA.feedbackSummary.total.toLocaleString()}</div>
            <div className="stats-supplementary">All sources</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">💬</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Resolved</div>
            <div className="stats-value">{FEEDBACK_DATA.feedbackSummary.resolved.toLocaleString()}</div>
            <div className="stats-supplementary">{Math.round(FEEDBACK_DATA.feedbackSummary.resolved / FEEDBACK_DATA.feedbackSummary.total * 100)}% resolution rate</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">✅</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Pending</div>
            <div className="stats-value">{FEEDBACK_DATA.feedbackSummary.pending.toLocaleString()}</div>
            <div className="stats-supplementary">Needs attention</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">⏳</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Positive Sentiment</div>
            <div className="stats-value">{positive}%</div>
            <div className="stats-supplementary">Of all feedback</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">😊</div>
        </div>
      </div>

      {/* Sentiment Breakdown */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div><h2>Feedback Sentiment Breakdown</h2></div>
        </div>
        <div className="dm-sentiment-bar">
          <div className="dm-sentiment-bar__pos" style={{ width: `${positive}%` }} />
          <div className="dm-sentiment-bar__neu" style={{ width: `${neutral}%` }} />
          <div className="dm-sentiment-bar__neg" style={{ width: `${negative}%` }} />
        </div>
        <div className="dm-sentiment-labels">
          <span style={{ color: '#16a34a' }}>🟢 Positive {positive}%</span>
          <span style={{ color: '#64748b' }}>⚪ Neutral {neutral}%</span>
          <span style={{ color: '#dc2626' }}>🔴 Negative {negative}%</span>
        </div>
      </div>

      {/* Citizen Feedback Table */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Citizen Feedback</h2>
            <p className="bm-section__subtitle">Feedback by source, region and status</p>
          </div>
          <select className="overlay-input" style={{ fontSize: 11, padding: '5px 10px', width: 'auto' }} value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
            {REGIONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <table className="bm-table">
          <thead>
            <tr><th>Source</th><th>Feedback</th><th>Region</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {visible.map((f, i) => {
              const sc = STATUS_COLORS[f.status] || STATUS_COLORS['Open'];
              return (
                <tr key={i}>
                  <td style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{f.source}</td>
                  <td style={{ fontSize: 11, color: '#475569', maxWidth: 260 }}>{f.feedback}</td>
                  <td><span className="bm-badge bm-badge--committee">{f.region}</span></td>
                  <td style={{ fontSize: 11, color: '#94a3b8' }}>{f.date}</td>
                  <td><span className="bm-badge" style={{ background: sc.bg, color: sc.color }}>{f.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rural Insights */}
      <div className="bm-section" style={{ marginBottom: 20, borderLeft: '4px solid #22c55e' }}>
        <div className="bm-section__header">
          <div><h2>🌍 Rural Insights</h2><p className="bm-section__subtitle">Key observations from non-urban regions</p></div>
        </div>
        <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{FEEDBACK_DATA.ruralInsights}</p>
      </div>

      <BriefSection
        title="Feedback Daily Brief"
        defaultAttendees={['CEO', 'Community Head', 'Product Head']}
        discussionPlaceholder="Key user concerns, regional issues, product improvement feedback"
      />
    </>
  );
}

export default GroundIntelligence;
