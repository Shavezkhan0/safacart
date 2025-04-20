// store/features/carbonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalCarbon: 0,
  perPageCarbon: 0.5,
};

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    increaseCarbon: (state, action) => {
      // Increase totalCarbon by the value passed in the action payload
      state.totalCarbon += action.payload;
    },
    resetCarbon: (state) => {
      state.totalCarbon = 0;
    },
    setPerPageCarbon: (state, action) => {
      state.perPageCarbon = action.payload;
    },
  },
});

export const { increaseCarbon, resetCarbon, setPerPageCarbon } = carbonSlice.actions;

export default carbonSlice.reducer;
