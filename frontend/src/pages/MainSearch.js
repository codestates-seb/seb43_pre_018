// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// // import { setSearchResults } from "../slices/searchSlice";

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     searchTerm: "",
//     searchResults: [],
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//     setSearchResults: (state, action) => {
//       state.searchResults = action.payload;
//     },
//   },
// });

// export const search = (searchTerm) => async (dispatch) => {
//   try {
//     const response = await axios.get(`/search?query=${searchTerm}`);
//     dispatch(setSearchResults(response.data.results));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const { setSearchTerm, setSearchResults } = searchSlice.actions;
// // export default searchSlice.reducer;
