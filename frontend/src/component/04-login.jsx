import { useContext, useState } from "react";
import { LogInContext } from "../context/LogInContext.jsx";

function LoginForm() {
  const { setIsLoggedIn } = useContext(LogInContext);

  // State for form data and message
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle login form submission
  const handleLogIn = async (event) => {
    event.preventDefault();

    // Form validation
    if (formData.email === "" || formData.password === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("LOG IN FAILED.");
      }

      const data = await response.json();
      // Update message state with server response
      window.alert(data.message);
      console.log("LOG IN SUCCESSFUL");

      // Clear form fields
      clearTheForm();
    } catch (error) {
      console.error("ERROR DURING LOGIN", error);
      // Clear form fields
      clearTheForm();
    }
  };

  // Function to clear form fields
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
      {/* Display message */}
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
