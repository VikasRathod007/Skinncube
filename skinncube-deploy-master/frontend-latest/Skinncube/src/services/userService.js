import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

export const addAddress = async (address) => {
    try {
      const response = await axios.post(
        `https://${apiUrl}/api/v1/users/addAdrress`, // Replace with your actual endpoint
        address,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data; // Assuming the API returns the updated list of addresses
    } catch (error) {
      console.error("Error adding address:", error);
      throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
  };

  export const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        `https://${apiUrl}/api/v1/users/register`, // Replace with your actual endpoint
        userData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      return response.data; // Assuming the API returns the created user data or a success message
    } catch (error) {
      console.error("Error registering user:", error);
      throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
  };