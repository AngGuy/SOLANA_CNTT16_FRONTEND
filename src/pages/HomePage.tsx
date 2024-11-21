import React, { useEffect, useState } from "react";
import { Card } from "antd";

const HomePage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);

  // Kiểm tra xem Phantom Wallet có được cài đặt hay không
  const checkIfWalletIsInstalled = () => {
    if (window.solana && window.solana.isPhantom) {
      console.log("Phantom Wallet is installed!");
      setIsPhantomInstalled(true);
    } else {
      console.log(
        "Phantom Wallet is not installed. Please install it from https://phantom.app"
      );
      setIsPhantomInstalled(false);
    }
  };

  // Kết nối với Phantom Wallet
  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        console.log(
          "Connected to Phantom Wallet:",
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      } else {
        alert(
          "Phantom Wallet is not installed. Please install it from https://phantom.app"
        );
      }
    } catch (error) {
      console.error("User rejected the connection:", error);
    }
  };

  // Ngắt kết nối
  const disconnectWallet = () => {
    setWalletAddress(null);
    console.log("Disconnected from Phantom Wallet");
  };

  // Kiểm tra Phantom Wallet khi component được render
  useEffect(() => {
    checkIfWalletIsInstalled();
  }, []);

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
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Connect to Phantom Wallet</h1>
        {walletAddress ? (
          <div>
            <p>Connected Wallet: {walletAddress}</p>
            <button
              onClick={disconnectWallet}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              Disconnect Wallet
            </button>
          </div>
        ) : isPhantomInstalled ? (
          <button
            onClick={connectWallet}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Connect Wallet
          </button>
        ) : (
          <p>
            Phantom Wallet is not installed. Please install it from{" "}
            <a
              href="https://phantom.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://phantom.app
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
