import React, { useState, useEffect } from 'react';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(() => {});
  }, []);

  const createTeam = async () => {
    if (!name) return;
    const res = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const team = await res.json();
    setTeams([...teams, team]);
    setName('');
  };

  return (
    <div>
      <h2>Teams</h2>
      <div className="card" style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Team name" />
        <button className="btn btn-primary" onClick={createTeam}>Create Team</button>
      </div>
      <div className="notes-grid">
        {teams.map(team => (
          <div key={team._id} className="card">
            <h3>{team.name}</h3>
            <p style={{ color: '#888' }}>{team.members?.length || 0} members</p>
          </div>
        ))}
        {teams.length === 0 && <div className="empty-state"><h3>No teams yet</h3></div>}
      </div>
    </div>
  );
}

export default TeamList;
