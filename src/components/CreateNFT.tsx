import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";
import { createUniqueAsset } from "../services/apiService";

const CreateNFT: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const response = await createUniqueAsset(values);
      message.success("NFT created successfully!");
      console.log("Created NFT:", response);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Error creating NFT.");
      console.error("Error:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <h2>Create NFT</h2>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter NFT Name" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter NFT Description" />
      </Form.Item>
      <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true }]}>
        <Input placeholder="Enter Image URL" />
      </Form.Item>
      <Form.Item
        name="attributes"
        label="Attributes"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter NFT Attributes (JSON format)" />
      </Form.Item>
      <Form.Item
        name="destinationUserReferenceId"
        label="User Reference ID"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter Destination User Reference ID" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Create NFT
      </Button>
    </Form>
  );
};

export default CreateNFT;
