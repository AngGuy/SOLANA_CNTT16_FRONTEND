import React, { useEffect, useState } from "react";
import { Card, List, message, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllNFTs } from "../services/apiService";

interface NFTItem {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  priceCents?: number | null; // Thêm thuộc tính giá
}

const GetAllNFTs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const navigate = useNavigate();

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
    navigate(`/nft-detail/${nft.id}`);
  };

  const handleListForSale = (nftId: string) => {
    localStorage.setItem("createdNFTId", nftId);

    // Chuyển hướng đến trang ListNFTForSale
    navigate("/list-nft-for-sale");
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
            <List.Item style={{ cursor: "pointer" }}>
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
                actions={[
                  <Button type="primary" onClick={() => handleNFTClick(item)}>
                    View Details
                  </Button>,
                  item.priceCents === null && (
                    <Button
                      type="dashed"
                      onClick={() => handleListForSale(item.id)}
                    >
                      List for Sale
                    </Button>
                  ),
                ]}
              >
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {item.priceCents
                    ? `$${(item.priceCents / 100).toFixed(2)}`
                    : "Not for Sale"}
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
