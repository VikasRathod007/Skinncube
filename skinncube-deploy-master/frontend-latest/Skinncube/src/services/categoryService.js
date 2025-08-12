import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

export const fetchCategories = async () => {
  try {
    const apiEndpoint = getApiUrl('/api/v1/category/get-all-category');
    const response = await axios.get(apiEndpoint);
    return response.data; // Return the data from the API
  } catch (error) {
    console.error('API Error:', error);
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const addCategories = async (categoryData) => {
  try {
    const apiEndpoint = getApiUrl('/api/v1/category/create-category');
    const response = await axios.post(apiEndpoint,
      categoryData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data; // Return the data from the API
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const apiEndpoint = getApiUrl(`/api/v1/category/delete-category/${categoryId}`);
    const response = await axios.delete(apiEndpoint, {
      withCredentials: true,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error; // Re-throw error for handling in the frontend
  }
};