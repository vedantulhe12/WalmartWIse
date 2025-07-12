import React, { useState, useRef, useEffect } from "react";
import "./chatDrawer.css";
import { layouts } from "../../data/layout";

// Material-UI Icons
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';

export default function ChatDrawer({ open, onClose, store }) {
  const [msgs, setMsgs] = useState([
    { 
      from: "bot", 
      text: "Hi there 👋 What can I help you find in the store?", 
      timestamp: new Date().toLocaleTimeString() 
    },
  ]);
  const [inp, setInp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottom = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [inp]);

  const send = async () => {
    if (!inp.trim() || isLoading) return;

    const userText = inp.trim();
    const timestamp = new Date().toLocaleTimeString();
    
    setInp("");
    setIsLoading(true);
    
    // Add user message
    setMsgs((m) => [...m, { from: "user", text: userText, timestamp }]);

    // 🧠 LOG: Full store object
    console.log("📦 Received store:", store);

    // 🧠 LOG: Layout key
    const layoutKey = store?.layout;
    console.log("🔑 Layout key:", layoutKey);

    // 🧠 LOG: Layout data from imported layouts
    const layoutData = layouts[layoutKey];
    console.log("📐 Layout data from layouts.js:", layoutData);

    // 🧠 LOG: Layout sections
    const layoutSections = layoutData?.sections || [];
    console.log("📍 Layout sections:", layoutSections);

    // 💬 Build layout description
    const layoutText = layoutSections
      .map(
        (section) =>
          `${section.name}: Located at (x=${section.x}, y=${section.y})`
      )
      .join("\n");

    // 🧠 LOG: Final layoutText for prompt
    console.log("🗺️ Formatted layout text for prompt:", layoutText);

    // 💬 Enhanced prompt
    const prompt = `
You are a helpful Walmart in-store assistant. Answer user questions concisely and help them find items in a typical Walmart.
Use common sense and avoid over-complicating. Always be friendly and helpful.

Store Layout Information:
${layoutText}

User: ${userText}
Assistant:
`.trim();

    // 🧠 LOG: Prompt sent
    console.log("📤 Prompt sent to backend:", prompt);

    try {
      const res = await fetch("http://localhost:5000/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error("❌ JSON parsing error:", jsonErr);
        console.error("❌ Raw text from backend:", text);
        throw new Error("Invalid JSON response from backend.");
      }

      if (!res.ok) {
        console.error(`❌ API Error ${res.status}:`, data?.error);
        setMsgs((m) => [
          ...m,
          { 
            from: "bot", 
            text: `Error ${res.status}: ${data?.error || "Unknown error"}`, 
            timestamp: new Date().toLocaleTimeString(),
            isError: true 
          },
        ]);
        return;
      }

      const reply = data?.text?.trim() || "Sorry, I'm not sure how to help with that.";
      console.log("✅ Gemini reply:", reply);

      setMsgs((m) => [...m, { 
        from: "bot", 
        text: reply, 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMsgs((m) => [...m, { 
        from: "bot", 
        text: "Hmm, something went wrong. Please try again.", 
        timestamp: new Date().toLocaleTimeString(),
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMsgs([
      { 
        from: "bot", 
        text: "Hi there 👋 What can I help you find in the store?", 
        timestamp: new Date().toLocaleTimeString() 
      },
    ]);
  };

  return (
    <div className={`chat-drawer ${open ? "open" : ""}`}>
      <header className="chat-header">
        <div className="header-content">
          <SmartToyIcon className="header-icon" />
          <h3>Store Assistant</h3>
        </div>
        <div className="header-actions">
          <button className="clear-btn" onClick={clearChat} title="Clear Chat">
            🗑️
          </button>
          <button className="close-btn" onClick={onClose} title="Close">
            <CloseIcon />
          </button>
        </div>
      </header>

      <div className="messages-container">
        {msgs.map((msg, i) => (
          <div key={i} className={`message ${msg.from} ${msg.isError ? 'error' : ''}`}>
            <div className="message-avatar">
              {msg.from === "bot" ? (
                msg.isError ? <ErrorOutlineIcon /> : <SmartToyIcon />
              ) : (
                <PersonIcon />
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className="message-timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot loading">
            <div className="message-avatar">
              <SmartToyIcon />
            </div>
            <div className="message-content">
              <div className="loading-indicator">
                <CircularProgress size={16} />
                <span>Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={bottom} />
      </div>

      <footer className="chat-footer">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={inp}
            placeholder="Ask me anything about the store..."
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={onKey}
            disabled={isLoading}
            rows={1}
            maxLength={500}
          />
          <button 
            className="send-btn" 
            onClick={send} 
            disabled={!inp.trim() || isLoading}
            title="Send message"
          >
            <SendIcon />
          </button>
        </div>
        <div className="char-counter">
          {inp.length}/500
        </div>
      </footer>
    </div>
  );
}