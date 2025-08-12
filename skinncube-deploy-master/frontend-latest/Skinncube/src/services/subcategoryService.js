import axios from 'axios'
import { getApiUrl } from '../utils/apiUtils'

export const fetchSubCategories = async () => {
  try {
    const response = await axios.get(`${getApiUrl()}/api/v1/subcategory/get-all-sub-category`);
    return response.data; // Return the data from the API
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const addSubCategory = async (data) => {
  try {
    const response = await axios.post(`${getApiUrl()}/api/v1/subcategory/add-subcategory`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSubCategory = async (subCategoryId) => {
  try {
    const response = await axios.delete(`${getApiUrl()}/api/v1/subcategory/delete-subcategory/${subCategoryId}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting subcategory:", error.response?.data || error.message);
    throw error; // Re-throw error for handling in the frontend
  }
};