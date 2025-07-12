import { useState, useEffect } from 'react';
import styles from '../styles/Chat.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const newHistoryEntry = {
        id: Date.now(),
        title: messages[0].text.substring(0, 30),
        messages,
      };
      const updatedHistory = [newHistoryEntry, ...history.filter(h => h.id !== newHistoryEntry.id)];
      setHistory(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages([...newMessages, { text: data.response.content, sender: 'ia' }]);
      }
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleDownloadChat = () => {
    const chatText = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className={styles.input}
          />
          <button onClick={handleSend} className={styles.sendButton}>
            Enviar
          </button>
        </div>
      </div>
      <div className={styles.sidebar}>
        <h2 className={styles.historyTitle}>Historial de Chat</h2>
        <div className={styles.historyList}>
          {history.map(h => (
            <div key={h.id} className={styles.historyItem} onClick={() => setMessages(h.messages)}>
              {h.title}
            </div>
          ))}
        </div>
        <button onClick={handleClearHistory} className={styles.actionButton}>Borrar Historial</button>
        <button onClick={handleDownloadChat} className={styles.actionButton}>Descargar Chat</button>
      </div>
    </div>
  );
}
