import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    savedJobs: [],
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const exists = state.savedJobs.find((j) => j._id === job._id);

      if (exists) {
        // remove if already exists
        state.savedJobs = state.savedJobs.filter((j) => j._id !== job._id);
      } else {
        // add to beginning
        state.savedJobs = [job, ...state.savedJobs];
      }
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
