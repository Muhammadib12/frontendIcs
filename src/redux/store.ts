import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardReducer.ts";
import sidebarReducer from "./slices/sidebarSlice";
import filterReducer from "./slices/filterSlice.ts";
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    SideBar: sidebarReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
