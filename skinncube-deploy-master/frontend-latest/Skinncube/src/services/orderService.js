import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchOrders = async (id) => {
    try {
        const response = await axios.get(`https://${API_URL}/api/v1/order/get-orders`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  };

  export const addPharmacyService = async (payload) => {
    try {
        const response = await axios.post(`https://${API_URL}/api/v1/order/update-orders-add-pharmacy`,
            payload,{
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  };