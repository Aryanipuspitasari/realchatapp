import { useState, useEffect, useContext } from "react";
import { UsernameContext } from "../context/UsernameContext.jsx";
import { LogInContext } from "../context/LogInContext.jsx";
import Main from "./05-main.jsx";
import Cookies from "js-cookie";


function SignUpForm() {
  const { setUsername } = useContext(UsernameContext);
  const { setIsLoggedIn } = useContext(LogInContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://realchatapp-1.onrender.com/users/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const newFetchUsers = () => {
    fetch("https://realchatapp-1.onrender.com/users/")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error", error));
  }
    
    

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    // VALIDATE THE FORM FULLY FILLED
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all the fields");
      return;
    }

    // VALIDATE MIN CHARACTER USERNAME
    if (formData.username.length < 3) {
      alert("Username must be at least 3 characters long");
      clearTheForm();
      return;
    }

    // VALIDATE MIN CHARACTER PASSWORD
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      clearTheForm();
      return;
    }

    try {
      const response = await fetch("/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Signup failed";
        alert(errorMessage);
        throw new Error(errorMessage);
      }

      alert(data.message);
      const userName = formData.username;
      setUsername(userName);

      // SET COOKIE AFTER SIGN UP SUCCESSFULLY
      Cookies.set("token", data.token, { expires: 1 });
      setIsLoggedIn(true);
      setIsSignedUp(true);
      clearTheForm();
    } catch (error) {
      console.error("ERROR DURING SIGN UP", error);
      clearTheForm();
    }
  };

  if (isSignedUp) {
    return <Main />;
  }

  const clearTheForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="signUpLogInForm">
        <h2>Sign Up</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>

      <button onClick={newFetchUsers}>Test</button>
    </div>
  );
}

export default SignUpForm;
