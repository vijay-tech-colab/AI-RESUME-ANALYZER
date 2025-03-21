import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Import a syntax highlighting theme
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { token } = useAuth();

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/ai/chat",
        { message: input },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      const botMessages = Array.isArray(data.botMessages)
        ? data.botMessages.map((msg) => ({ sender: "bot", text: msg }))
        : [{ sender: "bot", text: data.botMessages }];
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white p-4 pt-20">
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-[80vh] max-h-[80vh] sm:w-[95%]">
        <div className="flex-1 overflow-y-auto p-2 space-y-3 max-h-[70vh]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "text-right" : "text-left"}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  msg.sender === "user" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && <p className="text-center text-gray-400">Typing...</p>}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2 mt-2 w-full">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none w-full sm:w-auto"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 rounded-lg w-20 sm:w-auto"
          >
            Send
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="flex  items-center gap-2 px-10 py-2 bg-blue-600 hover:bg-blue-700 text-black rounded-lg shadow-md mt-5 text-center"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ChatBot;
