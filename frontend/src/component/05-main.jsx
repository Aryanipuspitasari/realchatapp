import { useContext } from "react";
import { LogInContext } from "../context/LogInContext.jsx";
import { UsernameContext } from "../context/UsernameContext.jsx";
import Chat from "./06-chat.jsx";
import Cookies from "js-cookie";

function Main() {
  const { setIsLoggedIn } = useContext(LogInContext);
  const { username } = useContext(UsernameContext);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="mainContainer">

      <header className="mainHeader">
        <h1>Hai {username}</h1>
        <button onClick={handleLogout} className="logoutButton">
          X
        </button>
      </header>

      
        <Chat />
   
    </div>
  );
}

export default Main;
