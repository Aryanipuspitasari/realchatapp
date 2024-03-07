import { useState } from "react";

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }
  
    try {

      // Send user message immediately
      setChatHistory(prevHistory => [...prevHistory, { role: "user", content: inputMessage, time :getCurrentTime() }]);
  
      setTimeout(async () => {
        try {
          const response = await fetch("http://localhost:3001/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: inputMessage }),
          });
  
          if (!response.ok) {
            throw new Error("FAILED TO SEND MESSAGE");
          }
  
          const data = await response.json();
          setChatHistory(prevHistory => [
            ...prevHistory,
            { role: "bot", content: data.response, time: getCurrentTime() }
          ]);
        } catch (error) {
          console.error("ERROR RECEIVING BOT RESPONSE", error);
        }
      }, 1000);
  
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  const handleSubmit= (event) => {
    event.preventDefault();
    handleSendMessage();
  }

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };
  return (
    <div className="chatContainer">
      <div className="botContainer">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <p className="messageContent">{message.content}</p>
            <span className="messageTime">{message.time}</span>
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
