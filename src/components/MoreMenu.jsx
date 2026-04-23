import { useState, useRef, useEffect } from 'react';

/**
 * MoreMenu — reusable ··· dropdown
 * Props:
 *   items: [{ label, onClick }]  — defaults to Export / Filter / Refresh
 */
function MoreMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const defaultItems = [
    { label: '✏️ Edit', onClick: () => {} },
    { label: '🗑️ Delete', onClick: () => {} },
    { label: '📋 Duplicate', onClick: () => {} },
    { label: '🗓️ Reschedule', onClick: () => {} },
    { label: '👥 Manage Attendees', onClick: () => {} },
  ];

  const menuItems = items || defaultItems;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="more-menu" ref={ref}>
      <button
        type="button"
        className="bm-more-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="More options"
      >
        ⋮
      </button>
      {open && (
        <ul className="more-menu__dropdown">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="more-menu__item"
                onClick={() => { item.onClick(); setOpen(false); }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoreMenu;
