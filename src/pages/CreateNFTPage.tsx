import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { createNFT } from "../services/apiService";

const CreateNFTPage = () => {
  const [form] = Form.useForm();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Gửi dữ liệu khi form được submit
  const handleSubmit = async (values: {
    name: string;
    description: string;
    imageUrl: string;
    username: string;
    password: string;
  }) => {
    try {
      console.log("Form values on submit:", values);

      // Chắc chắn walletAddress đã được set
      if (!walletAddress) {
        message.error("Please connect your wallet first.");
        return;
      }

      const attributes = [
        { traitType: "Username", value: values.username },
        { traitType: "Password", value: values.password },
      ];

      // Chuẩn bị payload gửi đến API
      const payload = {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        destinationUserReferenceId: walletAddress, // Gán walletAddress vào destinationUserReferenceId
        attributes, // Gửi attributes đã nhập
      };

      // Gửi dữ liệu đến API
      const response = await createNFT(payload);
      message.success("NFT created successfully!");
      console.log("Created NFT:", response);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Error creating NFT.");
      console.error("Error:", error);
    }
  };

  // Kiểm tra ví Phantom khi component mount
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Create a New NFT</h2>

      {/* Debugging: Check if wallet address is set */}
      <div style={{ marginBottom: "20px", fontSize: "16px" }}>
        <strong>Wallet Address:</strong>{" "}
        {walletAddress ? walletAddress : "Not connected"}
      </div>

      {/* Start of Form */}
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #ddd",
        }}
      >
        {/* Username Field */}
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* NFT Name Field */}
        <Form.Item
          name="name"
          label="NFT Name"
          rules={[{ required: true, message: "Please enter the NFT name!" }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>

        {/* Description Field */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        {/* Image URL Field */}
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[
            { required: true, message: "Please enter the image URL!" },
            { type: "url", message: "Please enter a valid URL!" },
          ]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        {/* User Reference ID */}
        <Form.Item name="destinationUserReferenceId" label="User Reference ID">
          <Input value={walletAddress || ""} disabled />{" "}
          {/* Show wallet address */}
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", backgroundColor: "#1890ff" }}
          >
            Create NFT
          </Button>
        </Form.Item>
      </Form>
      {/* End of Form */}
    </div>
  );
};

export default CreateNFTPage;
