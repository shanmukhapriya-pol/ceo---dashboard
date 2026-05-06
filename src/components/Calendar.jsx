import React, { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const EVENT_TYPES = [
  { name: 'Meetings', color: '#3b82f6', count: 24 },
  { name: 'Tasks', color: '#a855f7', count: 18 },
  { name: 'Reviews', color: '#22c55e', count: 12 },
  { name: 'Deadlines', color: '#f97316', count: 8 }
];

const SAMPLE_EVENTS = {
  1: [{ title: 'Team Me...', type: 'meeting', color: '#3b82f6' }],
  2: [],
  3: [
    { title: 'Task Revi...', type: 'task', color: '#a855f7' },
    { title: 'Q1 Planning', type: 'review', color: '#22c55e' }
  ],
  4: [],
  5: [{ title: 'Client Call', type: 'meeting', color: '#3b82f6' }],
  6: [],
  8: [{ title: 'Deadline', type: 'deadline', color: '#f97316' }],
  10: [{ title: 'Board Me...', type: 'meeting', color: '#3b82f6' }],
  12: [{ title: 'Sprint Rev...', type: 'task', color: '#a855f7' }],
  15: [{ title: 'Performan...', type: 'review', color: '#22c55e' }],
  17: [
    { title: 'Strategy ...', type: 'meeting', color: '#3b82f6' },
    { title: 'Task Assi...', type: 'task', color: '#a855f7' }
  ],
  18: [
    { title: 'All Hands', type: 'meeting', color: '#3b82f6' },
    { title: 'Report Due', type: 'deadline', color: '#f97316' }
  ],
  22: [{ title: 'Weekly S...', type: 'task', color: '#a855f7' }],
  24: [{ title: 'Stakehol...', type: 'meeting', color: '#3b82f6' }],
  26: [{ title: 'Budget Re...', type: 'review', color: '#22c55e' }],
  29: [{ title: 'Task Plan...', type: 'task', color: '#a855f7' }],
  31: [{ title: 'Month End', type: 'deadline', color: '#f97316' }]
};

const TODAYS_EVENTS = [
  {
    title: 'All Hands Meeting',
    time: '10:00 AM',
    organizer: 'Sarah Mitchell',
    attendees: [
      'https://i.pravatar.cc/40?img=1',
      'https://i.pravatar.cc/40?img=2',
      'https://i.pravatar.cc/40?img=3'
    ],
    moreCount: 5,
    type: 'meeting'
  },
  {
    title: 'Q4 Report Due',
    time: '5:00 PM',
    organizer: 'James Rodriguez',
    priority: 'High Priority',
    type: 'deadline'
  }
];

const UPCOMING_EVENTS = [
  {
    date: 'JAN 22',
    title: 'Weekly Team Sync',
    organizer: 'Emily Chen',
    time: '2:00 PM'
  }
];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 18));
  const [view, setView] = useState('Month');
  const [selectedManager, setSelectedManager] = useState('All Management');
  const [selectedEventType, setSelectedEventType] = useState('All Event Types');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2024, 0, 18));
  };

  const handleDayClick = (day, isOtherMonth) => {
    if (isOtherMonth) return;
    setSelectedDate({ day, month, year });
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedDate(null);
  };

  const getEventsForDate = (day) => {
    return SAMPLE_EVENTS[day] || [];
  };

  const handleDayClick = (day, isOtherMonth) => {
    if (isOtherMonth) return;
    setSelectedDay(day);
    console.log(`Clicked on day ${day} of ${MONTHS[month]} ${year}`);
    // You can add more functionality here, like opening a modal or showing event details
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      days.push(
        <div 
          key={`prev-${i}`} 
          className="cal-day cal-day--other-month cal-day--clickable"
          onClick={() => handleDayClick(prevDay, true)}
        >
          <span className="cal-day__number">{prevDay}</span>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const isSelected = day === selectedDay;
      const events = SAMPLE_EVENTS[day] || [];
      
      days.push(
        <div 
          key={day} 
          className={`cal-day cal-day--clickable${isToday ? ' cal-day--today' : ''}${isSelected ? ' cal-day--selected' : ''}`}
          onClick={() => handleDayClick(day, false)}
        >
          <span className="cal-day__number">{day}</span>
          <div className="cal-day__events">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="cal-event"
                style={{ backgroundColor: event.color + '20', color: event.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Clicked on event: ${event.title}`);
                }}
              >
                <span className="cal-event__icon">
                  {event.type === 'meeting' && '🎯'}
                  {event.type === 'task' && '📋'}
                  {event.type === 'review' && '✅'}
                  {event.type === 'deadline' && '⚠️'}
                </span>
                <span className="cal-event__title">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div 
          key={`next-${day}`} 
          className="cal-day cal-day--other-month cal-day--clickable"
          onClick={() => handleDayClick(day, true)}
        >
          <span className="cal-day__number">{day}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="main-content">
      <div className="cal-header">
        <div className="cal-header__left">
          <h1 className="cal-title">Management Calendar</h1>
          <p className="cal-subtitle">Track activities, meetings, and task assignments</p>
        </div>
        <div className="cal-header__right">
          <div className="cal-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search events..." />
          </div>
          <button className="cal-notif-btn">
            🔔
            <span className="cal-notif-dot"></span>
          </button>
          <button className="cal-add-btn">+ Add Event</button>
        </div>
      </div>

      <div className="cal-controls">
        <div className="cal-controls__left">
          <button className="cal-nav-btn" onClick={handlePrevMonth}>‹</button>
          <h2 className="cal-month-year">{MONTHS[month]} {year}</h2>
          <button className="cal-nav-btn" onClick={handleNextMonth}>›</button>
          <button className="cal-today-btn" onClick={handleToday}>Today</button>
        </div>
        <div className="cal-controls__right">
          <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)} className="cal-filter">
            <option>All Management</option>
            <option>Max Maraston</option>
            <option>Yana Snezin</option>
            <option>Sarah Mitchell</option>
          </select>
          <select value={selectedEventType} onChange={(e) => setSelectedEventType(e.target.value)} className="cal-filter">
            <option>All Event Types</option>
            <option>Meetings</option>
            <option>Tasks</option>
            <option>Reviews</option>
            <option>Deadlines</option>
          </select>
          <div className="cal-view-tabs">
            {['Month', 'Week', 'Day', 'List'].map((v) => (
              <button
                key={v}
                className={`cal-view-tab${view === v ? ' cal-view-tab--active' : ''}`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cal-layout">
        <div className="cal-main cal-main--full">
          <div className="cal-grid">
            {DAYS.map((day) => (
              <div key={day} className="cal-day-header">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Event Overlay */}
      {showOverlay && selectedDate && (
        <div className="cal-overlay" onClick={closeOverlay}>
          <div className="cal-overlay__content" onClick={(e) => e.stopPropagation()}>
            <div className="cal-overlay__header">
              <h2 className="cal-overlay__title">
                {MONTHS[selectedDate.month]} {selectedDate.day}, {selectedDate.year}
              </h2>
              <button className="cal-overlay__close" onClick={closeOverlay}>×</button>
            </div>
            <div className="cal-overlay__body">
              {getEventsForDate(selectedDate.day).length > 0 ? (
                <div className="cal-overlay__events">
                  {getEventsForDate(selectedDate.day).map((event, idx) => (
                    <div key={idx} className="cal-overlay__event" style={{ borderLeftColor: event.color }}>
                      <div className="cal-overlay__event-icon" style={{ color: event.color }}>
                        {event.type === 'meeting' && '🎯'}
                        {event.type === 'task' && '📋'}
                        {event.type === 'review' && '✅'}
                        {event.type === 'deadline' && '⚠️'}
                      </div>
                      <div className="cal-overlay__event-details">
                        <h3 className="cal-overlay__event-title">{event.title}</h3>
                        <p className="cal-overlay__event-type">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cal-overlay__empty">
                  <p>No events scheduled for this date</p>
                </div>
              )}
            </div>
            <div className="cal-overlay__footer">
              <button className="cal-overlay__add-btn">+ Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
