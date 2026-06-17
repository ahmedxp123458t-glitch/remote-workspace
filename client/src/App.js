import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TeamList from './components/TeamList';
import TaskBoard from './components/TaskBoard';
import Chat from './components/Chat';
import Notes from './components/Notes';
import Timeline from './components/Timeline';
import Notifications from './components/Notifications';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('tasks');

  const renderView = () => {
    switch (activeView) {
      case 'teams': return <TeamList />;
      case 'tasks': return <TaskBoard />;
      case 'chat': return <Chat />;
      case 'notes': return <Notes />;
      case 'timeline': return <Timeline />;
      case 'notifications': return <Notifications />;
      default: return <TaskBoard />;
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
