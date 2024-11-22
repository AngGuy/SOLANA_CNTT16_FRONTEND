import React, { useEffect, useState } from "react";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<any>(null); // Lưu trữ dữ liệu ví từ API
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false); // Kiểm tra nếu tài khoản đã đăng ký

  // Kiểm tra xem Phantom Wallet có được cài đặt hay không
  const checkIfWalletIsInstalled = () => {
    if (window.solana && window.solana.isPhantom) {
      alert("Phantom Wallet is installed!");
      setIsPhantomInstalled(true);
    } else {
      console.log(
        "Phantom Wallet is not installed. Please install it from https://phantom.app"
      );
      setIsPhantomInstalled(false);
    }
  };

  // Kiểm tra tài khoản đã đăng ký hay chưa
  const checkIfWalletRegistered = async (walletAddress: string) => {
    setLoading(true);
    setError(null); // Reset error

    try {
      const response = await fetch(`/api/check-wallet/${walletAddress}`); // API backend kiểm tra đăng ký ví
      const data = await response.json();

      if (response.ok) {
        if (data.isRegistered) {
          setIsRegistered(true); // Tài khoản đã đăng ký
          setWalletData(data.walletData); // Lưu dữ liệu ví nếu đã đăng ký
        } else {
          setError("This wallet is not registered. Please register first.");
        }
      } else {
        setError("Failed to check wallet registration.");
      }
    } catch (err) {
      setError("An error occurred while checking wallet registration.");
    } finally {
      setLoading(false);
    }
  };

  // Kết nối với Phantom Wallet
  const connectWallet = async () => {
    if (!walletAddress) {
      setError("Please check your wallet connection.");
      return;
    }

    try {
      if (isRegistered) {
        // Check if window.solana is defined
        if (window.solana && window.solana.connect) {
          const response = await window.solana.connect();
          const connectedWalletAddress = response.publicKey.toString();
          console.log("Connected to Phantom Wallet:", connectedWalletAddress);
          setWalletAddress(connectedWalletAddress);
        } else {
          console.error("Phantom Wallet is not available.");
          setError("Phantom Wallet is not installed.");
        }
      }
    } catch (error) {
      console.error("Error during wallet connection:", error);
    }
  };

  // Ngắt kết nối
  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletData(null); // Reset dữ liệu ví khi ngắt kết nối
    setIsRegistered(false); // Reset trạng thái đăng ký
    console.log("Disconnected from Phantom Wallet");

    // Xóa địa chỉ ví khỏi localStorage
    localStorage.removeItem("walletAddress");
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

      // Gọi API để kiểm tra xem ví đã đăng ký chưa
      checkIfWalletRegistered(savedWalletAddress);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Connect to Phantom Wallet</h1>
      {walletAddress ? (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          {loading && <p>Loading wallet data...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Hiển thị thông tin ví nếu có dữ liệu */}
          {isRegistered && walletData && (
            <div>
              <p>
                <strong>User Info:</strong> {JSON.stringify(walletData)}
              </p>
            </div>
          )}

          <button
            onClick={disconnectWallet}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          {/* Nếu ví Phantom chưa cài đặt, thông báo và không cho phép kết nối */}
          {isPhantomInstalled ? (
            <button
              onClick={connectWallet}
              style={{
                padding: "10px",
                cursor: isPhantomInstalled ? "pointer" : "not-allowed",
                backgroundColor: isPhantomInstalled ? "#4CAF50" : "#E0E0E0",
                color: isPhantomInstalled ? "#fff" : "#888",
                border: "none",
                borderRadius: "5px",
              }}
              disabled={!isPhantomInstalled}
            >
              {walletAddress ? "Wallet Connected" : "Connect Wallet"}
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
      )}
    </div>
  );
};

export default WalletConnect;
