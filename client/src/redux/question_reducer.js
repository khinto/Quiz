import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  queue: [],
  answers: [],
  trace: 0,
};

export const questionReducer = createSlice({
  name: "questions",
  initialState,
  reducers: {
    startExamAction: (state, action) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    moveNextQestion: (state) => {
      return {
        ...state,

        trace: state.trace + 1,
      };
    },

    resetTrace: (state) => {
      state.trace = 0;
    },

    resetAllAction: () => {
      return initialState;
    },

    setTrace: (state, action) => {
      state.trace = action.payload;
    },
  },
});

export const {
  startExamAction,
  queue,
  trace,
  moveNextQestion,
  resetAllAction,
  setTrace,
  resetTrace,
} = questionReducer.actions;
export default questionReducer.reducer;
