import { createSlice } from '@reduxjs/toolkit';

// reducer pour param route get
// onClick sur hashtag dans component Trendjs


const initialState = {
  value : " ", search : ""
};

export const trendSlice = createSlice({
  name: 'trend',
  initialState,
  reducers: {
    displayHashtag: (state, action) => {
      state.value = action.payload
    },
    displaySearch: (state, action) => {
      state.search = action.payload
    },
  },
});

export const { displayHashtag , displaySearch } = trendSlice.actions;
export default trendSlice.reducer;