import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import { fetchAssets } from "../services/apiService";

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]); // Lưu danh sách NFT
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  // Gọi API khi component được render
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssets(); // Gọi API
        setAssets(data?.items || []); // Sử dụng key "items" từ API
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    loadAssets();
  }, []);

  return (
    <div>
      <h1>Available NFTs</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        loading={loading}
        dataSource={assets} // Gắn danh sách NFT
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item?.name} // Tên NFT
              cover={<img alt={item?.name} src={item?.imageUrl} />} // Ảnh đại diện
            >
              <p>{item?.description}</p> {/* Mô tả */}
            </Card>
          </List.Item>
        )}
      />
      {!loading && assets.length === 0 && <p>No assets found.</p>}{" "}
      {/* Hiển thị nếu không có NFT */}
    </div>
  );
};

export default AssetsPage;
