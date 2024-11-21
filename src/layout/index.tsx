import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // Đường dẫn có thể thay đổi tuỳ theo cấu trúc dự án của bạn
import Footer from "../components/Footer";

const ClientLayout: React.FC = () => {
  return (
    <div className="client-layout">
      {/* Header: hiển thị trên tất cả các trang */}
      <Header />

      {/* Nội dung chính: thay đổi tùy thuộc vào route hiện tại */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer: hiển thị trên tất cả các trang */}
      <Footer />
    </div>
  );
};

export default ClientLayout;
