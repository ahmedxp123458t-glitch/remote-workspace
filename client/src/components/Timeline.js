import React, { useState, useEffect } from 'react';

function Timeline() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => {});
  }, []);

  const statusIcons = { todo: '○', 'in-progress': '◐', done: '●' };

  return (
    <div>
      <h2>Project Timeline</h2>
      <div className="card">
        <div className="timeline-container">
          {tasks.map((task, i) => (
            <div key={task._id} className="timeline-item">
              <div className="timeline-dot">{statusIcons[task.status] || '○'}</div>
              <div className="timeline-content">
                <h4>{task.title}</h4>
                <p>Assignee: {task.assignee || 'Unassigned'} &middot; Status: {task.status}</p>
                {task.dueDate && <p style={{ color: '#e94560', fontSize: '0.85rem' }}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
              </div>
            </div>
          ))}
          {tasks.length === 0 && <div className="empty-state"><h3>No tasks to show</h3></div>}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
