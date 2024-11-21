import React, { useState, FormEvent } from "react";
import { fetchNFTs } from "../services/apiService";

interface NFT {
  id: string;
  name: string;
  description: string;
}

const FetchNFTs = () => {
  const [ownerReferenceId, setOwnerReferenceId] = useState<string>(""); // Lưu ID tham chiếu người sở hữu
  const [nfts, setNfts] = useState<NFT[]>([]); // Lưu danh sách NFTs

  const handleFetchNFTs = async (e: FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    try {
      // Gọi API với đối tượng chứa 'ownerReferenceId'
      const data = await fetchNFTs({ ownerReferenceId });
      setNfts(data); // Cập nhật danh sách NFTs vào state
    } catch (error) {
      console.error(error);
      alert("Error fetching NFTs."); // Thông báo lỗi nếu có
    }
  };

  return (
    <div>
      <form onSubmit={handleFetchNFTs}>
        <h2>Fetch NFTs</h2>
        <input
          type="text"
          placeholder="Owner Reference ID"
          onChange={(e) => setOwnerReferenceId(e.target.value)} // Lắng nghe thay đổi input
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
