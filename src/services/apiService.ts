import axios from "axios";

// Sử dụng biến môi trường để xác định URL cơ sở của API
const API_BASE_URL = "http://localhost:5000/api"; // Địa chỉ API của bạn
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

export const listAssetForSale = async (data: {
  IdNFT: string;
  currencyId: string;
  naturalAmount: number;
}) => {
  const url = `http://localhost:5000/api/nfts/list-for-sale`;

  const body = JSON.stringify(data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Backend error:", errorData);
    throw new Error(errorData.error || "Failed to list asset for sale.");
  }

  return await response.json();
};

// API: Mua NFT
export const buyNFT = async (purchaseData: any) => {
  return axiosAPI("/buy-nft", "POST", purchaseData);
};

// API: Lấy tất cả NFTs
export const getAllNFTs = async () => {
  const apiUrl = "http://localhost:5000/api/nfts/get-all-nft"; // API của bạn
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch NFTs");
    }

    const data = await response.json();
    return data.data.map((item: any) => item.item); // Trích xuất 'item' từ 'data'
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
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
  try {
    const response = await axios.get(
      "http://localhost:5000/api/nfts/get-all-nft"
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export const createNFT = async (data: {
  attributes: { traitType: string; value: string }[];
  collectionId?: string; // Optional, sẽ dùng mặc định từ backend nếu không truyền
  description: string;
  imageUrl: string;
  name: string;
  destinationUserReferenceId: string;
}) => {
  const url = `http://localhost:5000/api/nfts/create-nft`;

  const payload = {
    attributes: data.attributes,
    collectionId: data.collectionId, // Optional, nếu undefined thì backend sẽ sử dụng giá trị mặc định
    description: data.description,
    imageUrl: data.imageUrl,
    name: data.name,
    destinationUserReferenceId: data.destinationUserReferenceId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create NFT.");
    }

    const responseData = await response.json();
    console.log("NFT created successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error creating NFT:", error);
    throw error;
  }
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
