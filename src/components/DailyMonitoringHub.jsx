import React from 'react';

const SUB_PAGES = [
  { key: 'revenue',    icon: '💰', title: 'Revenue Intelligence',  desc: 'Daily revenue vs target, pipeline deals, sponsorships & subscriptions.' },
  { key: 'audience',  icon: '👥', title: 'Audience Analytics',     desc: 'DAU, MAU, views, watch time, engagement rate & growth trends.' },
  { key: 'content',   icon: '📊', title: 'Content Insights',       desc: 'Top & bottom performing content, category breakdown & ROI.' },
  { key: 'pipeline',  icon: '🤝', title: 'Deal Pipeline',          desc: 'Leads, proposals, closed deals & Kanban board overview.' },
  { key: 'execution', icon: '⚙️', title: 'Execution Control',      desc: 'RAG status, task ownership, overdue items & dept progress.' },
  { key: 'platform',  icon: '🖥️', title: 'Platform Health',        desc: 'Uptime, crash reports, feature usage & system health status.' },
  { key: 'brand',     icon: '📣', title: 'Brand Pulse',            desc: 'Social mentions, sentiment score, collaborations & trends.' },
  { key: 'market',    icon: '🔍', title: 'Market Intelligence',    desc: 'Competitor content, trending topics & market gap analysis.' },
  { key: 'decisions', icon: '📋', title: 'Decision Registry',      desc: 'Decision log, open items, follow-ups & department filters.' },
  { key: 'crisis',    icon: '🚨', title: 'Crisis Command',         desc: 'Active crises, legal issues, PR risks & escalation log.' },
  { key: 'feedback',  icon: '🌍', title: 'Ground Intelligence',    desc: 'User feedback, citizen insights, rural data & sentiment.' },
];

function DailyMonitoringHub({ onSelectSubPage }) {
  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Daily Monitoring</h1>
          <p className="main-content__subtitle">
            Select a category to view today's data and schedule your daily brief.
          </p>
        </header>
      </div>

      <div className="dm-hub-grid">
        {SUB_PAGES.map((sp) => (
          <div key={sp.key} className="dm-hub-card" onClick={() => onSelectSubPage(sp.key)}>
            <div className="dm-hub-card__icon">{sp.icon}</div>
            <div className="dm-hub-card__title">{sp.title}</div>
            <div className="dm-hub-card__desc">{sp.desc}</div>
          <span className="dm-hub-card__btn">Open →</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DailyMonitoringHub;
