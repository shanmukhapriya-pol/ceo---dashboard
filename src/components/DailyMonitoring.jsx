import React from 'react';
import RevenueIntelligence from './dm/RevenueIntelligence.jsx';
import AudienceAnalytics from './dm/AudienceAnalytics.jsx';
import ContentInsights from './dm/ContentInsights.jsx';
import DealPipeline from './dm/DealPipeline.jsx';
import ExecutionControl from './dm/ExecutionControl.jsx';
import PlatformHealth from './dm/PlatformHealth.jsx';
import BrandPulse from './dm/BrandPulse.jsx';
import MarketIntelligence from './dm/MarketIntelligence.jsx';
import DecisionRegistry from './dm/DecisionRegistry.jsx';
import CrisisCommand from './dm/CrisisCommand.jsx';
import GroundIntelligence from './dm/GroundIntelligence.jsx';

const META = {
  revenue:    { title: 'Revenue Intelligence',  subtitle: 'Daily revenue vs target, pipeline deals, sponsorships & subscriptions.', icon: '💰' },
  audience:   { title: 'Audience Analytics',    subtitle: 'DAU, MAU, total views, watch time and engagement rate.', icon: '👥' },
  content:    { title: 'Content Insights',      subtitle: 'Top & bottom performing content, category breakdown and ROI analysis.', icon: '📊' },
  pipeline:   { title: 'Deal Pipeline',         subtitle: 'Total leads, proposals sent, deals closed and Kanban board.', icon: '🤝' },
  execution:  { title: 'Execution Control',     subtitle: 'RAG status, task ownership, overdue items and department progress.', icon: '⚙️' },
  platform:   { title: 'Platform Health',       subtitle: 'App uptime, crash reports, feature usage and system health status.', icon: '🖥️' },
  brand:      { title: 'Brand Pulse',           subtitle: 'Social mentions, sentiment score, collaborations and mention trends.', icon: '📣' },
  market:     { title: 'Market Intelligence',   subtitle: 'Competitor content, trending topics and market gap analysis.', icon: '🔍' },
  decisions:  { title: 'Decision Registry',     subtitle: 'Decision log, open items, follow-ups and department filters.', icon: '📋' },
  crisis:     { title: 'Crisis Command',        subtitle: 'Active crises, legal issues, PR risks and escalation log.', icon: '🚨' },
  feedback:   { title: 'Ground Intelligence',   subtitle: 'User feedback, citizen insights, rural data and sentiment breakdown.', icon: '🌍' },
};

function DailyMonitoring({ subPage, onBack }) {
  const meta = META[subPage] || { title: subPage, subtitle: '', icon: '📊' };

  function renderContent() {
    switch (subPage) {
      case 'revenue':   return <RevenueIntelligence />;
      case 'audience':  return <AudienceAnalytics />;
      case 'content':   return <ContentInsights />;
      case 'pipeline':  return <DealPipeline />;
      case 'execution': return <ExecutionControl />;
      case 'platform':  return <PlatformHealth />;
      case 'brand':     return <BrandPulse />;
      case 'market':    return <MarketIntelligence />;
      case 'decisions': return <DecisionRegistry />;
      case 'crisis':    return <CrisisCommand />;
      case 'feedback':  return <GroundIntelligence />;
      default:          return <p style={{ color: '#94a3b8', marginTop: 40, textAlign: 'center' }}>Page not found.</p>;
    }
  }

  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>{meta.icon} {meta.title}</h1>
          <p className="main-content__subtitle">{meta.subtitle}</p>
        </header>
        <button type="button" className="dm-back-btn" onClick={onBack}>← Back to Daily Monitoring</button>
      </div>

      {renderContent()}
    </main>
  );
}

export default DailyMonitoring;
