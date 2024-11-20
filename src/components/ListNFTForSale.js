import React, { useState } from "react";
import { listNFTForSale } from "../services/apiService";

const ListNFTForSale = () => {
  const [IdNFT, setIdNFT] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [naturalAmount, setNaturalAmount] = useState("");

  const handleListForSale = async (e) => {
    e.preventDefault();
    const saleData = { IdNFT, currencyId, naturalAmount };
    try {
      const data = await listNFTForSale(saleData);
      console.log(data);
      alert("NFT listed for sale!");
    } catch (error) {
      console.error(error);
      alert("Error listing NFT.");
    }
  };

  return (
    <form onSubmit={handleListForSale}>
      <h2>List NFT for Sale</h2>
      <input
        type="text"
        placeholder="NFT ID"
        onChange={(e) => setIdNFT(e.target.value)}
      />
      <input
        type="text"
        placeholder="Currency ID"
        onChange={(e) => setCurrencyId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setNaturalAmount(e.target.value)}
      />
      <button type="submit">List NFT</button>
    </form>
  );
};

export default ListNFTForSale;
