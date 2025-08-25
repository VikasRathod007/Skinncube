import { createSlice } from '@reduxjs/toolkit';
const initialState = { cartOpen: false, announcement: 'Free shipping on orders over Rs.500' };
const uiSlice = createSlice({ name:'ui', initialState, reducers:{ toggleCart:(state,action)=>{state.cartOpen = action.payload!==undefined? action.payload: !state.cartOpen;}, setAnnouncement:(state,action)=>{state.announcement = action.payload;} } });
export const { toggleCart, setAnnouncement } = uiSlice.actions; export default uiSlice.reducer;
