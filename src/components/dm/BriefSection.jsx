import React, { useState } from 'react';

const AVATAR_COLORS = ['#1a3a8f','#f97316','#a855f7','#22c55e','#ec4899','#0ea5e9'];

function AttendeeChip({ name, index, onRemove }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="dm-brief-attendee">
      <span className="dm-brief-attendee__avatar" style={{ background: bg }}>{initials}</span>
      <span className="dm-brief-attendee__name">{name}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 12, padding: '0 0 0 4px' }}>✕</button>
      )}
    </div>
  );
}

function BriefSection({ title, defaultAttendees, discussionPlaceholder }) {
  const [attendees, setAttendees] = useState(defaultAttendees);
  const [addingNew, setAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [notes, setNotes] = useState(discussionPlaceholder);
  const [scheduled, setScheduled] = useState(false);

  function addAttendee() {
    if (newName.trim()) {
      setAttendees(prev => [...prev, newName.trim()]);
      setNewName('');
      setAddingNew(false);
    }
  }

  return (
    <div className="dm-brief-section">
      <div className="dm-brief-header">
        <h2>📅 {title}</h2>
        <p>Quick daily standup — review key points and schedule your brief</p>
      </div>
      <div className="dm-brief-body">
        {/* Attendees */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Attendees</div>
          <div className="dm-brief-attendees">
            {attendees.map((a, i) => (
              <AttendeeChip
                key={i}
                name={a}
                index={i}
                onRemove={i >= defaultAttendees.length ? () => setAttendees(prev => prev.filter((_, idx) => idx !== i)) : null}
              />
            ))}
            {addingNew ? (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  className="overlay-input"
                  style={{ width: 140, padding: '4px 8px', fontSize: 11 }}
                  placeholder="Name..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addAttendee()}
                  autoFocus
                />
                <button type="button" className="bm-add-btn" style={{ padding: '4px 10px', fontSize: 10 }} onClick={addAttendee}>Add</button>
                <button type="button" className="bm-btn-outline" style={{ padding: '4px 8px', fontSize: 10 }} onClick={() => { setAddingNew(false); setNewName(''); }}>✕</button>
              </div>
            ) : (
              <button type="button" className="dm-brief-add-btn" onClick={() => setAddingNew(true)}>+ Add Attendee</button>
            )}
          </div>
        </div>

        {/* Discussion points */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Discussion Points</div>
          <textarea
            className="dm-brief-textarea"
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="dm-brief-actions">
          <button
            type="button"
            className={`dm-brief-schedule-btn${scheduled ? ' dm-brief-schedule-btn--done' : ''}`}
            onClick={() => setScheduled(v => !v)}
          >
            {scheduled ? '✅ Scheduled' : '📅 Schedule Brief'}
          </button>
          {scheduled && (
            <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>Brief added to your calendar</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BriefSection;
