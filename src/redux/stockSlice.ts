import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stockData: [],
    currentPage: 1,
  },
  reducers: {
    setStockData: (state, { payload }) => {
      state.stockData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const { setStockData, setCurrentPage } = stockSlice.actions;

export default stockSlice.reducer;
