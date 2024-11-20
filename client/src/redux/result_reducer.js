import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: [],
  score: 0,
};

export const resultReducer = createSlice({
  name: "result",
  initialState,

  reducers: {
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    calculateScore: (state, action) => {
      return {
        ...state,
        score: state.score + 1,
      };
    },

    resetResultAction: () => {
      return initialState;
    },
  },
});

export const { pushResultAction, calculateScore, resetResultAction } =
  resultReducer.actions;

export default resultReducer.reducer;
