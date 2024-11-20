import React, { useState } from "react";
import { fetchNFTs } from "../services/apiService";

const FetchNFTs = () => {
  const [ownerReferenceId, setOwnerReferenceId] = useState("");
  const [nfts, setNfts] = useState([]);

  const handleFetchNFTs = async (e) => {
    e.preventDefault();
    const nftsData = { ownerReferenceId };
    try {
      const data = await fetchNFTs(nftsData);
      setNfts(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching NFTs.");
    }
  };

  return (
    <div>
      <form onSubmit={handleFetchNFTs}>
        <h2>Fetch NFTs</h2>
        <input
          type="text"
          placeholder="Owner Reference ID"
          onChange={(e) => setOwnerReferenceId(e.target.value)}
        />
        <button type="submit">Fetch NFTs</button>
      </form>
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

export default FetchNFTs;
