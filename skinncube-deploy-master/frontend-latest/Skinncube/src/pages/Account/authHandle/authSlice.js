import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, loginUser, logoutUser } from './authAPI';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
  isLoading: false,
  userInfo: null,
};

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      console.log("🔍 authSlice - Login response:", response);
      return response;
    } catch (error) {
      console.log("❌ authSlice - Login error:", error);
      return rejectWithValue(error.message || error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuth();
      console.log("🔍 authSlice - checkAuth response:", response);
      return response;
    } catch (error) {
      console.log("❌ authSlice - checkAuth error:", error);
      return rejectWithValue(error);
    }
  }
)

export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      console.log("🔍 authSlice - logout response:", response);
      return response;
    } catch (error) {
      console.log("❌ authSlice - logout error:", error);
      return rejectWithValue(error.message);
    }
  }
)

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log("🎉 authSlice - Login fulfilled, payload:", action.payload);
        state.status = 'idle';
        const payload = action.payload;
        // Handle both ApiResponse format and direct response format
        const user = payload.data?.user || payload.user;
        const accessToken = payload.data?.accessToken || payload.accessToken;
        state.userInfo = user || null;
        state.loggedInUserToken = accessToken || null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        console.log("✅ authSlice - checkAuth fulfilled, payload:", action.payload);
        state.status = 'idle';
        const payload = action.payload;
        // Handle both ApiResponse format and direct response format
        state.userInfo = payload.data?.user || payload.user || null;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = false;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.loggedInUserToken = null;
        state.userInfo = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;