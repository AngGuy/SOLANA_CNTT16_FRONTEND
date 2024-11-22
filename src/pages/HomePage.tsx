import React, { useEffect, useState } from "react";
import { Card } from "antd";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the NFT Marketplace</h1>
      <Card style={{ marginTop: 20, padding: 20 }}>
        <p>
          Discover, create, and trade unique digital assets with our NFT
          marketplace. Use the navigation menu to explore assets or create your
          own NFT.
        </p>
      </Card>
    </div>
  );
};

export default HomePage;
