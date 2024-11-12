import { createSlice } from '@reduxjs/toolkit';



const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likedSongs: [],
  },
  reducers: {
    addLike: (state, action) => {
      const song = action.payload;
      if (!state.likedSongs.find((s) => s.id === song.id)) {
        state.likedSongs.push(song);
      }
    },
    removeLike: (state, action) => {
      const songId = action.payload;
      state.likedSongs = state.likedSongs.filter((song) => song.id !== songId);
    },
  },
});

export const { addLike, removeLike } = likesSlice.actions;
export default likesSlice.reducer;
