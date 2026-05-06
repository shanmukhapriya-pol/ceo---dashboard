import React, { useState } from 'react';

const MANAGERS = ['Max Maraston', 'Sasha Glinsky', 'Yana Snezin'];

const RATING_LABELS = {
  1: 'Needs Significant Improvement',
  2: 'Below Expectations',
  3: 'Meets Expectations',
  4: 'Exceeds Expectations',
  5: 'Outstanding',
};

const RATING_COLORS = {
  1: '#ef4444',
  2: '#f97316',
  3: '#f59e0b',
  4: '#22c55e',
  5: '#16a34a',
};

const SECTIONS = [
  {
    id: 'leadership',
    icon: '🎯',
    title: 'Leadership & Vision',
    subtitle: 'Evaluate strategic direction, inspiration, and handling of uncertainty',
    questions: [
      { id: 'lv_goals',     type: 'rating',   label: 'How clearly does this manager communicate the team\'s goals and direction?' },
      { id: 'lv_inspire',   type: 'rating',   label: 'Does this manager inspire confidence and motivate the team?' },
      { id: 'lv_ambiguity', type: 'rating',   label: 'How effectively does this manager handle ambiguity and uncertainty?' },
      { id: 'lv_improve',   type: 'textarea', label: 'Areas where leadership can be strengthened:', hint: 'Be specific and constructive' },
    ],
  },
  {
    id: 'communication',
    icon: '💬',
    title: 'Communication & Collaboration',
    subtitle: 'Assess listening skills, transparency, and cross-functional teamwork',
    questions: [
      { id: 'cc_listen',      type: 'rating',   label: 'How well does this manager listen to team members\' concerns?' },
      { id: 'cc_transparent', type: 'rating',   label: 'Does this manager communicate decisions clearly and transparently?' },
      { id: 'cc_collab',      type: 'rating',   label: 'How effectively does this manager collaborate across departments?' },
      { id: 'cc_gaps',        type: 'textarea', label: 'Specific communication gaps observed:', hint: 'Include examples where possible' },
    ],
  },
  {
    id: 'emotional',
    icon: '🧠',
    title: 'Emotional Intelligence & People Skills',
    subtitle: 'Evaluate empathy, stress management, and conflict resolution',
    questions: [
      { id: 'ei_stress',   type: 'rating',   label: 'How well does this manager manage stress and pressure?' },
      { id: 'ei_empathy',  type: 'rating',   label: 'Does this manager show empathy and understanding toward team members?' },
      { id: 'ei_conflict', type: 'rating',   label: 'How does this manager handle conflict within the team?' },
      { id: 'ei_patterns', type: 'textarea', label: 'Behavioral patterns that need attention:', hint: 'Focus on observable behaviors, not personality' },
    ],
  },
  {
    id: 'decisions',
    icon: '⚖️',
    title: 'Decision Making & Accountability',
    subtitle: 'Assess judgment quality, ownership, and prioritization',
    questions: [
      { id: 'dm_quality',   type: 'rating',   label: 'How sound and timely are this manager\'s decisions?' },
      { id: 'dm_ownership', type: 'rating',   label: 'Does this manager take ownership of mistakes and learn from them?' },
      { id: 'dm_delegate',  type: 'rating',   label: 'How well does this manager prioritize tasks and delegate?' },
      { id: 'dm_gaps',      type: 'textarea', label: 'Gaps in decision-making or accountability:', hint: 'Describe specific situations if applicable' },
    ],
  },
  {
    id: 'growth',
    icon: '🌱',
    title: 'Growth & Development',
    subtitle: 'Evaluate openness to feedback, team development, and overall assessment',
    questions: [
      { id: 'gr_openness',     type: 'rating',   label: 'Is this manager open to feedback and willing to change?' },
      { id: 'gr_develop',      type: 'rating',   label: 'Does this manager actively develop their team members?' },
      { id: 'gr_improve3',     type: 'textarea', label: 'Top 3 things this manager should improve:', hint: 'Be direct and actionable' },
      { id: 'gr_strengths',    type: 'textarea', label: 'Greatest strengths of this manager:', hint: 'Highlight what should be preserved and amplified' },
      { id: 'gr_confidential', type: 'textarea', label: 'Confidential notes (not shared with the subject):', hint: 'For HR and senior leadership only' },
    ],
  },
];

function getSectionAvgScore(sectionId, answers) {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return 0;
  const ratingQs = section.questions.filter(q => q.type === 'rating');
  if (!ratingQs.length) return 0;
  const filled = ratingQs.filter(q => answers[q.id] > 0);
  if (!filled.length) return 0;
  return filled.reduce((sum, q) => sum + answers[q.id], 0) / filled.length;
}

function RatingRow({ questionId, value, onChange }) {
  const [hovered, setHovered] = useState(null);
  const active = hovered || value;
  return (
    <div>
      <div className="fb-rating-row">
        {[1, 2, 3, 4, 5].map(num => {
          const isSelected = value === num;
          const isHovered = hovered === num;
          return (
            <div
              key={num}
              className={`fb-rating-box${isSelected ? ' fb-rating-box--selected' : ''}`}
              style={isSelected ? { background: RATING_COLORS[num], borderColor: RATING_COLORS[num] } : isHovered ? { borderColor: RATING_COLORS[num], background: '#f8fafc' } : {}}
              onClick={() => onChange(questionId, num)}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(null)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onChange(questionId, num)}
              aria-pressed={isSelected}
            >
              <span className="fb-rating-box__num" style={isSelected ? { color: '#fff' } : {}}>{num}</span>
            </div>
          );
        })}
      </div>
      {active && (
        <div style={{ marginTop: 4, fontSize: 10, fontWeight: 600, color: RATING_COLORS[active] }}>
          {RATING_LABELS[active]}
        </div>
      )}
    </div>
  );
}

function SectionScoreBar({ label, score }) {
  const pct = score > 0 ? (score / 5) * 100 : 0;
  const color = score >= 4 ? '#22c55e' : score >= 3 ? '#f59e0b' : score > 0 ? '#ef4444' : '#e2e8f0';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: score > 0 ? '#1a3a8f' : '#94a3b8' }}>
          {score > 0 ? score.toFixed(1) + ' / 5' : 'N/A'}
        </span>
      </div>
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

function PastFeedbackCard({ feedback }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bm-section" style={{ marginBottom: 12, padding: '14px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setExpanded(v => !v)}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{feedback.fromManager} → {feedback.toManager}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>{feedback.date}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="bm-badge bm-badge--committee" style={{ fontSize: 10 }}>Avg {feedback.overallAvg.toFixed(1)} / 5</span>
          <span style={{ fontSize: 14, color: '#94a3b8' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        {SECTIONS.map(s => <SectionScoreBar key={s.id} label={s.title} score={getSectionAvgScore(s.id, feedback.answers)} />)}
      </div>
      {expanded && (
        <div style={{ marginTop: 14, borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
          {SECTIONS.map(section => (
            <div key={section.id} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{section.icon} {section.title}</div>
              {section.questions.map(q => (
                <div key={q.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>{q.label}</div>
                  {q.type === 'rating' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 28, height: 28, borderRadius: 6, background: feedback.answers[q.id] ? RATING_COLORS[feedback.answers[q.id]] : '#f1f5f9', color: feedback.answers[q.id] ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        {feedback.answers[q.id] || '—'}
                      </span>
                      {feedback.answers[q.id] && <span style={{ fontSize: 10, color: '#64748b' }}>{RATING_LABELS[feedback.answers[q.id]]}</span>}
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: '#334155', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 10px', lineHeight: 1.5 }}>
                      {feedback.answers[q.id] || <em style={{ color: '#94a3b8' }}>No response</em>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmitScreen({ lastFeedback, onSubmitAnother, submittedFeedbacks }) {
  const [showPast, setShowPast] = useState(false);
  return (
    <main className="main-content">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <polyline points="4,12 9,17 20,6" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Feedback Submitted</h2>
        <p style={{ fontSize: 12, color: '#64748b' }}>Your assessment has been recorded confidentially.</p>
      </div>

      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Assessment Summary</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16, padding: '12px 16px', background: '#f8fafc', borderRadius: 8 }}>
          <div><div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>From</div><div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{lastFeedback.fromManager}</div></div>
          <div style={{ fontSize: 20, color: '#cbd5e1', alignSelf: 'center' }}>→</div>
          <div><div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>To</div><div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{lastFeedback.toManager}</div></div>
          <div style={{ marginLeft: 'auto' }}><div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>Date</div><div style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{lastFeedback.date}</div></div>
        </div>
        {SECTIONS.map(s => <SectionScoreBar key={s.id} label={`${s.icon} ${s.title}`} score={getSectionAvgScore(s.id, lastFeedback.answers)} />)}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Overall Average</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#1a3a8f' }}>{lastFeedback.overallAvg.toFixed(1)} / 5</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <button className="bm-btn-outline" onClick={() => setShowPast(v => !v)}>
          {showPast ? 'Hide Past Feedback' : 'View Past Feedback'}
          {submittedFeedbacks.length > 0 && <span className="bm-badge bm-badge--committee" style={{ marginLeft: 8, fontSize: 10 }}>{submittedFeedbacks.length}</span>}
        </button>
        <button className="bm-add-btn" onClick={onSubmitAnother}>+ Submit Another</button>
      </div>

      {showPast && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Past Submissions</div>
          {submittedFeedbacks.length === 0
            ? <div className="bm-placeholder">No past feedback submissions yet.</div>
            : submittedFeedbacks.map((fb, idx) => <PastFeedbackCard key={idx} feedback={fb} />)
          }
        </div>
      )}
    </main>
  );
}

function ManagerFeedback({ onBack }) {
  const [fromManager, setFromManager] = useState('');
  const [toManager, setToManager] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [lastFeedback, setLastFeedback] = useState(null);

  function handleAnswer(questionId, value) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function handleSubmit() {
    const allScores = SECTIONS.flatMap(s => s.questions.filter(q => q.type === 'rating').map(q => answers[q.id] || 0));
    const filled = allScores.filter(v => v > 0);
    const overallAvg = filled.length > 0 ? filled.reduce((a, b) => a + b, 0) / filled.length : 0;
    const record = {
      fromManager, toManager, answers: { ...answers },
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      overallAvg,
    };
    setLastFeedback(record);
    setSubmittedFeedbacks(prev => [record, ...prev]);
    setSubmitted(true);
  }

  function handleSubmitAnother() {
    setFromManager(''); setToManager(''); setAnswers({});
    setSubmitted(false); setLastFeedback(null);
  }

  if (submitted && lastFeedback) {
    return <SubmitScreen lastFeedback={lastFeedback} onSubmitAnother={handleSubmitAnother} submittedFeedbacks={submittedFeedbacks} />;
  }

  const managersReady = fromManager && toManager && fromManager !== toManager;

  return (
    <main className="main-content">
      {/* Header */}
      <div className="bm-topbar-row">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Manager Feedback Assessment</h1>
          <p style={{ fontSize: 11, color: '#64748b' }}>Professional development feedback — confidential and constructive</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="bm-badge bm-badge--committee" style={{ fontSize: 11, padding: '5px 14px' }}>🔒 Confidential</span>
          <button className="dm-back-btn" onClick={onBack}>← Back</button>
        </div>
      </div>

      {/* Participants */}
      <div className="bm-section" style={{ marginBottom: 20 }}>
        <div className="bm-section__header" style={{ marginBottom: 16 }}>
          <div>
            <h2>Assessment Participants</h2>
            <p className="bm-section__subtitle">Select who is giving and receiving this feedback</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label className="overlay-label" style={{ display: 'block', marginBottom: 4 }}>Feedback From</label>
            <select className="overlay-input" value={fromManager} onChange={e => setFromManager(e.target.value)}>
              <option value="">Select manager...</option>
              {MANAGERS.map(m => <option key={m} value={m} disabled={m === toManager}>{m}</option>)}
            </select>
          </div>
          <div style={{ paddingBottom: 8, color: '#94a3b8', fontSize: 20 }}>→</div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label className="overlay-label" style={{ display: 'block', marginBottom: 4 }}>Feedback About</label>
            <select className="overlay-input" value={toManager} onChange={e => setToManager(e.target.value)}>
              <option value="">Select manager...</option>
              {MANAGERS.map(m => <option key={m} value={m} disabled={m === fromManager}>{m}</option>)}
            </select>
          </div>
        </div>
        {fromManager && toManager && fromManager === toManager && (
          <div style={{ marginTop: 8, fontSize: 11, color: '#ef4444' }}>A manager cannot give feedback about themselves.</div>
        )}
      </div>

      {/* Rating scale legend — sticky reference */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, padding: '10px 16px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginRight: 4, alignSelf: 'center' }}>Scale:</span>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 20, height: 20, borderRadius: 4, background: RATING_COLORS[n], color: '#fff', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</span>
            <span style={{ fontSize: 10, color: '#64748b' }}>{RATING_LABELS[n]}</span>
          </div>
        ))}
      </div>

      {/* All sections */}
      {SECTIONS.map((section, sIdx) => (
        <div key={section.id} className="bm-section" style={{ marginBottom: 20 }}>
          <div className="bm-section__header" style={{ marginBottom: 20 }}>
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                {section.title}
              </h2>
              <p className="bm-section__subtitle">{section.subtitle}</p>
            </div>
            <span className="bm-badge bm-badge--type" style={{ fontSize: 10 }}>Section {sIdx + 1} of {SECTIONS.length}</span>
          </div>

          {section.questions.map((q, qIdx) => (
            <div key={q.id} className="fb-question-block" style={{ borderBottom: qIdx < section.questions.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: 16, marginBottom: 16 }}>
              <div className="fb-question-label">{q.label}</div>
              {q.hint && <div className="fb-question-hint">{q.hint}</div>}
              {q.type === 'rating' ? (
                <RatingRow questionId={q.id} value={answers[q.id] || null} onChange={handleAnswer} />
              ) : (
                <textarea
                  className="overlay-input overlay-textarea"
                  rows={3}
                  value={answers[q.id] || ''}
                  onChange={e => handleAnswer(q.id, e.target.value)}
                  placeholder="Enter your response..."
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Submit */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <button className="dm-back-btn" onClick={onBack}>← Cancel</button>
        <button
          className="bm-add-btn"
          onClick={handleSubmit}
          disabled={!managersReady}
          style={{ opacity: managersReady ? 1 : 0.5, cursor: managersReady ? 'pointer' : 'not-allowed', padding: '10px 28px', fontSize: 12 }}
        >
          ✓ Submit Feedback Assessment
        </button>
      </div>
      {!managersReady && (
        <div style={{ textAlign: 'right', fontSize: 11, color: '#94a3b8', marginTop: -24, marginBottom: 24 }}>
          Please select two different managers to submit.
        </div>
      )}
    </main>
  );
}

export default ManagerFeedback;
