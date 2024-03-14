import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { LogInContext } from "../context/LogInContext.jsx";

function Chat() {
  const { isLoggedIn } = useContext(LogInContext);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchChatHistory();
    }
  }, [isLoggedIn]);

  const fetchChatHistory = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      console.log("Token:", token);

      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const response = await fetch("/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }

      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      console.log("Token:", token);

      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const response = await fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: inputMessage }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok && response.status !== 401) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      if (response.status === 401) {
        console.error("Authentication error while sending message");
        return;
      }

      const data = await response.json();

      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "user",
          userMessage: inputMessage,
          botReply: data.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInputMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendMessage();
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="chatContainer">
      <div className="botContainer">
        {chatHistory?.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <p className="messageContent user-message">{message.userMessage}</p>
            {/* RENDER USER MESSAGE */}
            <p className="messageContent bot-message">{message.botReply}</p>
            {/* RENDER BOT REPLY */}
            <span className="messageTime">{message.timestamp}</span>
            {/* RENDER TIME STAMP */}
          </div>
        ))}
      </div>
      <form className="chatForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
