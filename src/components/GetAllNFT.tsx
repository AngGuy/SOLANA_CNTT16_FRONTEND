import React, { useEffect, useState } from "react";

import { Card, List, message, Spin } from "antd";
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
            <List.Item>
              <Card
                title={item.name}
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl}
                    style={{
                      width: "100%", // Để ảnh khớp với chiều rộng của thẻ Card
                      height: "200px", // Đặt chiều cao tối đa
                      objectFit: "cover", // Giữ nguyên tỷ lệ và cắt ảnh nếu cần
                      borderRadius: "10px", // Làm tròn góc nếu muốn
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
