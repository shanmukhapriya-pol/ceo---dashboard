import React, { useState } from 'react';

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`settings-toggle${checked ? ' settings-toggle--on' : ''}`}
    >
      <span className="settings-toggle__thumb" />
    </button>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="settings-section">
      <div className="settings-section__head">
        <h2 className="settings-section__title">{title}</h2>
        {subtitle && <p className="settings-section__subtitle">{subtitle}</p>}
      </div>
      <div className="settings-section__body">{children}</div>
    </div>
  );
}

function Row({ label, desc, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row__info">
        <span className="settings-row__label">{label}</span>
        {desc && <span className="settings-row__desc">{desc}</span>}
      </div>
      <div className="settings-row__control">{children}</div>
    </div>
  );
}

function Settings() {
  const [profile, setProfile] = useState({ name: 'AmirBaqian', email: 'amir@managic.io', role: 'Product Manager' });
  const [notif, setNotif] = useState({ email: true, push: true, meetings: true, tasks: false, mentions: true, weekly: false });
  const [appearance, setAppearance] = useState({ theme: 'light', density: 'comfortable', language: 'English' });
  const [privacy, setPrivacy] = useState({ activity: true, analytics: false, twofa: false });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="main-content">
      <div className="bm-topbar-row">
        <header className="main-content__header" style={{ marginBottom: 0 }}>
          <h1>Settings</h1>
          <p className="main-content__subtitle">Manage your account preferences and application settings.</p>
        </header>
        <button className="bm-add-btn" onClick={handleSave}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      {/* Profile */}
      <Section title="Profile" subtitle="Update your personal information.">
        <div className="settings-profile-row">
          <div className="settings-avatar">
            <img src="https://i.pravatar.cc/72?img=12" alt="avatar" className="settings-avatar__img" />
            <button className="settings-avatar__change">Change</button>
          </div>
          <div className="settings-profile-fields">
            <div className="settings-field-group">
              <div className="settings-field">
                <label className="settings-label">Full Name</label>
                <input className="settings-input" value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="settings-field">
                <label className="settings-label">Email</label>
                <input className="settings-input" type="email" value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Role</label>
              <input className="settings-input" value={profile.role} onChange={(e) => setProfile(p => ({ ...p, role: e.target.value }))} />
            </div>
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" subtitle="Choose what you want to be notified about.">
        <Row label="Email Notifications" desc="Receive updates via email">
          <Toggle checked={notif.email} onChange={(v) => setNotif(p => ({ ...p, email: v }))} />
        </Row>
        <Row label="Push Notifications" desc="Browser push alerts">
          <Toggle checked={notif.push} onChange={(v) => setNotif(p => ({ ...p, push: v }))} />
        </Row>
        <Row label="Meeting Reminders" desc="Get notified before scheduled meetings">
          <Toggle checked={notif.meetings} onChange={(v) => setNotif(p => ({ ...p, meetings: v }))} />
        </Row>
        <Row label="Task Updates" desc="Alerts when tasks are assigned or updated">
          <Toggle checked={notif.tasks} onChange={(v) => setNotif(p => ({ ...p, tasks: v }))} />
        </Row>
        <Row label="Mentions" desc="When someone mentions you in a comment">
          <Toggle checked={notif.mentions} onChange={(v) => setNotif(p => ({ ...p, mentions: v }))} />
        </Row>
        <Row label="Weekly Digest" desc="Summary email every Monday morning">
          <Toggle checked={notif.weekly} onChange={(v) => setNotif(p => ({ ...p, weekly: v }))} />
        </Row>
      </Section>

      {/* Appearance */}
      <Section title="Appearance" subtitle="Customize how the app looks and feels.">
        <Row label="Theme">
          <div className="settings-radio-group">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                type="button"
                className={`settings-radio-btn${appearance.theme === t ? ' settings-radio-btn--active' : ''}`}
                onClick={() => setAppearance(p => ({ ...p, theme: t }))}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Density" desc="Controls spacing throughout the interface">
          <div className="settings-radio-group">
            {['compact', 'comfortable', 'spacious'].map((d) => (
              <button
                key={d}
                type="button"
                className={`settings-radio-btn${appearance.density === d ? ' settings-radio-btn--active' : ''}`}
                onClick={() => setAppearance(p => ({ ...p, density: d }))}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Language">
          <select
            className="settings-select"
            value={appearance.language}
            onChange={(e) => setAppearance(p => ({ ...p, language: e.target.value }))}
          >
            {['English', 'French', 'German', 'Spanish', 'Arabic'].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </Row>
      </Section>

      {/* Privacy & Security */}
      <Section title="Privacy & Security" subtitle="Control your data and account security settings.">
        <Row label="Activity Visibility" desc="Allow others to see your activity status">
          <Toggle checked={privacy.activity} onChange={(v) => setPrivacy(p => ({ ...p, activity: v }))} />
        </Row>
        <Row label="Usage Analytics" desc="Share anonymous usage data to improve the product">
          <Toggle checked={privacy.analytics} onChange={(v) => setPrivacy(p => ({ ...p, analytics: v }))} />
        </Row>
        <Row label="Two-Factor Authentication" desc="Add an extra layer of security to your account">
          <Toggle checked={privacy.twofa} onChange={(v) => setPrivacy(p => ({ ...p, twofa: v }))} />
        </Row>
      </Section>
    </main>
  );
}

export default Settings;
