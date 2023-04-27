import { createSlice } from "@reduxjs/toolkit";

let idSlice = createSlice({
  name: "id",
  initialState: "",
  reducers: {
    setId: (state, action) => action.payload,
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
