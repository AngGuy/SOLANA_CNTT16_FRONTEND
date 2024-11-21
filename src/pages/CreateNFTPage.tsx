import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { createNFT } from "../services/apiService";

const CreateNFTPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await createNFT(values); // Gọi API tạo NFT
      notification.success({
        message: "NFT Created Successfully!",
        description: response?.message || "Your NFT has been created.",
      });
    } catch (error) {
      console.error("Error creating NFT:", error);
      notification.error({
        message: "Error",
        description: "Failed to create NFT. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New NFT</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the NFT name." }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the NFT description." },
          ]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: "Please provide an image URL." }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create NFT
        </Button>
      </Form>
    </div>
  );
};

export default CreateNFTPage;
