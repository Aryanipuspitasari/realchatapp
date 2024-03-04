import { useState } from "react";
import Header from "./02-Header.jsx";
import SignUpForm from "./03-signup.jsx";
import LoginForm from "./04-login.jsx";

function StartSite() {
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const handleToggleForm = () => {
    setShowSignUpForm(prevState => !prevState);
  };

  return (
    <>
     <div className="startContainer">
        <Header/>
        <div>
        {showSignUpForm ? <SignUpForm /> : <LoginForm />}
          <button onClick={handleToggleForm} className="button-start-toggle">
            {showSignUpForm ? "Login" : "SignUp"}
          </button>
        </div>
     </div>
    </>
  );
}

export default StartSite;
