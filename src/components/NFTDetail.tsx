import React from "react";
import { Card, Spin } from "antd";
import { useLocation } from "react-router-dom"; // Để lấy thông tin từ state khi điều hướng

interface NFTDetailProps {
  name: string;
  description: string;
  imageUrl: string;
}

const NFTDetail: React.FC = () => {
  const location = useLocation();
  const { name, description, imageUrl }: NFTDetailProps = location.state || {};

  if (!name || !description || !imageUrl) {
    return <Spin tip="Loading..." />; // Nếu chưa có thông tin, hiển thị loading
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Căn giữa theo chiều ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        height: "100vh", // Đảm bảo chiều cao đầy đủ của màn hình
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
        </Card>
      </div>
    </div>
  );
};

export default NFTDetail;
