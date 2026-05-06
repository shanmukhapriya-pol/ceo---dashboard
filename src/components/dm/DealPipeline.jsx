import React, { useState } from 'react';
import { PIPELINE_DATA } from '../../data/dailyMonitoringData.js';
import BriefSection from './BriefSection.jsx';

function DealPipeline() {
  const [kanbanData, setKanbanData] = useState(PIPELINE_DATA.kanban);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);

  const handleDragStart = (e, item, columnKey) => {
    setDraggedItem(item);
    setDraggedFromColumn(columnKey);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
    setDraggedFromColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnKey) => {
    e.preventDefault();
    
    if (!draggedItem || !draggedFromColumn) return;
    
    // Don't do anything if dropped in the same column
    if (draggedFromColumn === targetColumnKey) return;

    // Create a new kanban data object
    const newKanbanData = {
      lead: [...kanbanData.lead],
      proposal: [...kanbanData.proposal],
      closed: [...kanbanData.closed],
    };

    // Remove item from source column
    newKanbanData[draggedFromColumn] = newKanbanData[draggedFromColumn].filter(
      item => item.name !== draggedItem.name
    );

    // Add item to target column
    newKanbanData[targetColumnKey].push(draggedItem);

    setKanbanData(newKanbanData);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.currentTarget.style.background = '#f1f5f9';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.background = '';
  };

  return (
    <>
      <div className="main-content__row">
        <div className="stats-card bm-stat-card bm-stat-card--blue">
          <div className="bm-stat-card__body">
            <div className="stats-label">Total Leads</div>
            <div className="stats-value">{PIPELINE_DATA.totalLeads}</div>
            <div className="stats-supplementary">In pipeline</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--blue">🎯</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--purple">
          <div className="bm-stat-card__body">
            <div className="stats-label">Proposals Sent</div>
            <div className="stats-value">{PIPELINE_DATA.proposalsSent}</div>
            <div className="stats-supplementary">Awaiting response</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--purple">📤</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--green">
          <div className="bm-stat-card__body">
            <div className="stats-label">Deals Closed</div>
            <div className="stats-value">{PIPELINE_DATA.dealsClosed}</div>
            <div className="stats-supplementary">This month</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--green">✅</div>
        </div>
        <div className="stats-card bm-stat-card bm-stat-card--orange">
          <div className="bm-stat-card__body">
            <div className="stats-label">Closure Rate</div>
            <div className="stats-value">{PIPELINE_DATA.closureRate}%</div>
            <div className="stats-supplementary">Monthly average</div>
          </div>
          <div className="bm-stat-card__icon bm-stat-card__icon--orange">📊</div>
        </div>
      </div>

      {/* Kanban */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header">
          <div>
            <h2>Deal Kanban Board</h2>
            <p className="bm-section__subtitle">Current deal stages</p>
          </div>
        </div>
        <div className="dm-kanban">
          {[
            { label: '🎯 Lead', key: 'lead', color: '#dbeafe' },
            { label: '📤 Proposal', key: 'proposal', color: '#ede9fe' },
            { label: '✅ Closed', key: 'closed', color: '#dcfce7' },
          ].map(col => (
            <div 
              key={col.key} 
              className="dm-kanban-col" 
              style={{ borderTop: `3px solid ${col.key === 'lead' ? '#3b82f6' : col.key === 'proposal' ? '#a855f7' : '#22c55e'}` }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.key)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <div className="dm-kanban-col__title">{col.label} ({kanbanData[col.key].length})</div>
              {kanbanData[col.key].map((item, i) => (
                <div 
                  key={i} 
                  className="dm-kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, col.key)}
                  onDragEnd={handleDragEnd}
                  style={{ cursor: 'grab' }}
                >
                  {item.name}
                  <div className="dm-kanban-card__sub">{item.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <BriefSection
        title="Sales Daily Brief"
        defaultAttendees={['CEO', 'Sales Head', 'BD Team']}
        discussionPlaceholder="Hot deals, pipeline blockers, closure targets"
      />
    </>
  );
}

export default DealPipeline;
