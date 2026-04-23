import { useRef } from 'react';

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Operations', 'Sales', 'Product'];

/**
 * AttendeesBuilder
 * Props:
 *   attendees: [{ name, department, avatar }]
 *   onChange: (updatedList) => void
 */
function AttendeesBuilder({ attendees = [], onChange, showHeading = true }) {
  const fileRefs = useRef({});

  function add() {
    onChange([...attendees, { name: '', department: 'Engineering', avatar: null, preview: null }]);
  }

  function remove(i) {
    onChange(attendees.filter((_, idx) => idx !== i));
  }

  function update(i, field, value) {
    onChange(attendees.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  }

  function handleFile(i, e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => update(i, 'preview', ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="att-builder">
      {showHeading && <span className="overlay-label" style={{ marginBottom: 6, display: 'block' }}>Assigned To</span>}
      {attendees.map((a, i) => (
        <div key={i} className="att-builder__row">
          {/* Avatar upload */}
          <div className="att-builder__avatar-wrap" onClick={() => fileRefs.current[i]?.click()}>
            {(a.preview || a.avatar)
              ? <img src={a.preview || a.avatar} alt="avatar" className="att-builder__avatar-img" />
              : <span className="att-builder__avatar-placeholder">
                  {a.name ? a.name.charAt(0).toUpperCase() : '?'}
                </span>
            }
            <span className="att-builder__avatar-edit">📷</span>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={el => fileRefs.current[i] = el}
              onChange={e => handleFile(i, e)}
            />
          </div>

          {/* Name */}
          <input
            className="overlay-input att-builder__name"
            placeholder="Full name"
            value={a.name}
            onChange={e => update(i, 'name', e.target.value)}
          />

          {/* Department */}
          <input
            className="overlay-input att-builder__dept"
            placeholder="Department"
            value={a.department}
            onChange={e => update(i, 'department', e.target.value)}
          />

          {/* Remove */}
          <button type="button" className="att-builder__remove" onClick={() => remove(i)}>✕</button>
        </div>
      ))}

      <button type="button" className="att-builder__add" onClick={add}>+ Add</button>

      {/* Preview chips */}
      {attendees.length > 0 && (
        <div className="att-builder__chips">
          {attendees.map((a, i) => (
            <div key={i} className="att-builder__chip">
              {(a.preview || a.avatar)
                ? <img src={a.preview || a.avatar} alt={a.name} className="att-builder__chip-img" />
                : <span className="att-builder__chip-initial">{a.name ? a.name.charAt(0).toUpperCase() : '?'}</span>
              }
              <span className="att-builder__chip-name">{a.name || 'Unnamed'}</span>
              <span className="att-builder__chip-dept">{a.department}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttendeesBuilder;
