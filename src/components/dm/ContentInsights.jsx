import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CONTENT_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

function ContentTable({ data, label }) {
  return (
    <div className="bm-section" style={{ flex: 1, marginBottom: 20 }}>
      <div className="bm-section__header">
        <div>
          <h2>{label}</h2>
          <p className="bm-section__subtitle">By views, engagement & ROI</p>
        </div>
      </div>
      <table className="bm-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Engagement</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, i) => (
            <tr key={i}>
              <td><span className="bm-member-name" style={{ fontSize: 11 }}>{c.title}</span></td>
              <td style={{ fontSize: 11, color: '#475569' }}>{c.views.toLocaleString()}</td>
              <td style={{ fontSize: 11, color: '#475569' }}>{c.engagement}</td>
              <td style={{ fontSize: 11, fontWeight: 700, color: '#1a3a8f' }}>{c.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentInsights() {
  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Top Content Views</div>
            <div className="stats-value">{(CONTENT_DATA.topContent[0].views / 1000).toFixed(1)}K</div>
            <div className="stats-supplementary">{CONTENT_DATA.topContent[0].title}</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">🏆</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Best Engagement</div>
            <div className="stats-value">{CONTENT_DATA.topContent[0].engagement}</div>
            <div className="stats-supplementary">Top performing piece</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">💬</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Best ROI</div>
            <div className="stats-value">{CONTENT_DATA.effortVsReach.roi}</div>
            <div className="stats-supplementary">Effort: {CONTENT_DATA.effortVsReach.effort} · Reach: {CONTENT_DATA.effortVsReach.reach}</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📈</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Content Categories</div>
            <div className="stats-value">{CONTENT_DATA.categoryData.length}</div>
            <div className="stats-supplementary">Active categories</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">📂</div>
        </div>
      </div>

      <div className="main-content__row">
        <ContentTable data={CONTENT_DATA.topContent} label="Top 5 Performing Content" />
        <ContentTable data={CONTENT_DATA.bottomContent} label="Bottom 5 Performing Content" />
      </div>

      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Content by Category</h2>
            <p className="bm-section__subtitle">Volume of content per category</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={CONTENT_DATA.categoryData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Bar dataKey="count" name="Content Pieces" fill="#1a3a8f" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <BriefSection
        title="Content Daily Brief"
        defaultAttendees={['CEO', 'Content Head', 'Creative Team']}
        discussionPlaceholder="Top content wins, underperforming content, upcoming content plan"
      />
    </>
  );
}

export default ContentInsights;
