import { useContext, useState, useEffect } from "react";
import { LogInContext } from "../context/LogInContext.jsx";
import Main from "./05-main.jsx";
import { UsernameContext } from "../context/UsernameContext.jsx";
import Cookies from "js-cookie";

function LoginForm() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const { setUsername } = useContext(UsernameContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);

  
  const fetchUsers = async () => {
    try {
      const response = await fetch("/users/");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    // VALIDATE FORM FIELDS
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    // FIND USER AND VALIDATE EXISTING USER
    const user = users.find((user) => user.username === formData.username);


    if (!user) {
      alert("User not found");
      clearTheForm()
      return;
    }

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      const userName = formData.username;
      setUsername(userName);

      // SET TOKEN AFTER LOG IN SUCCESSFUL
      Cookies.set("token", data.token, { expires: 1 });
      setIsLoggedIn(true);
      clearTheForm();
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please try again later.");
      clearTheForm();
    }
  };

  if (isLoggedIn) {
    return <Main />;
  }

  const clearTheForm = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleLogIn} className="signUpLogInForm">
      <h2>Login</h2>
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
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
