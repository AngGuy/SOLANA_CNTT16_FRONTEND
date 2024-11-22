import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import { fetchAssets } from "../services/apiService";

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssets(); // Hàm API để lấy danh sách NFT
        setAssets(data?.item ? [data.item] : []); // Chắc chắn có dữ liệu "item"
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
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
        dataSource={assets} // Sử dụng assets đã cập nhật
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item?.name} // Lấy tên NFT
              cover={<img alt={item?.name} src={item?.imageUrl} />} // Lấy ảnh đại diện
            >
              <p>{item?.description}</p> // Lấy mô tả
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AssetsPage;
