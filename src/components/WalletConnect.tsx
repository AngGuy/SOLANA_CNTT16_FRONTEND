import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng để điều hướng

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook điều hướng

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

        // Gọi API kiểm tra tài khoản đã đăng ký hay chưa
        checkIfWalletRegistered(walletAddress);
      } else {
        alert(
          "Phantom Wallet is not installed. Please install it from https://phantom.app"
        );
      }
    } catch (error) {
      console.error("User rejected the connection:", error);
    }
  };

  // Kiểm tra tài khoản đã đăng ký hay chưa
  const checkIfWalletRegistered = async (walletAddress: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/check-email/${walletAddress}`,
        {
          method: "POST", // Đặt phương thức là POST
          headers: {
            "Content-Type": "application/json", // Đảm bảo gửi đúng kiểu dữ liệu
          },
          body: JSON.stringify({ walletAddress }), // Gửi địa chỉ ví trong phần body
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Kiểm tra nếu có email
        if (data.email) {
          alert("Wallet connected successfully!"); // Thông báo thành công
        } else {
          throw new Error("Wallet is not registered.");
        }
      } else {
        throw new Error(data.error || "Failed to check wallet registration.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      // Nếu chưa đăng ký, điều hướng đến trang đăng ký
      alert("Wallet not registered. Redirecting to registration page.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra nếu Phantom Wallet đã được cài đặt
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
          <button
            onClick={() => {
              setWalletAddress(null);
              localStorage.removeItem("walletAddress");
              setError(null); // Xóa lỗi nếu có
            }}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
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
      )}
      {!isPhantomInstalled && (
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
