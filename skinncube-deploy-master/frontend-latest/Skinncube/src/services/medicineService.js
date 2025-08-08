import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMedicines = async (query = {}) => {
    const params = new URLSearchParams(query).toString();
    const response = await axios.get(`https://${API_URL}/api/v1/medicine?${params}`);
    return response.data; // Assumes API response includes `data` and `meta`
};

export const deleteMedicineById = async (id) => {
  try {
      const response = await axios.delete(`https://${API_URL}/api/v1/medicine/delete-medicine/${id}`, {
          withCredentials: true,
      });
      return response.data;
  } catch (error) {
      console.error('Error deleting medicine:', error);
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};

export const addProduct = async (product) => {
    try {
      const formData = new FormData();
      if (product.images && product.images[0]) {
        formData.append('images', product.images[0]);
      }

      Object.keys(product).forEach(key => {
        if (key !== 'images') {
          formData.append(key, product[key]);
        }
      });
      const response = await fetch(`https://${API_URL}/api/v1/medicine/add-medicine`, {
        method: "POST",
        headers: {
          
        },
        credentials: "include",
        // body: JSON.stringify(product),
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

export const updateMedicineById = async (id, updateData) => {
    try {
      // console.log(`Sending update request for medicine ID: ${updateData._id}`);
      // console.log('Update data:', updateData);

      const response = await axios.put(
        `https://${API_URL}/api/v1/medicine/update-medicine/${updateData._id}`, 
        updateData, 
        { 
          headers: { 
            "Content-Type": "application/json" 
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  };