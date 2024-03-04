import { useState } from "react";

// IMPORT CONTEXT
import { UsernameContext } from "./context/UsernameContext.jsx";
import { LogInContext } from "./context/LogInContext.jsx";

// IMPORT COMPONENT
import StartSite from "./component/01-start.jsx";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <StartSite />
        </LogInContext.Provider>
      </UsernameContext.Provider>
    </>
  );
}

export default App;
