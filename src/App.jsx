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
import Login from './components/Login.jsx';
import DailyMonitoringHub from './components/DailyMonitoringHub.jsx';
import DailyMonitoring from './components/DailyMonitoring.jsx';
import ManagerFeedback from './components/ManagerFeedback.jsx';
import Calendar from './components/Calendar.jsx';
import { INITIAL_MEMBERS } from './data/constants.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeManager, setActiveManager] = useState(null);
  const [topPage, setTopPage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [dailySubPage, setDailySubPage] = useState(null);
  const [members] = useState(INITIAL_MEMBERS);

  function handleLogin(userData) {
    setUser(userData);
    setAccessToken(userData.accessToken);
    setIsLoggedIn(true);
    
    if (userData.accessToken) {
      console.log('✅ Access token set for email notifications');
      // Store access token in sessionStorage for notification service
      sessionStorage.setItem('msalAccessToken', userData.accessToken);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUser(null);
    setAccessToken(null);
    sessionStorage.removeItem('msalAccessToken');
    console.log('✅ Logged out successfully');
  }

  function handleNavChange(nav) {
    setActiveNav(nav);
    setActiveManager(null);
    setTopPage(null);
    setShowProfile(false);
    setDailySubPage(null);
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
    if (activeNav === 'Daily Monitoring') {
      if (dailySubPage) return <DailyMonitoring subPage={dailySubPage} onBack={() => setDailySubPage(null)} />;
      return <DailyMonitoringHub onSelectSubPage={setDailySubPage} />;
    }
    if (activeNav === 'Board Members') return <BoardMembers onNavChange={handleNavChange} />;
    if (activeNav === 'Meetings') return <Meetings onNavChange={handleNavChange} />;
    if (activeNav === 'Calendar') return <Calendar />;
    if (activeNav === 'Tasks') return <Tasks />;
    if (activeNav === 'Interactions') return <Interactions members={members} />;
    if (activeNav === 'Feedback') return <ManagerFeedback onBack={() => handleNavChange('Dashboard')} />;
    return <ActivityTracking members={members} onNavChange={handleNavChange} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
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
        onLogout={handleLogout}
      />
      <div className="app-main">
        <TopBar onNavigate={handleTopNavigate} activePage={topPage} unreadCount={3} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
