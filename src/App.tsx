import React from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AssetsPage from "./pages/AssetsPage";
import CreateNFTPage from "./pages/CreateNFTPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import WalletConnect from "./components/WalletConnect";
import ListNFTForSale from "./components/ListNFTForSale";
import GetAllNFTs from "./components/GetAllNFT";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("walletAddress"); // Kiểm tra trạng thái đăng nhập

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header sẽ hiển thị cho tất cả các trang */}
        <Header />

        <Layout.Content
          style={{ padding: "20px 50px", backgroundColor: "#f0f2f5" }}
        >
          {/* Routes cho các trang */}
          <Routes>
            {/* Trang chủ không cần xác thực */}
            <Route path="/" element={<HomePage />} />
            <Route path="/connect" element={<WalletConnect />} />
            {/* Các trang yêu cầu đăng nhập */}
            <Route
              path="/assets"
              element={
                isAuthenticated ? <GetAllNFTs /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/create-nft"
              element={
                isAuthenticated ? <CreateNFTPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/list-nft-for-sale" element={<ListNFTForSale />} />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              }
            />

            {/* Trang đăng nhập */}
            <Route path="/login" element={<LoginPage />} />

            {/* Trang 404 khi không tìm thấy route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </Layout.Content>

        {/* Footer sẽ hiển thị cho tất cả các trang */}
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
