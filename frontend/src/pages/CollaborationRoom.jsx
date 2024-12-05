import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MonacoEditor from '@monaco-editor/react';
import './CollaborationRoom.css';

const socket = io('http://localhost:5000'); // Backend server URL

const CollaborationRoom = () => {
  const [code, setCode] = useState('// Start coding...');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Listen for code updates
    socket.on('codeUpdate', (updatedCode) => {
      setCode(updatedCode);
    });

    // Listen for chat messages
    socket.on('chatMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('codeUpdate', newCode);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit('chatMessage', inputMessage);
      setMessages((prev) => [...prev, `You: ${inputMessage}`]);
      setInputMessage('');
    }
  };

  return (
    <div className="collaboration-container">
      <div className="editor-container">
        <h2>Real-Time Code Editor</h2>
        <MonacoEditor
          height="400px"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          onChange={handleCodeChange}
        />
      </div>
      <div className="chat-container">
        <h2>Chat Box</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CollaborationRoom;
