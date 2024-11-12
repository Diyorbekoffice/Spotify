import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../axios';

export const fetchSongs = createAsyncThunk('music/fetchSongs', async (id) => {
  const response = await http.get(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN` },
  });
  return response.data;
});

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    songs: [],
    playlist: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songs = action.payload.tracks.items;
        state.playlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchSongs.rejected, (state) => {
        state.loading = false;
        state.error = "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      });
  },
});

export default musicSlice.reducer;
