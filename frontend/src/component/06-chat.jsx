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
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const response = await fetch("http://localhost:3001/chat", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log(data);
      setChatHistory(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSendMessage = async () => {

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }


      const response = await fetch("http://localhost:3001/chat", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(inputMessage),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      /**
       
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      */

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
        { role: "bot", content: data.response },
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
            <p className="messageContent">{message.userMessage}</p>{" "}
            {/* Render user message */}
            <p className="messageContent">{message.botReply}</p>{" "}
            {/* Render bot reply */}
            <span className="messageTime">{message.timestamp}</span>{" "}
            {/* Render timestamp */}
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
