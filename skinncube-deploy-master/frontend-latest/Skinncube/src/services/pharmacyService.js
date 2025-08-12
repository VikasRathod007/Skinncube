import axios from "axios";
import { getApiUrl } from '../utils/apiUtils'

export const fetchPharmacy = async () => {
  try {
    const response = await axios.get(
      `${getApiUrl()}/api/v1/pharmacy/get-all`,
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