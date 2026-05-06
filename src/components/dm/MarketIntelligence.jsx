import React from 'react';
import { MARKET_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

function MarketIntelligence() {
  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Competitors Tracked</div>
            <div className="stats-value">{MARKET_DATA.competitorContent.length}</div>
            <div className="stats-supplementary">Active monitoring</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">🔍</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Trending Topics</div>
            <div className="stats-value">{MARKET_DATA.trendingTopics.length}</div>
            <div className="stats-supplementary">This week</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">🔥</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Market Gaps</div>
            <div className="stats-value">{MARKET_DATA.marketGaps.length}</div>
            <div className="stats-supplementary">Opportunities identified</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">💡</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Competitor Actions</div>
            <div className="stats-value">{MARKET_DATA.competitorTimeline.length}</div>
            <div className="stats-supplementary">This week</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">⚡</div>
        </div>
      </div>

      {/* Competitor Content Table */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Competitor Content</h2>
            <p className="bm-section__subtitle">Latest content from tracked competitors</p>
          </div>
        </div>
        <table className="bm-table">
          <thead>
            <tr><th>Competitor</th><th>Latest Content</th><th>Views</th><th>Topic</th></tr>
          </thead>
          <tbody>
            {MARKET_DATA.competitorContent.map((c, i) => (
              <tr key={i}>
                <td><span className="bm-member-name">{c.competitor}</span></td>
                <td style={{ fontSize: 11, color: '#475569' }}>{c.content}</td>
                <td style={{ fontSize: 11, fontWeight: 700, color: '#1a3a8f' }}>{c.views.toLocaleString()}</td>
                <td><span className="bm-badge bm-badge--committee">{c.topic}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="main-content__row">
        {/* Trending Topics */}
        <div className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header">
            <div><h2>Trending Topics</h2></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MARKET_DATA.trendingTopics.map((t, i) => (
              <span key={i} className="bm-badge" style={{ background: '#dbeafe', color: '#1a3a8f', fontSize: 11, padding: '5px 12px' }}>🔥 {t}</span>
            ))}
          </div>
        </div>

        {/* Market Gaps */}
        <div className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header">
            <div><h2>Market Gaps</h2><p className="bm-section__subtitle">Identified opportunities</p></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MARKET_DATA.marketGaps.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                <span style={{ color: '#16a34a', fontSize: 14, flexShrink: 0 }}>💡</span>
                <span style={{ fontSize: 11, color: '#166534' }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Timeline */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Competitor Activity Timeline</h2>
            <p className="bm-section__subtitle">Recent moves from tracked competitors</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {MARKET_DATA.competitorTimeline.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0', borderBottom: i < MARKET_DATA.competitorTimeline.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a3a8f', marginTop: 3, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{e.competitor}</span>
                <span style={{ fontSize: 11, color: '#475569', marginLeft: 8 }}>{e.action}</span>
              </div>
              <span style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>{e.date}</span>
            </div>
          ))}
        </div>
      </div>

      <BriefSection
        title="Market Daily Brief"
        defaultAttendees={['CEO', 'Strategy Head', 'Content Head']}
        discussionPlaceholder="Competitor moves, trending gaps, strategic opportunities"
      />
    </>
  );
}

export default MarketIntelligence;
