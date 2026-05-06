import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BRAND_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const SENTIMENT_COLORS = {
  'Positive': { bg: '#dcfce7', color: '#16a34a' },
  'Neutral':  { bg: '#f1f5f9', color: '#64748b' },
  'Negative': { bg: '#fee2e2', color: '#dc2626' },
};

function BrandPulse() {
  const { positive, neutral, negative } = BRAND_DATA.sentimentScore;
  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Social Mentions</div>
            <div className="stats-value">{BRAND_DATA.mentions.toLocaleString()}</div>
            <div className="stats-supplementary">Last 7 days</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">📣</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Positive Sentiment</div>
            <div className="stats-value">{positive}%</div>
            <div className="stats-supplementary">Neutral: {neutral}% · Negative: {negative}%</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">😊</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Active Collaborations</div>
            <div className="stats-value">{BRAND_DATA.activeCollabs}</div>
            <div className="stats-supplementary">Ongoing partnerships</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">🤝</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Negative Mentions</div>
            <div className="stats-value">{Math.round(BRAND_DATA.mentions * negative / 100)}</div>
            <div className="stats-supplementary">Needs attention</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">⚠️</div>
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div><h2>Sentiment Breakdown</h2></div>
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

      {/* Mentions Trend */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Mentions Trend</h2>
            <p className="bm-section__subtitle">Daily mention volume this week</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={BRAND_DATA.mentionsTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Line type="monotone" dataKey="mentions" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 4, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Mentions */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Recent Mentions</h2>
            <p className="bm-section__subtitle">Latest brand mentions across platforms</p>
          </div>
        </div>
        <table className="bm-table">
          <thead>
            <tr><th>Platform</th><th>Mention</th><th>Sentiment</th><th>Date</th></tr>
          </thead>
          <tbody>
            {BRAND_DATA.recentMentions.map((m, i) => {
              const sc = SENTIMENT_COLORS[m.sentiment] || SENTIMENT_COLORS['Neutral'];
              return (
                <tr key={i}>
                  <td style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{m.platform}</td>
                  <td style={{ fontSize: 11, color: '#475569', maxWidth: 280 }}>{m.mention}</td>
                  <td><span className="bm-badge" style={{ background: sc.bg, color: sc.color }}>{m.sentiment}</span></td>
                  <td style={{ fontSize: 11, color: '#94a3b8' }}>{m.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BriefSection
        title="Brand Daily Brief"
        defaultAttendees={['CEO', 'PR Head', 'Marketing Head']}
        discussionPlaceholder="Negative mentions, collaboration updates, PR opportunities"
      />
    </>
  );
}

export default BrandPulse;
