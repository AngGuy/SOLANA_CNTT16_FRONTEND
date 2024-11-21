import React, { useEffect, useState } from "react";

import { List, message } from "antd";
import { getAllNFTs } from "../services/apiService";

const GetAllNFTs: React.FC = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const data = await getAllNFTs();
        setNFTs(data);
      } catch (error: any) {
        message.error("Failed to fetch NFTs.");
      }
    };
    fetchNFTs();
  }, []);

  return (
    <div>
      <h2>All NFTs</h2>
      <List
        dataSource={nfts}
        renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
      />
    </div>
  );
};

export default GetAllNFTs;
