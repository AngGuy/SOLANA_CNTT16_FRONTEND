import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { listAssetForSale } from "../services/apiService";
import { Navigate, useNavigate } from "react-router-dom";
const ListNFTForSale: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy NFT ID từ localStorage và set giá trị vào form
    const createdNFTId = localStorage.getItem("createdNFTId");
    if (createdNFTId) {
      form.setFieldsValue({ IdNFT: createdNFTId });
    }
  }, [form]);

  const handleSubmit = async (values: {
    IdNFT: string;
    currencyId: string;
    naturalAmount: number;
  }) => {
    try {
      console.log("Submitting values:", values);
      const response = await listAssetForSale(values);

      console.log("API Response:", response);

      if (response.consentUrl) {
        message.success("NFT listed for sale successfully!");
        console.log("Consent URL:", response.consentUrl);

        // Mở tab mới
        window.open(response.consentUrl, "_blank");

        setTimeout(() => {
          navigate("/"); // Navigate to the home page
        }, 3000);
      } else {
        message.error("Consent URL not found in response.");
      }
    } catch (error: any) {
      console.error("Error during listing:", error);
      message.error(
        error.response?.data?.error || "Error listing NFT for sale."
      );
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
        rules={[
          { required: true, message: "Please enter the sale amount!" },
          {
            validator: (_, value) => {
              if (value && Number(value) >= 1) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Amount must be greater than or equal to 1!")
              );
            },
          },
        ]}
      >
        <Input type="number" placeholder="Enter Sale Amount" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        List NFT
      </Button>
    </Form>
  );
};

export default ListNFTForSale;
