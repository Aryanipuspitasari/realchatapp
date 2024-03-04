import { useContext, useState } from "react";
import { LogInContext } from "../context/LogInContext.jsx";

function LoginForm() {
  const { setIsLoggedIn } = useContext(LogInContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      if(!response.ok){
        throw new Error("LOG IN FAILED.")
      }

      console.log("LOG IN SUCCESSFUL");

      clearTheForm();
    } catch (error) {
      console.error("ERROR DURING LOGIN", error);
      clearTheForm();
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
    </form>
  );
}

export default LoginForm;
