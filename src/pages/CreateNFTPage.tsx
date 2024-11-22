import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createNFT } from "../services/apiService";

const CreateNFTPage: React.FC = () => {
  const [form] = Form.useForm();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    name: string;
    description: string;
    imageUrl: string;
    username: string;
    password: string;
  }) => {
    try {
      if (!walletAddress) {
        message.error("Please connect your wallet first.");
        return;
      }

      const payload = {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        attributes: [
          { traitType: "Username", value: values.username },
          { traitType: "Password", value: values.password },
        ],
        destinationUserReferenceId: walletAddress,
      };

      const response = await createNFT(payload);
      message.success("NFT created successfully!");
      console.log("Created NFT:", response);

      // Lấy ID từ response và lưu vào localStorage
      const nftId = response.id;
      localStorage.setItem("createdNFTId", nftId);

      // Chuyển hướng đến trang ListNFTForSale
      navigate("/list-nft-for-sale");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Error creating NFT.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Create a New NFT</h2>
      <div style={{ marginBottom: "20px", fontSize: "16px" }}>
        <strong>Wallet Address:</strong> {walletAddress || "Not connected"}
      </div>
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
        {/* Các trường form */}
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          name="name"
          label="NFT Name"
          rules={[{ required: true, message: "Please enter the NFT name!" }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>
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
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", backgroundColor: "#1890ff" }}
        >
          Create NFT
        </Button>
      </Form>
    </div>
  );
};

export default CreateNFTPage;
