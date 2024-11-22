import React, { useState, useEffect } from "react";
import { Input, Button, Form, message } from "antd";
import { registerUser } from "../services/apiService"; // Ensure this path is correct

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Handle form submission
  const handleRegister = async (values: { email: string }) => {
    try {
      console.log("Form values on submit:", values);

      // Chắc chắn walletAddress đã được set
      if (!walletAddress) {
        message.error("Please connect your wallet first.");
        return;
      }
      const details = {
        email: values.email,
        externalWalletAddress: walletAddress,
        referenceId: walletAddress, // Use walletAddress for referenceId
      };

      // Call the API to register the user
      const data = await registerUser(details);
      console.log("User registered successfully:", data);
      message.success("User registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      message.error(error.message || "An error occurred while registering.");
    }
  };

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  return (
    <Form onFinish={handleRegister} layout="vertical">
      <h2>Register User</h2>

      {/* Email input */}
      <Form.Item label="Email" name="email" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </Form.Item>

      {/* Register button */}
      <Button type="primary" htmlType="submit" disabled={!walletAddress}>
        Register
      </Button>
    </Form>
  );
};

export default LoginPage;
