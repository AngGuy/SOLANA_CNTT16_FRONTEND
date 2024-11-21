import React, { useState, FormEvent } from "react";
import { registerUser } from "../services/apiService";
import { Input, Button, Form, message } from "antd";

const RegisterUser = () => {
  const [referenceId, setReferenceId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [externalWalletAddress, setExternalWalletAddress] =
    useState<string>("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!referenceId || !email || !externalWalletAddress) {
      message.error("Please fill in all required fields.");
      return;
    }

    const userData = { referenceId, email, externalWalletAddress };

    try {
      const data = await registerUser(userData);
      console.log("User registered successfully:", data);
      message.success("User registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      message.error(error.message);
    }
  };

  return (
    <Form onSubmitCapture={handleRegister} layout="vertical">
      <h2>Register User</h2>
      <Form.Item label="Reference ID" required>
        <Input
          value={referenceId}
          onChange={(e: any) => setReferenceId(e.target.value)}
          placeholder="Enter Reference ID"
        />
      </Form.Item>
      <Form.Item label="Email" required>
        <Input
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </Form.Item>
      <Form.Item label="External Wallet Address" required>
        <Input
          value={externalWalletAddress}
          onChange={(e: any) => setExternalWalletAddress(e.target.value)}
          placeholder="Enter External Wallet Address"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterUser;
