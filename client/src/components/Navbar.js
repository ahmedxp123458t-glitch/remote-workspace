import React from 'react';

function Navbar({ activeView, setActiveView }) {
  const links = [
    { id: 'teams', label: 'Teams' },
    { id: 'tasks', label: 'Task Board' },
    { id: 'chat', label: 'Chat' },
    { id: 'notes', label: 'Notes' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <nav className="navbar">
      <h2>Remote Workspace</h2>
      <ul>
        {links.map(link => (
          <li
            key={link.id}
            className={activeView === link.id ? 'active' : ''}
            onClick={() => setActiveView(link.id)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
