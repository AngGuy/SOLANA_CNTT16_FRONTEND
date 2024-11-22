import React, { useEffect, useState } from "react";
import { Card, List, message, Spin } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAllNFTs } from "../services/apiService";

interface NFTItem {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

const GetAllNFTs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const navigate = useNavigate(); // Sử dụng useNavigate

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const data = await getAllNFTs();
        setNfts(data); // Gán dữ liệu sau khi lấy được
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch NFTs");
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const handleNFTClick = (nft: NFTItem) => {
    // Điều hướng đến trang chi tiết NFT
    navigate("/nft-detail", { state: nft }); // Truyền thông tin NFT qua state
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>NFT Collection</h1>
      {loading ? (
        <Spin tip="Loading NFTs..." />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={nfts}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleNFTClick(item)}
              style={{ cursor: "pointer" }}
            >
              <Card
                title={item.name}
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                }
              >
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default GetAllNFTs;
