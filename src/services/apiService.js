import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const createNFT = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/nfts/create-nft`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listNFTForSale = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/nfts/list-for-sale`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buyNFT = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/nfts/buy-nft`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNFTs = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/nfts/fetch-nfts`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllNFTs = async () => {
  try {
    const response = await axios.get(`${apiUrl}/nfts/get-all-nft`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
