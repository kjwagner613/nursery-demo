import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext); // ✅ Moved inside the component
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      console.log("User data from API:", data.user); // ✅ Debug API response
      console.log("Token from API:", data.token);

      if (data.token) {
        setUser(data.user); // ✅ Updates user state
        sessionStorage.setItem("user", JSON.stringify(data.user)); // ✅ Saves user in session
        console.log("User stored in session:", sessionStorage.getItem("user")); // ✅ Debug session storage
        navigate("/pages/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/pages/registerpage">Register</a></p>
    </div>
  );
};

export default LoginPage;