import React, { useEffect, useState } from "react";
import { getAllNFTs } from "../services/apiService";

const GetAllNFT = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchAllNFTs = async () => {
      try {
        const data = await getAllNFTs();
        setNfts(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching all NFTs.");
      }
    };
    fetchAllNFTs();
  }, []);

  return (
    <div>
      <h2>All NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <strong>{nft.name}</strong> - {nft.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllNFT;
