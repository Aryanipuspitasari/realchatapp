import { useContext, useState, useEffect } from "react";
import { LogInContext } from "../context/LogInContext.jsx";

function SignUpForm() {
  const { setIsLoggedIn } = useContext(LogInContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Check if the email already exists
    const existingUser = users.find((user) => user.email === formData.email);
    if (existingUser) {
      alert("User with this email already exists. Please use a different email.");
      clearTheForm();
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("SIGN UP FAILED.");
      }

      const data = await response.json();
      alert(data.message);
      clearTheForm();
    } catch (error) {
      console.error("ERROR DURING SIGN UP", error);
      clearTheForm();
    }
  };

  const clearTheForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSignUp}>
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
  );
}

export default SignUpForm;
