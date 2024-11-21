import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";
import { buyNFT } from "../services/apiService";

const BuyNFT: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const response = await buyNFT(values);
      message.success("NFT purchased successfully!");
      console.log("Purchased NFT:", response);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Error purchasing NFT.");
      console.error("Error:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <h2>Buy NFT</h2>
      <Form.Item name="IdNFT" label="NFT ID" rules={[{ required: true }]}>
        <Input placeholder="Enter NFT ID" />
      </Form.Item>
      <Form.Item name="buyerId" label="Buyer ID" rules={[{ required: true }]}>
        <Input placeholder="Enter Buyer ID" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Buy NFT
      </Button>
    </Form>
  );
};

export default BuyNFT;
