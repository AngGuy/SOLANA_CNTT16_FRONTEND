import axios from "axios";

// Sử dụng biến môi trường để xác định URL cơ sở của API
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"; // Địa chỉ API của bạn
const API_KEY = process.env.REACT_APP_API_KEY; // Đảm bảo bạn đã khai báo trong file .env

// Hàm dùng Axios để gọi API
const axiosAPI = async (
  url: string,
  method: string = "GET",
  data: any = null
) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "", // Nếu có API_KEY
      },
      data,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "API call failed");
  }
};

// Hàm dùng Fetch để gọi API
const fetchAPI = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": API_KEY || "",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "API call failed");
  }

  return response.json();
};

// API: Đăng ký người dùng
export const registerUser = async (userData: {
  referenceId: string;
  email: string;
  externalWalletAddress: string;
}) => {
  return axiosAPI("/register", "POST", userData);
};

// API: Đưa NFT lên sàn
export const listAssetForSale = async (saleData: any) => {
  return axiosAPI("/list-asset-for-sale", "POST", saleData);
};

// API: Mua NFT
export const buyNFT = async (purchaseData: any) => {
  return axiosAPI("/buy-nft", "POST", purchaseData);
};

// API: Lấy tất cả NFTs
export const getAllNFTs = async () => {
  return axiosAPI("/get-all-nft");
};

// API: Lấy NFT theo itemId
export const getNFTById = async (itemId: string) => {
  return axiosAPI(`/get-item/${itemId}`);
};

// API: Lấy danh sách NFT của người dùng
export const fetchNFTs = async ({
  ownerReferenceId,
}: {
  ownerReferenceId: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/fetch-nfts`, {
    ownerReferenceId,
  });
  return response.data;
};

// Fetch danh sách Assets
export const fetchAssets = async () => {
  const url = `${API_BASE_URL}/nx/items`;
  return fetchAPI(url, { method: "GET" });
};

export const createNFT = async (data: {
  name: string;
  description: string;
  imageUrl: string;
  destinationUserReferenceId: string;
  attributes: { traitType: string; value: string }[];
}) => {
  const url = `${API_BASE_URL}/nfts/create-nft`;

  // Định dạng payload gửi đến backend
  const body = JSON.stringify({
    details: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      attributes: data.attributes,
    },
    destinationUserReferenceId: data.destinationUserReferenceId,
  });

  // Gửi yêu cầu đến API
  return fetchAPI(url, { method: "POST", body });
};

// Lấy thông tin người dùng
export const getUserProfile = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) throw new Error("User is not logged in");

  const url = `${API_BASE_URL}/user/profile`;
  return fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Đăng nhập người dùng
export const loginUser = async (data: { email: string; password: string }) => {
  const url = `${API_BASE_URL}/auth/login`;
  const body = JSON.stringify({
    email: data.email,
    password: data.password,
  });

  return fetchAPI(url, { method: "POST", body });
};