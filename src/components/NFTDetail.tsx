import React, { useEffect, useState } from "react";
import { Card, message, Spin, Button, Form } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNFTById, buyNFT } from "../services/apiService";

const NFTDetail: React.FC = () => {
  const { idNFT } = useParams(); // Lấy idNFT từ URL
  const [nftData, setNftData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!idNFT) {
      message.error("NFT ID is missing. Redirecting...");
      navigate("/assets");
      return;
    }

    const fetchNFTDetail = async () => {
      try {
        // Lấy itemId từ params hoặc từ URL
        const apiUrl = `http://localhost:5000/api/nfts/get-item/${idNFT}`; // idNFT lấy từ useParams hoặc location.state

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch NFT details");
        }

        const data = await response.json();
        console.log("API response data:", data); // In kết quả trả về từ API

        if (data && data.item) {
          const nft = data.item;
          const nftDetails = {
            id: nft.id,
            name: nft.name,
            description: nft.description,
            imageUrl: nft.imageUrl,
          };
          setNftData(nftDetails); // Cập nhật dữ liệu NFT vào state
        } else {
          message.error("Invalid NFT data format.");
        }

        setLoading(false); // Đặt loading thành false khi hoàn thành
      } catch (error) {
        console.error("Error fetching NFT details:", error);
        message.error("Failed to fetch NFT details.");
        setLoading(false); // Đặt loading thành false khi có lỗi
      }
    };

    fetchNFTDetail();
  }, [idNFT, navigate]);

  // Kiểm tra ví người dùng
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
      if (response.consentUrl) {
        message.success("NFT listed for sale successfully!");
        window.open(response.consentUrl, "_blank");
        setTimeout(() => {
          navigate("/assets");
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

  if (loading) {
    return <Spin tip="Loading NFT details..." />;
  }

  if (!nftData) {
    return <p>Could not load NFT details.</p>;
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
        <h1 style={{ textAlign: "center" }}>{nftData.name}</h1>
        <Card
          cover={
            <img
              alt={nftData.name}
              src={nftData.imageUrl}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          }
        >
          <p>
            <strong>Description:</strong> {nftData.description}
          </p>

          <Form layout="vertical">
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
