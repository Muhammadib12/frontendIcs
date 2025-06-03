import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardReducer.ts";
import sidebarReducer from "./slices/sidebarSlice";
import filterReducer from "./slices/filterSlice.ts";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    SideBar: sidebarReducer,
    filters: filterReducer,
    auth: authReducer, // ✅ تأكد أنك أضفته
  },
});

// ✅ هذه السطور ضرورية
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
