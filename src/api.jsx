// api.js
import axios from 'axios';

const BASE_URL = 'https://course-api.com/react-store-products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`https://course-api.com/react-store-single-product?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details: ', error);
    return null;
  }
};

const api = {
  getAllProducts,
  getProductById,
};

export default api;
