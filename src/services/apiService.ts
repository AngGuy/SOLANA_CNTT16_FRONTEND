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

//hủy bán NFT
export const cancelAssetListing = async (IdNFT: string) => {
  const url = `http://localhost:5000/api/nfts/cancelNFT`;

  const body = JSON.stringify({ IdNFT });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Đảm bảo yêu cầu JSON
      },
      body,
    });

    const responseText = await response.text(); // Đọc toàn bộ phản hồi

    if (!response.ok) {
      // Nếu phản hồi không thành công
      console.error("Failed to cancel listing:", response.status, responseText);

      // Thử parse JSON lỗi chi tiết (nếu có)
      let errorDetail;
      try {
        errorDetail = JSON.parse(responseText);
      } catch {
        errorDetail = { message: responseText };
      }

      throw new Error(errorDetail.error || "Failed to cancel asset listing.");
    }

    // Nếu phản hồi thành công
    return JSON.parse(responseText);
  } catch (error: any) {
    console.error("Error while canceling asset listing:", error.message);
    throw new Error(error.message || "Something went wrong.");
  }
};

// API: Mua NFT

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

export const getAllNFTForSale = async () => {
  const apiUrl = "http://localhost:5000/api/nfts/get-all-nft-sale"; // API của bạn
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

export const getNFTById = async (itemId: string) => {
  // API của bạn
  try {
    const apiUrl = `http://localhost:5000/api/nfts/get-item/${itemId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch NFT details");
    }

    const data = await response.json();
    console.log("API response data:", data); // In kết quả trả về từ API
    return data.data; // Kiểm tra nếu cần thay đổi thuộc tính trả về của data
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    throw error;
  }
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
export const buyNFT = async (data: { IdNFT: string; buyerId: string }) => {
  const url = `http://localhost:5000/api/nfts/buy-nft`;
  const payload = {
    IdNFT: data.IdNFT,
    buyerId: data.buyerId,
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
export const registerUser = async (userData: {
  email: string;
  referenceId: string;
  externalWalletAddress: string;
}) => {
  const url = `http://localhost:5000/api/users/register`;
  const payload = {
    email: userData.email,
    referenceId: userData.referenceId,
    externalWalletAddress: userData.externalWalletAddress,
  };

  const body = JSON.stringify(userData);

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
