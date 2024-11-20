import React, { useState } from "react";
import { buyNFT } from "../services/apiService";

const BuyNFT = () => {
  const [itemId, setItemId] = useState("");
  const [paymentCurrencyId, setPaymentCurrencyId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleBuyNFT = async (e) => {
    e.preventDefault();
    const buyData = { itemId, paymentCurrencyId, paymentAmount };
    try {
      const data = await buyNFT(buyData);
      console.log(data);
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error(error);
      alert("Error purchasing NFT.");
    }
  };

  return (
    <form onSubmit={handleBuyNFT}>
      <h2>Buy NFT</h2>
      <input
        type="text"
        placeholder="Item ID"
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Currency ID"
        onChange={(e) => setPaymentCurrencyId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Payment Amount"
        onChange={(e) => setPaymentAmount(e.target.value)}
      />
      <button type="submit">Buy NFT</button>
    </form>
  );
};

export default BuyNFT;
