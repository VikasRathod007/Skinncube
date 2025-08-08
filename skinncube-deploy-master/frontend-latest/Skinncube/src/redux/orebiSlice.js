import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartService from "../services/cartService";

// Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (thunkAPI) => {
  try {
    const response = await cartService.getCart();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ medicineId, quantity }, thunkAPI) => {
    try {
      console.log(medicineId, quantity);
      
      const response = await cartService.addOrUpdateCartItem(medicineId, quantity);
      return response;
    } catch (error) {
      console.log(error.response?.data || "Failed to add item to cart");
      
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add item to cart");
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "orebi/updateQuantity",
  async ({ cartItemId, quantity }) => {
    const response = await axios.patch(`/cart/${cartItemId}`, { quantity });
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteFromCart",
  async (cartItemId, thunkAPI) => {
    try {
      console.log("Deleting cart item with ID:", cartItemId);

      const response = await cartService.removeFromCart(cartItemId);
      return response;
    } catch (error) {
      // Log the error message for debugging
      console.error(error.response?.data || "Failed to delete item from cart");

      // Reject with a meaningful error message
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete item from cart");
    }
  }
);

export const resetCart = createAsyncThunk("orebi/resetCart", async (userId) => {
  await axios.delete(`/cart/${userId}`);
  return [];
});

// Initial State
const initialState = {
  userInfo: {}, // Assuming user data is stored here
  products: [],
  loading: false,
  error: null,
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.items;
        console.log(state.products);
        
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state.error);
        
        state.products=[];
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addToCart.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state.error);
        
      })
      // Update Quantity
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index >= 0) {
          state.products[index].quantity = action.payload.quantity;
        }
      })
      // Delete Item
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.products = action.payload.data.items;
      })
      // Reset Cart
      .addCase(resetCart.fulfilled, (state) => {
        state.products = [];
      });
  },
});

export default orebiSlice.reducer;
