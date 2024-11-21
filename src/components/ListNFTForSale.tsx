import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";
import { listAssetForSale } from "../services/apiService";

const ListNFTForSale: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const response = await listAssetForSale(values);
      message.success("NFT listed for sale successfully!");
      console.log("Listed NFT:", response);
    } catch (error: any) {
      message.error(
        error.response?.data?.error || "Error listing NFT for sale."
      );
      console.error("Error:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <h2>List NFT For Sale</h2>
      <Form.Item name="IdNFT" label="NFT ID" rules={[{ required: true }]}>
        <Input placeholder="Enter NFT ID" />
      </Form.Item>
      <Form.Item
        name="currencyId"
        label="Currency ID"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter Currency ID" />
      </Form.Item>
      <Form.Item
        name="naturalAmount"
        label="Amount"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter Sale Amount" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        List NFT
      </Button>
    </Form>
  );
};

export default ListNFTForSale;
