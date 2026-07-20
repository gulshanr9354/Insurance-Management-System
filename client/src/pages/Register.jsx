import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword
  ) {
    setError("Please fill in all fields.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }
    );

    alert(response.data.message);

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server Error");
    }
  }
};

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>

        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;