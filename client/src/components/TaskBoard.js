import React, { useState, useEffect } from 'react';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => {});
  }, []);

  const createTask = async () => {
    if (!title) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignee }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setTitle('');
    setAssignee('');
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const columns = ['todo', 'in-progress', 'done'];

  return (
    <div>
      <h2>Task Board</h2>
      <div className="card" style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Assignee" />
        <button className="btn btn-primary" onClick={createTask}>Add Task</button>
      </div>
      <div className="kanban-board">
        {columns.map(col => (
          <div key={col} className={`kanban-column ${col}`}>
            <h3>{col.replace('-', ' ')}</h3>
            {tasks.filter(t => t.status === col).map(task => (
              <div key={task._id} className="task-card" onClick={() => {
                const next = col === 'todo' ? 'in-progress' : col === 'in-progress' ? 'done' : 'todo';
                updateStatus(task._id, next);
              }}>
                <h4>{task.title}</h4>
                <span className="assignee">{task.assignee || 'Unassigned'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
