import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: { videos: [], loading: false },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setVideos, setLoading } = videoSlice.actions;
export default videoSlice.reducer;
