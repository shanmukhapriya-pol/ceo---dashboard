import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AUDIENCE_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

function AudienceAnalytics() {
  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Daily Active Users</div>
            <div className="stats-value">{(AUDIENCE_DATA.dau / 1000).toFixed(1)}K</div>
            <div className="stats-supplementary">Today</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">👥</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Monthly Active Users</div>
            <div className="stats-value">{(AUDIENCE_DATA.mau / 1000000).toFixed(2)}M</div>
            <div className="stats-supplementary">This month</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">📊</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Views Today</div>
            <div className="stats-value">{(AUDIENCE_DATA.totalViews / 1000).toFixed(0)}K</div>
            <div className="stats-supplementary">Across all platforms</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">👁️</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Avg Watch Time</div>
            <div className="stats-value">{AUDIENCE_DATA.avgWatchTime}</div>
            <div className="stats-supplementary">Engagement Rate: {AUDIENCE_DATA.engagementRate}%</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">⏱️</div>
        </div>
      </div>

      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Audience Growth — Last 30 Days</h2>
            <p className="bm-section__subtitle">Monthly active user trend</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={AUDIENCE_DATA.audienceGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip formatter={v => [`${(v / 1000000).toFixed(2)}M`, 'MAU']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <BriefSection
        title="Audience Daily Brief"
        defaultAttendees={['CEO', 'Marketing Head', 'Content Head']}
        discussionPlaceholder="Audience growth, engagement drops, platform trends"
      />
    </>
  );
}

export default AudienceAnalytics;
