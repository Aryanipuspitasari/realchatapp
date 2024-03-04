import { useContext } from "react";
import { LogInContext } from "../context/LogInContext.jsx";
import { UsernameContext } from "../context/UsernameContext.jsx";

function Main(){
    const { setIsLoggedIn } = useContext(LogInContext);
    const { username} = useContext(UsernameContext)

    const handleLogout = () => {
      setIsLoggedIn(false);
    };
  
    return (
      <div className="mainContainer">
        <h1>Hai {username}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}

export default Main