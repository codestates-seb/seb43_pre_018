import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import idReducer from "./idSlice";
import { create } from "zustand";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    id: idReducer,
  },
});

const useSearchPopUpStore = create((set) => ({
  showPopUp: false,
  handlePopUp: () => set((state) => ({ showPopUp: !state.showPopUp })),
}));

const useShareSheetStore = create((set) => ({
  showShareSheet: false,
  handleShareSheet: () =>
    set((state) => ({ showShareSheet: !state.showShareSheet })),
}));

export { useSearchPopUpStore, useShareSheetStore };

export default store;
