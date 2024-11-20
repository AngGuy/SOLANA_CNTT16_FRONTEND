import React from "react";
import CreateNFT from "./components/CreateNFT";
import ListNFTForSale from "./components/ListNFTForSale";
import BuyNFT from "./components/BuyNFT";
import RegisterUser from "./components/RegisterUser";
import FetchNFTs from "./components/FetchNFTs";
import GetAllNFT from "./components/GetAllNFT";

function App() {
  return (
    <div className="App">
      <h1>GameShyft NFT Marketplace</h1>
      <RegisterUser />
      <CreateNFT />
      <ListNFTForSale />
      <BuyNFT />
      <FetchNFTs />
      <GetAllNFT />
    </div>
  );
}

export default App;
