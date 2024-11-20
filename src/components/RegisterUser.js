import React, { useState } from "react";
import { registerUser } from "../services/apiService";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userReferenceId, setUserReferenceId] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { email, password, userReferenceId };
    try {
      const data = await registerUser(userData);
      console.log(data);
      alert("User registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Error registering user.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register User</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Reference ID"
        onChange={(e) => setUserReferenceId(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterUser;
