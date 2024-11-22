import React, { useEffect, useState } from "react";
import { Card, message, Spin, Button, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { buyNFT } from "../services/apiService";

interface NFTDetailProps {
  name: string;
  description: string;
  imageUrl: string;
  idNFT: string;
}

const NFTDetail: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const { name, description, imageUrl, idNFT }: Partial<NFTDetailProps> =
    location.state || {}; // Đảm bảo `Partial` để tránh lỗi khi dữ liệu không đầy đủ.

  // Điều hướng nếu thiếu dữ liệu cần thiết
  useEffect(() => {
    if (!location.state || !idNFT) {
      message.error("NFT data is missing. Redirecting...");
      navigate("/");
    }
  }, [location.state, idNFT, navigate]);

  // Lấy địa chỉ ví từ localStorage
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    } else {
      message.error("Wallet address not found. Please connect your wallet.");
      navigate("/connect-wallet");
    }
  }, [navigate]);

  // Xử lý khi nhấn "Mua ngay"
  const handleSubmit = async () => {
    if (!walletAddress) {
      message.error("Wallet address is missing. Cannot proceed.");
      return;
    }

    if (!idNFT) {
      message.error("NFT ID is missing. Cannot proceed.");
      return;
    }

    const payload = {
      IdNFT: idNFT,
      buyerId: walletAddress,
    };

    try {
      const response = await buyNFT(payload);
      console.log("API Response:", response);

      if (response.consentUrl) {
        message.success("NFT listed for sale successfully!");
        window.open(response.consentUrl, "_blank");

        setTimeout(() => {
          navigate("/");
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

  if (!name || !description || !imageUrl || !idNFT) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin tip="Loading NFT details..." />
        <p>
          If loading takes too long, please try refreshing the page or{" "}
          <Button type="link" onClick={() => navigate("/")}>
            return to the homepage
          </Button>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h1 style={{ textAlign: "center" }}>{name}</h1>
        <Card
          cover={
            <img
              alt={name}
              src={imageUrl}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          }
        >
          <p>
            <strong>Description:</strong> {description}
          </p>

          <Form form={form} layout="vertical">
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Mua ngay
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default NFTDetail;
