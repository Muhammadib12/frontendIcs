// redux/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  city: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  minRoom: number;
  maxRoom: number;
  sizeMmi: number;
  sizeMma: number;
  features?: string[];
  status: string;
  // أضف أي فلتر آخر
}

const initialState: FilterState = {
  city: "",
  type: "",
  minPrice: "",
  maxPrice: "",
  minRoom: 0,
  maxRoom: 0,
  sizeMmi: 0,
  sizeMma: 0,
  status: "הכל",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
