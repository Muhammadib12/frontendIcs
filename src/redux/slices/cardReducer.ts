import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store"; // تأكد أن لديك store مضبوط ويحتوي على AppDispatch
import axiosInstance from "../../utils/axios";

// تعريف الكارت
export interface CardItem {
  id: number;
  title: string;
  price: string;
  location: string;
  size: string;
  rooms: number;
  baths: number;
  image: string;
  forSale: boolean;
  datePosted: string;
  features: string[];
  description?: string;
  owner: string;
  type: string; // نوع العقار (شقة، بيت، إلخ)
}

interface CardsState {
  items: CardItem[];
  loadingCard: boolean;
}

const initialState: CardsState = {
  items: [],
  loadingCard: false,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardItem[]>) {
      state.items = action.payload;
    },
    addCard(state, action: PayloadAction<CardItem>) {
      state.items.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingCard = action.payload;
    },
  },
});

export const fetchCards = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("api/cards");
    dispatch(setCards(response.data));
  } catch (error) {}
};

export const createCard =
  (newCard: Omit<CardItem, "id">) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true)); // بدء التحميل
      const response = await axiosInstance.post("/api/cards/addCard", newCard);
      dispatch(addCard(response.data));
    } catch (error) {
    } finally {
      dispatch(setLoading(false)); // إيقاف التحميل
    }
  };

export const { setCards, addCard, setLoading } = cardsSlice.actions;

export default cardsSlice.reducer;
