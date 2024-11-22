import React, { useState, FormEvent } from "react";
import { Input, Button, Form, message } from "antd";
import { registerUser } from "../services/apiService"; // Ensure this path is correct

const RegisterUser = () => {
  const [referenceId, setReferenceId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [externalWalletAddress, setExternalWalletAddress] =
    useState<string>("");

  // Handle form submission
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!referenceId || !email || !externalWalletAddress) {
      message.error("Please fill in all required fields.");
      return;
    }

    const userData = { referenceId, email, externalWalletAddress };

    try {
      // Call the API to register the user
      const data = await registerUser(userData);
      console.log("User registered successfully:", data);
      message.success("User registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      message.error(error.message || "An error occurred while registering.");
    }
  };

  return (
    <Form onSubmitCapture={handleRegister} layout="vertical">
      <h2>Register User</h2>

      {/* Reference ID input */}
      <Form.Item label="Reference ID" required>
        <Input
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          placeholder="Enter Reference ID"
        />
      </Form.Item>

      {/* Email input */}
      <Form.Item label="Email" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </Form.Item>

      {/* External Wallet Address input */}
      <Form.Item label="External Wallet Address" required>
        <Input
          value={externalWalletAddress}
          onChange={(e) => setExternalWalletAddress(e.target.value)}
          placeholder="Enter Wallet Address"
        />
      </Form.Item>

      {/* Register button */}
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterUser;
