import { useEffect, useState } from "react";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);

  // Kết nối với Phantom Wallet
  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        const walletAddress = response.publicKey.toString();
        console.log("Connected to Phantom Wallet:", walletAddress);
        setWalletAddress(walletAddress);

        // Lưu địa chỉ ví vào localStorage
        localStorage.setItem("walletAddress", walletAddress);
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

    // Xóa địa chỉ ví khỏi localStorage
    localStorage.removeItem("walletAddress");
  };

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

  // Tải trạng thái từ localStorage khi component được render
  useEffect(() => {
    checkIfWalletIsInstalled();

    // Kiểm tra nếu đã có địa chỉ ví trong localStorage
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      console.log(
        "Wallet address loaded from localStorage:",
        savedWalletAddress
      );
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  return (
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
  );
};

export default WalletConnect;
