import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`https://${apiUrl}/api/v1/category/get-all-category`);
    return response.data; // Return the data from the API
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const addCategories = async (categoryData) => {
  try {
    const response = await axios.post(`https://${apiUrl}/api/v1/category/create-category`, 
      categoryData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data; // Return the data from the API
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`https://${apiUrl}/api/v1/category/delete-category/${categoryId}`, {
      withCredentials: true,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error; // Re-throw error for handling in the frontend
  }
};