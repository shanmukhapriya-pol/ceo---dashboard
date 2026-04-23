import { useState } from 'react';
import PropTypes from 'prop-types';

const AVATAR_COLORS = [
  { bg: '#f97316', text: '#fff' },
  { bg: '#a855f7', text: '#fff' },
  { bg: '#ec4899', text: '#fff' },
];

function MemberAvatar({ name, index }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <span style={{
      width: 36, height: 36, borderRadius: '50%',
      background: color.bg, color: color.text,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </span>
  );
}

function MemberStatus({ members }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', role: '', status: 'Active', notes: '' });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleClose = () => setShowAdd(false);

  return (
    <section className="member-status">
      <div className="member-status__header">
        <h2>Member Status</h2>
        <button className="member-status__new-btn" onClick={() => setShowAdd(true)}>+ New Member</button>
      </div>

      <ul className="member-status__list">
        {members.map((member, index) => (
          <li key={member.id} className="member-status__item">
            <span className="member-status__index">{index + 1}</span>
            <MemberAvatar name={member.name} index={index} />
            <div className="member-status__col">
              <span className="member-status__col-label">Name</span>
              <span className="member-status__col-value">{member.name}</span>
            </div>
            <div className="member-status__col">
              <span className="member-status__col-label">Work on</span>
              <span className="member-status__col-value member-status__work-on">
                <span className="member-status__dot" style={{ background: member.workColor }} />
                {member.currentWork}
              </span>
            </div>
            <div className="member-status__col member-status__col--access">
              <span className="member-status__col-label">Access</span>
              <span className="member-status__col-value">{member.role}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Member Overlay */}
      {showAdd && (
        <div className="overlay-backdrop" onClick={handleClose}>
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-panel__header">
              <div>
                <h2 className="overlay-panel__title">Add Board Member</h2>
                <p className="overlay-panel__subtitle">Fill in the details to add a new member</p>
              </div>
              <button type="button" className="overlay-panel__close" onClick={handleClose}>✕</button>
            </div>

            <form className="overlay-panel__form" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Profile Photo</label>
                <label className="overlay-photo-upload">
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setForm((f) => ({ ...f, photoName: file.name }));
                  }} />
                  <div className="overlay-photo-preview">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#94a3b8" strokeWidth="1.5"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="overlay-photo-info">
                    <span className="overlay-photo-btn">Upload Photo</span>
                    <span className="overlay-photo-hint">{form.photoName || 'JPG, PNG up to 5MB'}</span>
                  </div>
                </label>
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Full Name</label>
                <input className="overlay-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. David Chen" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Email Address</label>
                <input className="overlay-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. david@company.com" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Phone Number</label>
                <input className="overlay-input" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. +1 (555) 000-0000" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Department</label>
                <input className="overlay-input" name="department" value={form.department} onChange={handleChange} placeholder="e.g. Engineering" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Role / Title</label>
                <input className="overlay-input" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Independent Director" />
              </div>

              <div className="overlay-field">
                <label className="overlay-label">Status</label>
                <select className="overlay-input" name="status" value={form.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="overlay-field overlay-field--full">
                <label className="overlay-label">Notes</label>
                <textarea className="overlay-input overlay-textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional notes..." rows={2} />
              </div>

              <div className="overlay-panel__actions">
                <button type="button" className="bm-btn-outline" onClick={handleClose}>Cancel</button>
                <button type="submit" className="bm-add-btn">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

MemberStatus.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      currentWork: PropTypes.string.isRequired,
      workColor: PropTypes.string,
    })
  ).isRequired,
};

export default MemberStatus;
