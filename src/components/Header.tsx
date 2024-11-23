import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const handleLogout = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletAddress");
    setError(null);
    navigate("/connect");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="logo"
        style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
      >
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          NFT Marketplace Vip Vip
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="connect">
          <Link to="/connect">Connect Phantom</Link>
        </Menu.Item>
        <Menu.Item key="assets">
          <Link to="/assets">All NFTs</Link>
        </Menu.Item>
        <Menu.Item key="create">
          <Link to="/create-nft">Create NFT</Link>
        </Menu.Item>
      </Menu>
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <div style={{ color: "white", cursor: "pointer" }}>
          <UserOutlined style={{ marginRight: 8 }} />
          Account
        </div>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
