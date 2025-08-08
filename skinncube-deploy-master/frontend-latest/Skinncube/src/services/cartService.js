import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: `https://${API_URL}/api/v1`, // Your base URL
  withCredentials: true, // For cookies
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response, // Pass the response if it's successful
  (error) => {
    console.log("Here")
    if (error.response?.status === 401) {
      toast.error("You must be logged in to access this page");
      window.location.href = "/signin"; // Redirect to login page
    }
    return Promise.reject(error); // Pass the error to be handled later
  }
);

// Get Cart for the logged-in user
const getCart = async () => {
    const response = await api.get("/cart/getcart", {
        withCredentials: true
    });
    return response.data;
};

// Add or Update Item in Cart
const addOrUpdateCartItem = async (medicineId, quantity) => {
    const response = await api.post(
        "/cart/addupdatecart",
        { medicineId, quantity },
        {
            withCredentials: true
        }
    );
    return response.data;
};

// Update Item Quantity
const updateItemQuantity = async (token, medicineId, action) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
        `${API_URL}/update-quantity`,
        { medicineId, action },
        config
    );
    return response.data;
};

// Remove Item from Cart
const removeFromCart = async (medicineId) => {
    const response = await axios.delete(`http://${API_URL}/api/v1/cart/removecart/${medicineId}`, {
        withCredentials: true
    });
    return response.data;
};

// Clear Cart
const clearCart = async (token) => {
    const response = await axios.delete(`${API_URL}/clear`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export default {
    getCart,
    addOrUpdateCartItem,
    removeFromCart,
    clearCart,
    updateItemQuantity
};
