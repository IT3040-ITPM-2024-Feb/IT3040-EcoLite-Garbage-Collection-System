import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import * as Yup from "yup";

const Login = () => {
  const [error, setError] = useState("");

  const initialValues = { emailOrUsername: "", password: "" };

  const validationSchema = Yup.object({
    emailOrUsername: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, form) => {
    try {
      const { setSubmitting } = form; // Destructure setSubmitting from form
  
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values
      );
  
      console.log("Login successful");
  
      // Store only the token in local storage
      window.localStorage.setItem("token", response.data.token);
  
      // Store the user id and role in local storage
      window.localStorage.setItem("userId", response.data.user.id);
      window.localStorage.setItem("role", response.data.user.role);
  
      // Set LoggedIn to true
      window.localStorage.setItem("LoggedIn", true);
  
      // Redirect to the appropriate dashboard based on user role
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
        message.error(error.response.data.message);
        setError("Invalid username or password");
      } else {
        // Handle other types of errors
        message.error("An error occurred while logging in.");
        setError("An error occurred while logging in.");
      }
    } finally {
      if (form) {
        const { setSubmitting } = form; // Destructure setSubmitting from form if form exists
        setSubmitting(false);
      }
    }
  };
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ margin: "16px 0" }}>
          Sign In
        </button>
      </form>
      {/* forgot password */}
      <p style={{ textAlign: "center" }}>
        <a href="/sendOTP" style={{ textDecoration: "none" }}>
          Forgot password?
        </a>
      </p>
    </div>
  );
};

export default Login;