import { useState } from "react";

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }
  
    try {
      // Send user message immediately
      setChatHistory(prevHistory => [...prevHistory, { role: "user", content: inputMessage }]);
  
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
            { role: "bot", content: data.response }
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
  

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };
  return (
    <div className="chatContainer">
      <div className="botContainer">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chatform">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
