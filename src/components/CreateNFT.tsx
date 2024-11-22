import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Space } from "antd";
import { createNFT } from "../services/apiService";

const CreateNFT = () => {
  const [form] = Form.useForm();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [attributes] = useState<
    {
      traitType: string;
      value: string;
    }[]
  >([
    { traitType: "Username", value: "" },
    { traitType: "Password", value: "" },
  ]);

  // Gửi dữ liệu khi form được submit
  const handleSubmit = async (values: any) => {
    try {
      // Chắc chắn walletAddress đã được set
      if (!walletAddress) {
        message.error("Please connect your wallet first.");
        return;
      }

      // Chuẩn bị payload gửi đến API
      const put = {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        destinationUserReferenceId: walletAddress, // Gán walletAddress vào destinationUserReferenceId
        attributes, // Gửi attributes đã nhập
      };

      // Gửi dữ liệu đến API
      const response = await createNFT(put);
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

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8 }}
      >
        {/* NFT Name */}
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter the NFT name!" }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>

        {/* NFT Name */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the NFT name!" }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>

        {/* NFT Name */}
        <Form.Item
          name="name"
          label="NFT Name"
          rules={[{ required: true, message: "Please enter the NFT name!" }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        {/* Image URL */}
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
    </div>
  );
};

export default CreateNFT;
