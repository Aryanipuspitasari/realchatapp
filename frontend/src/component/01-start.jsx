import { useContext, useState } from "react";
import Header from "./02-Header.jsx";
import SignUpForm from "./03-signup.jsx";
import LoginForm from "./04-login.jsx";
import { LogInContext } from "../context/LogInContext.jsx";
import { UsernameContext } from "../context/UsernameContext.jsx";
import Main from "./05-main.jsx";

function StartSite() {
  const { isLoggedIn } = useContext(LogInContext);
  const {username} = useContext(UsernameContext);
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const handleToggleForm = () => {
    setShowSignUpForm(prevState => !prevState);
  };

  return (
    <>
      {isLoggedIn ? (
        <Main username={username}/>
      ) : (
        <div className="startContainer">
          <Header />
          <div>
            {showSignUpForm ? <SignUpForm /> : <LoginForm />}
            {!isLoggedIn && (
              <button onClick={handleToggleForm} className="button-start-toggle">
                {showSignUpForm ? "Login" : "SignUp"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default StartSite;
