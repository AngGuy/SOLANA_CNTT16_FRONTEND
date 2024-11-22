import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { loginUser } from "../services/apiService";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await loginUser(values); // Gọi API đăng nhập
      localStorage.setItem("userToken", response.token); // Lưu token
      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });
      window.location.href = "/"; // Chuyển hướng về trang chủ
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Error",
        description: "Failed to log in. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email." }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
