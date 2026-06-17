import React, { useState, useEffect } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(() => {});
  }, []);

  const saveNote = async () => {
    if (!title) return;
    if (editingId) {
      const res = await fetch(`/api/notes/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const updated = await res.json();
      setNotes(notes.map(n => (n._id === editingId ? updated : n)));
      setEditingId(null);
    } else {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: '000000000000000000000001', title, content }),
      });
      const note = await res.json();
      setNotes([...notes, note]);
    }
    setTitle('');
    setContent('');
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(n => n._id !== id));
  };

  const editNote = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div>
      <h2>Shared Notes</h2>
      <div className="card">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Note content" />
        <button className="btn btn-primary" onClick={saveNote}>{editingId ? 'Update' : 'Add'} Note</button>
        {editingId && <button className="btn btn-secondary" style={{ marginLeft: 10 }} onClick={() => { setEditingId(null); setTitle(''); setContent(''); }}>Cancel</button>}
      </div>
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note._id} className="note-card">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => editNote(note)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
