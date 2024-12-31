import React, { useState } from "react";
import { Link } from "react-router-dom";
// import './css/Login.css'
import '../css/Login.css'
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="login-container">
        <div className="main">
        <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
        </div>

    </div>
  );
};

export default Login;
