import { useContext, useState, useEffect } from "react";
import { LogInContext } from "../context/LogInContext.jsx";
import Main from "./05-main.jsx";

function LoginForm() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      console.log(data);
      // Check if the user exists
      const userExists = users.find((user) => user.email === formData.email);

      if (!userExists) {
        window.alert("User not found. Please check your email.");
        return;
      }

      if (response.status === 200) {
        window.alert("Login successful");
        setIsLoggedIn(true);
        clearTheForm();
      } else if (response.status === 401) {
        window.alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("Failed to log in");
    }
  };

   if (isLoggedIn) {
    return <Main />;
  }

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
      
    </form>
  );
}

export default LoginForm;
