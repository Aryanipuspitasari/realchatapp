import { useState, useEffect, useContext } from "react";
// import Cookies from "js-cookie";
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

  useEffect(() => {
    // Check if user is logged in and set authorization token
    if (isLoggedIn) {
      setAuthorizationToken();
    }
  }, [isLoggedIn]);


  const fetchChatHistory = async () => {
    try {
      // const token = Cookies.get("token");
      // console.log("All cookies:", Cookies.get()); 
      // console.log("Token:", token); 

      // if (!token) {
      //   throw new Error("Token not found in cookies");
      // }

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await fetch("/chat", {
        headers: {
          "Authorization": `Bearer ${token}`,
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
      // const token = Cookies.get("token");
      // if (!token) {
      //   throw new Error("Token not found in cookies");
      // }

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await fetch("/chat", {
          method: "POST",
          body: JSON.stringify({message : inputMessage}),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
            },
             credentials: "include",
       })

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
        { role: "user", userMessage: inputMessage, botReply: data.response, timestamp: new Date().toISOString() },
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

  const setAuthorizationToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete fetch.defaults.headers.common["Authorization"];
    }
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
