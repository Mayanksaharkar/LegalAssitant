import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../Context/Context";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const { rawText } = useContext(Context);

  useEffect(() => {
    if (!rawText || rawText.trim() === "") {
      if (!toastShown) {
        toast.info("Please upload a document to continue with the chat.");
        setToastShown(true);
        navigate("/home");
      }
    }
  }, [rawText, navigate, toastShown]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:9000/chat", {
        question: input,
      });
      setInput("");
      const assistantMessage = { sender: "assistant", text: response.data.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = { sender: "assistant", text: "Sorry, I couldn't process your request." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        ref={chatContainerRef}
        className="w-[80%] h-[70%] bg-white shadow-lg rounded-lg p-4 overflow-y-scroll flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Legal Assistant Chat</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start a conversation by asking a question about the legal document.</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 my-2 rounded-lg max-w-[70%] ${
                message.sender === "user"
                  ? "bg-black text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {message.sender === "assistant" ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          ))
        )}
      </div>
      <div className="w-[80%] flex mt-4">
        <input
          type="text"
          className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the legal document..."
          disabled={isLoading}
        />
        <button
          className="ml-2 px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black transition duration-200"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
