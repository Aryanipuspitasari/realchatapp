import { useContext, useState } from "react";
import { LogInContext } from "../context/LogInContext.jsx";

function SignUpForm() {
  const { setIsLoggedIn } = useContext(LogInContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

  // form validation
  if (formData.username === "" || formData.email === "" || formData.password === "") {
    alert("Please fill in all fields before submitting.");
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
      window.alert(data.message);
      console.log("SIGN UP SUCCESSFUL");

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
      {message && <p>{message}</p>}
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
