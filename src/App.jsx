import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import BoardMembers from './components/BoardMembers.jsx';
import Meetings from './components/Meetings.jsx';
import ManagerProfile from './components/ManagerProfile.jsx';
import ActivityTracking from './components/ActivityTracking.jsx';
import Tasks from './components/Tasks.jsx';
import Interactions from './components/Interactions.jsx';
import Notifications from './components/Notifications.jsx';
import Settings from './components/Settings.jsx';
import TopBar from './components/TopBar.jsx';
import UserProfile from './components/UserProfile.jsx';
import { INITIAL_MEMBERS } from './data/constants.js';

function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeManager, setActiveManager] = useState(null);
  const [topPage, setTopPage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [members] = useState(INITIAL_MEMBERS);

  function handleNavChange(nav) {
    setActiveNav(nav);
    setActiveManager(null);
    setTopPage(null);
    setShowProfile(false);
  }

  function handleManagerClick(name) {
    setActiveManager(name);
    setTopPage(null);
    setShowProfile(false);
  }

  function handleTopNavigate(page) {
    setTopPage((prev) => (prev === page ? null : page));
    setActiveManager(null);
    setShowProfile(false);
  }

  function renderPage() {
    if (showProfile) return <UserProfile onClose={() => setShowProfile(false)} />;
    if (topPage === 'Notifications') return <Notifications />;
    if (topPage === 'Settings') return <Settings />;
    if (activeManager) return <ManagerProfile managerName={activeManager} onNavChange={handleNavChange} />;
    if (activeNav === 'Board Members') return <BoardMembers onNavChange={handleNavChange} />;
    if (activeNav === 'Meetings') return <Meetings onNavChange={handleNavChange} />;
    if (activeNav === 'Tasks') return <Tasks />;
    if (activeNav === 'Interactions') return <Interactions members={members} />;
    return <ActivityTracking members={members} onNavChange={handleNavChange} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        members={members}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        onManagerClick={handleManagerClick}
        activeManager={activeManager}
        onProfileClick={() => { setShowProfile(true); setTopPage(null); setActiveManager(null); }}
      />
      <div className="app-main">
        <TopBar onNavigate={handleTopNavigate} activePage={topPage} unreadCount={3} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
