import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [senderId, setSenderId] = useState('User');
  const bottomRef = useRef(null);

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text) return;
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: '000000000000000000000001', senderId, text }),
    });
    const msg = await res.json();
    setMessages([...messages, msg]);
    setText('');
  };

  return (
    <div>
      <h2>Team Chat</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={msg._id || i} className={`chat-message ${msg.senderId === senderId ? 'own' : ''}`}>
              <div className="sender">{msg.senderId}</div>
              <div className="text">{msg.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input">
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
