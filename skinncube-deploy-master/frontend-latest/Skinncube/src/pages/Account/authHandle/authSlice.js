import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, loginUser, logoutUser } from './authAPI';

const initialState = {
    loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
    status: 'idle',
    error: null,
    userChecked: false,
    mailSent: false,
    passwordReset:false,
    isLoading: false,
    userInfo: null,
  };

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async (_,{rejectWithValue}) => {
    try {
      const response = await checkAuth();
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
)

export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async (_,{rejectWithValue}) => {
    try {
      const response = await logoutUser();
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
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
          console.log(action.payload.data.user)
          state.status = 'idle';
          state.userInfo = action.payload.data.user;
          state.loggedInUserToken = action.payload.data.accessToken;
        })
        .addCase(loginUserAsync.rejected, (state, action) => {
          state.status = 'idle';
          state.error = action.payload;
        })
        .addCase(checkAuthAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(checkAuthAsync.fulfilled, (state, action) => {
          // console.log(action.payload.user);
          state.status = 'idle';
          state.userInfo = action.payload.user;
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