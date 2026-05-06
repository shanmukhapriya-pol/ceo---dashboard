// ============================================================
// Daily Monitoring — Mock Data
// ============================================================

export const REVENUE_DATA = {
  dailyRevenue: 7013500,
  target: 8300000,
  weeklyRevenue: [
    { day: 'Mon', revenue: 5976000 },
    { day: 'Tue', revenue: 7304000 },
    { day: 'Wed', revenue: 5395000 },
    { day: 'Thu', revenue: 7553000 },
    { day: 'Fri', revenue: 7013500 },
    { day: 'Sat', revenue: 3735000 },
    { day: 'Sun', revenue: 3154000 },
  ],
  sponsorships: { count: 12, value: 26560000 },
  subscriptions: { count: 4820, growth: 8.4 },
  pipelineDeals: [
    { deal: 'TechCorp Partnership', description: 'Strategic partnership for enterprise software integration and co-marketing initiatives.', value: '₹99,60,000', owner: 'Max M.', status: 'Negotiation', expectedClose: 'Apr 28, 2026' },
    { deal: 'MediaGroup Sponsorship', description: 'Annual sponsorship package including brand placement and content collaboration.', value: '₹70,55,000', owner: 'Sasha G.', status: 'Proposal', expectedClose: 'May 5, 2026' },
    { deal: 'StartupX Annual Plan', description: 'Enterprise subscription with custom features and dedicated support team.', value: '₹34,86,000', owner: 'Yana S.', status: 'Discovery', expectedClose: 'May 12, 2026' },
    { deal: 'RetailBrand Campaign', description: 'Multi-channel marketing campaign with performance-based pricing model.', value: '₹56,02,500', owner: 'Max M.', status: 'Closed Won', expectedClose: 'Apr 20, 2026' },
    { deal: 'FinanceHub License', description: 'Software licensing agreement with quarterly payment terms and renewal options.', value: '₹24,07,000', owner: 'Sasha G.', status: 'At Risk', expectedClose: 'Apr 30, 2026' },
  ],
};

export const AUDIENCE_DATA = {
  dau: 128400,
  mau: 2840000,
  totalViews: 342000,
  avgWatchTime: '4m 32s',
  engagementRate: 6.8,
  audienceGrowth: [
    { date: 'Apr 1', users: 2600000 },
    { date: 'Apr 5', users: 2680000 },
    { date: 'Apr 10', users: 2710000 },
    { date: 'Apr 15', users: 2760000 },
    { date: 'Apr 20', users: 2800000 },
    { date: 'Apr 25', users: 2840000 },
  ],
};

export const CONTENT_DATA = {
  topContent: [
    { title: 'Q3 Strategy Deep Dive', views: 84200, engagement: '9.2%', roi: '4.1x' },
    { title: 'Leadership Masterclass', views: 72100, engagement: '8.7%', roi: '3.8x' },
    { title: 'Product Launch Recap', views: 61400, engagement: '7.9%', roi: '3.2x' },
    { title: 'Market Trends 2026', views: 54800, engagement: '7.4%', roi: '2.9x' },
    { title: 'CEO Interview Series', views: 48300, engagement: '6.8%', roi: '2.6x' },
  ],
  bottomContent: [
    { title: 'Office Tour Vlog', views: 1200, engagement: '1.1%', roi: '0.3x' },
    { title: 'Team Outing Highlights', views: 980, engagement: '0.9%', roi: '0.2x' },
    { title: 'Old Product Demo', views: 840, engagement: '0.8%', roi: '0.2x' },
    { title: 'Generic FAQ Video', views: 720, engagement: '0.7%', roi: '0.1x' },
    { title: 'Unedited Podcast Clip', views: 540, engagement: '0.5%', roi: '0.1x' },
  ],
  categoryData: [
    { category: 'Strategy', count: 42 },
    { category: 'Leadership', count: 35 },
    { category: 'Product', count: 28 },
    { category: 'Marketing', count: 22 },
    { category: 'Culture', count: 15 },
  ],
  effortVsReach: { effort: 'Medium', reach: 'High', roi: '3.4x' },
};

export const PIPELINE_DATA = {
  totalLeads: 184,
  proposalsSent: 67,
  dealsClosed: 23,
  closureRate: 34.3,
  kanban: {
    lead: [
      { name: 'TechVentures Inc.', value: '₹37.35L' },
      { name: 'GrowthLabs', value: '₹23.24L' },
      { name: 'NexaMedia', value: '₹51.46L' },
    ],
    proposal: [
      { name: 'MediaGroup', value: '₹70.55L' },
      { name: 'StartupX', value: '₹34.86L' },
      { name: 'RetailBrand', value: '₹55.61L' },
    ],
    closed: [
      { name: 'TechCorp', value: '₹99.6L' },
      { name: 'FinanceHub', value: '₹24.07L' },
      { name: 'CloudSys', value: '₹44.82L' },
    ],
  },
};

export const EXECUTION_DATA = {
  ragStatus: { red: 4, amber: 9, green: 28 },
  tasks: [
    { task: 'Launch payment gateway', owner: 'James Anderson', deadline: 'Apr 27, 2026', status: 'Blocked', department: 'Engineering' },
    { task: 'Q2 campaign assets', owner: 'Michael Torres', deadline: 'Apr 28, 2026', status: 'At Risk', department: 'Marketing' },
    { task: 'Design system audit', owner: 'Emma Wilson', deadline: 'Apr 30, 2026', status: 'On Track', department: 'Design' },
    { task: 'HR policy update', owner: 'Sarah Johnson', deadline: 'May 2, 2026', status: 'On Track', department: 'HR' },
    { task: 'API integration', owner: 'David Chen', deadline: 'Apr 25, 2026', status: 'Overdue', department: 'Engineering' },
  ],
  deptProgress: [
    { dept: 'Engineering', progress: 62 },
    { dept: 'Design', progress: 78 },
    { dept: 'Marketing', progress: 55 },
    { dept: 'HR', progress: 88 },
    { dept: 'Sales', progress: 71 },
  ],
};

export const PLATFORM_DATA = {
  uptime: 99.7,
  crashReports: 3,
  dropOffRate: 12.4,
  featureUsage: [
    { feature: 'Dashboard', count: 48200, trend: '↑ +5%' },
    { feature: 'Meetings', count: 32100, trend: '↑ +2%' },
    { feature: 'Tasks', count: 28400, trend: '↓ -1%' },
    { feature: 'Interactions', count: 19800, trend: '↑ +8%' },
    { feature: 'Reports', count: 12300, trend: '↓ -3%' },
  ],
  systemHealth: [
    { service: 'API Gateway', status: 'Healthy' },
    { service: 'Database', status: 'Healthy' },
    { service: 'Auth Service', status: 'Degraded' },
    { service: 'CDN', status: 'Healthy' },
    { service: 'Email Service', status: 'Down' },
  ],
};

export const BRAND_DATA = {
  mentions: 2840,
  sentimentScore: { positive: 68, neutral: 22, negative: 10 },
  activeCollabs: 14,
  mentionsTrend: [
    { date: 'Apr 21', mentions: 210 },
    { date: 'Apr 22', mentions: 340 },
    { date: 'Apr 23', mentions: 280 },
    { date: 'Apr 24', mentions: 420 },
    { date: 'Apr 25', mentions: 390 },
    { date: 'Apr 26', mentions: 510 },
    { date: 'Apr 27', mentions: 480 },
  ],
  recentMentions: [
    { platform: 'Twitter/X', mention: 'Great leadership content from @CEODashboard!', sentiment: 'Positive', date: 'Apr 27' },
    { platform: 'LinkedIn', mention: 'Impressive Q1 results shared by the team.', sentiment: 'Positive', date: 'Apr 27' },
    { platform: 'Reddit', mention: 'Their product has some UX issues tbh.', sentiment: 'Negative', date: 'Apr 26' },
    { platform: 'Instagram', mention: 'Love the new dashboard design 🔥', sentiment: 'Positive', date: 'Apr 26' },
    { platform: 'News', mention: 'Company expands into new markets.', sentiment: 'Neutral', date: 'Apr 25' },
  ],
};

export const MARKET_DATA = {
  competitorContent: [
    { competitor: 'RivalCo', content: 'AI Strategy 2026', views: 92000, topic: 'AI & Strategy' },
    { competitor: 'TechLeader', content: 'Remote Work Playbook', views: 74000, topic: 'Culture' },
    { competitor: 'GrowthOS', content: 'SaaS Pricing Models', views: 61000, topic: 'Revenue' },
    { competitor: 'DataFirst', content: 'Analytics Deep Dive', views: 48000, topic: 'Data' },
  ],
  trendingTopics: ['AI Governance', 'Creator Economy', 'B2B SaaS Growth', 'Remote Leadership', 'ESG Reporting'],
  marketGaps: ['No competitor covers rural market insights', 'Underserved: SME decision-making tools', 'Gap in multilingual content strategy'],
  competitorTimeline: [
    { competitor: 'RivalCo', action: 'Launched new mobile app', date: 'Apr 25, 2026' },
    { competitor: 'TechLeader', action: 'Raised Series B funding', date: 'Apr 22, 2026' },
    { competitor: 'GrowthOS', action: 'Released pricing update', date: 'Apr 20, 2026' },
    { competitor: 'DataFirst', action: 'Partnership with AWS', date: 'Apr 18, 2026' },
  ],
};

export const DECISIONS_DATA = {
  decisions: [
    { decision: 'Approve Q2 marketing budget increase', owner: 'Max M.', date: 'Apr 20, 2026', followUpDate: 'Apr 27, 2026', status: 'Pending', department: 'Marketing' },
    { decision: 'Hire 3 senior engineers', owner: 'Yana S.', date: 'Apr 18, 2026', followUpDate: 'May 1, 2026', status: 'Open', department: 'Engineering' },
    { decision: 'Launch affiliate program', owner: 'Sasha G.', date: 'Apr 15, 2026', followUpDate: 'Apr 30, 2026', status: 'Closed', department: 'Sales' },
    { decision: 'Migrate to new cloud provider', owner: 'David Chen', date: 'Apr 10, 2026', followUpDate: 'May 10, 2026', status: 'Open', department: 'Engineering' },
    { decision: 'Update employee handbook', owner: 'Sarah J.', date: 'Apr 8, 2026', followUpDate: 'Apr 25, 2026', status: 'Pending', department: 'HR' },
  ],
  openCount: 2,
  dueTodayCount: 1,
};

export const CRISIS_DATA = {
  activeCrises: [
    { issue: 'Auth service degradation affecting 12% users', severity: 'Critical', owner: 'David Chen', status: 'In Progress', dateRaised: 'Apr 27, 2026' },
    { issue: 'Negative press coverage on pricing changes', severity: 'High', owner: 'Michael Torres', status: 'Monitoring', dateRaised: 'Apr 26, 2026' },
  ],
  legalIssues: [
    { issue: 'Data privacy compliance review', status: 'Under Review', deadline: 'May 15, 2026' },
    { issue: 'Contractor agreement dispute', status: 'Escalated', deadline: 'Apr 30, 2026' },
  ],
  prRisks: [
    { risk: 'Competitor spreading misinformation', severity: 'Medium', owner: 'PR Head' },
    { risk: 'Influencer partnership backlash', severity: 'Low', owner: 'Marketing Head' },
  ],
};

export const FEEDBACK_DATA = {
  feedbackSummary: { total: 1284, resolved: 892, pending: 392 },
  citizenFeedback: [
    { source: 'App Store', feedback: 'Dashboard is intuitive but needs dark mode', region: 'North', date: 'Apr 27', status: 'Open' },
    { source: 'Support Chat', feedback: 'Meeting scheduling is confusing for new users', region: 'South', date: 'Apr 26', status: 'In Review' },
    { source: 'Survey', feedback: 'Tasks page needs bulk actions', region: 'East', date: 'Apr 25', status: 'Resolved' },
    { source: 'Email', feedback: 'Notifications are too frequent', region: 'West', date: 'Apr 24', status: 'Open' },
    { source: 'App Store', feedback: 'Great product, needs offline mode', region: 'Rural', date: 'Apr 23', status: 'Pending' },
  ],
  ruralInsights: 'Rural users report connectivity issues affecting real-time sync. 34% of rural feedback mentions slow load times. Offline mode is the top requested feature from non-urban regions.',
  sentimentBreakdown: { positive: 58, neutral: 28, negative: 14 },
};
