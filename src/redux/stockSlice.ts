import { createSlice } from "@reduxjs/toolkit";
import type { Stock } from "../components/stockTable";

interface StockState {
  stockData: Stock[];
  currentPage: number;
}

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stockData: [],
    currentPage: 1,
  } as StockState,
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
