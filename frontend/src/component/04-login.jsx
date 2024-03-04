// LoginForm component
import { useContext, useState, useEffect } from "react";
import { LogInContext } from "../context/LogInContext.jsx";

function LoginForm() {
  const { setIsLoggedIn } = useContext(LogInContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
  
      const data = await response.json();
  
      if (response.status === 200) {
        window.alert("Login successful");
        setIsLoggedIn(true);
        clearTheForm();
      } else {
        // Handle specific messages from the backend
        if (data.message === "User not found") {
          setMessage("User not found. Please check your email.");
        } else if (data.message === "Invalid email or password") {
          setMessage("Invalid email or password. Please try again.");
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Failed to log in");
    }
  };
  

  const clearTheForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };


  return (
    <form onSubmit={handleLogIn}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
