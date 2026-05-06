import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

const STATUS_COLORS = {
  'Closed Won': { bg: '#dcfce7', color: '#16a34a' },
  'Negotiation': { bg: '#dbeafe', color: '#1a3a8f' },
  'Proposal': { bg: '#ede9fe', color: '#7c3aed' },
  'Discovery': { bg: '#fef9c3', color: '#a16207' },
  'At Risk': { bg: '#fee2e2', color: '#dc2626' },
};

const EMPTY_DEAL_FORM = {
  deal: '',
  description: '',
  value: '',
  owner: 'Max M.',
  status: 'Discovery',
  expectedClose: '',
};

function RevenueIntelligence() {
  const pct = Math.round((REVENUE_DATA.dailyRevenue / REVENUE_DATA.target) * 100);
  const [pipelineDeals, setPipelineDeals] = useState(REVENUE_DATA.pipelineDeals);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [viewDeal, setViewDeal] = useState(null);
  const [dealForm, setDealForm] = useState(EMPTY_DEAL_FORM);

  const handleDealChange = (e) => {
    setDealForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAddDealSubmit = (e) => {
    e.preventDefault();
    
    // Format the value with ₹ symbol and proper formatting
    const numericValue = parseFloat(dealForm.value.replace(/[^0-9.]/g, ''));
    const formattedValue = `₹${(numericValue / 100000).toFixed(2)}L`;
    
    const newDeal = {
      deal: dealForm.deal,
      description: dealForm.description,
      value: formattedValue,
      owner: dealForm.owner,
      status: dealForm.status,
      expectedClose: new Date(dealForm.expectedClose).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };

    setPipelineDeals(prev => [...prev, newDeal]);
    setDealForm(EMPTY_DEAL_FORM);
    setShowAddDeal(false);
  };

  const deleteDeal = (index) => {
    setPipelineDeals(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Stats */}
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Daily Revenue</div>
            <div className="stats-value">₹{(REVENUE_DATA.dailyRevenue / 100000).toFixed(2)}L</div>
            <div className="stats-supplementary">{pct}% of ₹{(REVENUE_DATA.target / 100000).toFixed(2)}L target</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">💰</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Sponsorships</div>
            <div className="stats-value">{REVENUE_DATA.sponsorships.count}</div>
            <div className="stats-supplementary">₹{(REVENUE_DATA.sponsorships.value / 100000).toFixed(2)}L active value</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">🤝</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Subscriptions</div>
            <div className="stats-value">{REVENUE_DATA.subscriptions.count.toLocaleString()}</div>
            <div className="stats-supplementary">+{REVENUE_DATA.subscriptions.growth}% growth</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📈</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Pipeline Deals</div>
            <div className="stats-value">{pipelineDeals.length}</div>
            <div className="stats-supplementary">Active this week</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">📋</div>
        </div>
      </div>

      {/* Weekly Revenue Chart */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Weekly Revenue Trend</h2>
            <p className="bm-section__subtitle">Daily revenue vs rolling average</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={REVENUE_DATA.weeklyRevenue} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Line type="monotone" dataKey="revenue" stroke="#1a3a8f" strokeWidth={2.5} dot={{ r: 4, fill: '#1a3a8f', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline Deals Table */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Pipeline Deals</h2>
            <p className="bm-section__subtitle">Active deals and expected close dates</p>
          </div>
          <button type="button" className="bm-add-btn" onClick={() => setShowAddDeal(true)}>+ Add Deal</button>
        </div>
        <table className="bm-table">
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Value</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Expected Close</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pipelineDeals.map((d, i) => {
              const s = STATUS_COLORS[d.status] || { bg: '#f1f5f9', color: '#475569' };
              return (
                <tr key={i} onClick={() => setViewDeal(d)} style={{ cursor: 'pointer' }}>
                  <td style={{ maxWidth: 220 }}>
                    <div className="bm-member-name">{d.deal}</div>
                    {d.description && (
                      <div className="task-description">{d.description}</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 12 }}>{d.value}</td>
                  <td style={{ fontSize: 11, color: '#475569' }}>{d.owner}</td>
                  <td><span className="bm-badge" style={{ background: s.bg, color: s.color }}>{d.status}</span></td>
                  <td style={{ fontSize: 11, color: '#64748b' }}>{d.expectedClose}</td>
                  <td>
                    <button 
                      type="button" 
                      className="task-action-btn task-action-btn--delete" 
                      onClick={(e) => { e.stopPropagation(); deleteDeal(i); }} 
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Deal Modal */}
      {showAddDeal && (
        <div className="overlay-backdrop" onClick={() => setShowAddDeal(false)}>
          <div className="overlay-panel" onClick={e => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Add Pipeline Deal</h2>
                <p className="overlay-panel__subtitle">Create a new deal in the pipeline</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setShowAddDeal(false)}>✕</button>
            </div>
            <form className="overlay-panel__form" onSubmit={handleAddDealSubmit}>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Deal Name</label>
                <input 
                  className="overlay-input" 
                  name="deal" 
                  value={dealForm.deal} 
                  onChange={handleDealChange} 
                  placeholder="e.g. TechCorp Partnership" 
                  required 
                />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea 
                  className="overlay-input overlay-textarea" 
                  name="description" 
                  value={dealForm.description} 
                  onChange={handleDealChange} 
                  placeholder="Describe the deal details, scope, and key terms..." 
                  rows={2}
                />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Value (in ₹)</label>
                <input 
                  className="overlay-input" 
                  name="value" 
                  type="number" 
                  value={dealForm.value} 
                  onChange={handleDealChange} 
                  placeholder="e.g. 9960000" 
                  required 
                  min="0"
                  step="1000"
                />
                <p style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Enter amount in rupees (will be displayed in Lakhs)</p>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Owner</label>
                <select className="overlay-input" name="owner" value={dealForm.owner} onChange={handleDealChange}>
                  <option value="Max M.">Max M.</option>
                  <option value="Sasha G.">Sasha G.</option>
                  <option value="Yana S.">Yana S.</option>
                </select>
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" name="status" value={dealForm.status} onChange={handleDealChange}>
                  <option value="Discovery">Discovery</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Expected Close Date</label>
                <input 
                  className="overlay-input" 
                  name="expectedClose" 
                  type="date" 
                  value={dealForm.expectedClose} 
                  onChange={handleDealChange} 
                  required 
                />
              </div>
              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={() => setShowAddDeal(false)}>Cancel</button>
                <button type="submit" className="bm-add-btn">Add Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Deal Overlay (read-only) */}
      {viewDeal && (
        <div className="overlay-backdrop" onClick={() => setViewDeal(null)}>
          <div className="overlay-panel" onClick={e => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">{viewDeal.deal}</h2>
                <p className="overlay-panel__subtitle">Deal details</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={() => setViewDeal(null)}>✕</button>
            </div>
            <div className="overlay-panel__form">
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Deal Name</label>
                <input className="overlay-input" value={viewDeal.deal} readOnly />
              </div>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Description</label>
                <textarea 
                  className="overlay-input overlay-textarea" 
                  value={viewDeal.description || ''} 
                  readOnly 
                  rows={3}
                />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Value</label>
                <input className="overlay-input" value={viewDeal.value} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Owner</label>
                <input className="overlay-input" value={viewDeal.owner} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <input className="overlay-input" value={viewDeal.status} readOnly />
              </div>
              <div className="overlay-field">
                <label className="overlay-label">Expected Close Date</label>
                <input className="overlay-input" value={viewDeal.expectedClose} readOnly />
              </div>
              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={() => setViewDeal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BriefSection
        title="Revenue Daily Brief"
        defaultAttendees={['CEO', 'Finance Head', 'Sales Head']}
        discussionPlaceholder="Revenue gaps, sponsorship updates, pipeline blockers"
      />
    </>
  );
}

export default RevenueIntelligence;
