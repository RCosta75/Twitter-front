import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {isUpdated: false}
};

export const tweetRexSlice = createSlice({
  name: 'tweetRex',
  initialState,
  reducers: {
    updateTweet: (state) => {
      state.value.isUpdated = !state.value.isUpdated;
    },
  },
});

export const { updateTweet } = tweetRexSlice.actions;
export default tweetRexSlice.reducer;

