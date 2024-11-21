import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter
      style={{ textAlign: "center", background: "#001529", color: "white" }}
    >
      NFT Marketplace ©2024 Created by Tadin Luan
    </AntFooter>
  );
};

export default Footer;
