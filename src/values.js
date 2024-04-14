import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: "",
  members: [
    ["", ""],
    ["", ""],
  ],
  scores: [0, 0],
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.master;
      state.members = [
        [action.team1member1],
        [action.team1member2],
        [action.team2member1],
        [action.team2member2],
      ];
    },
    addScores: (state, action) => {
      state.scores = [
        state.scores[0] + action.team1,
        state.scores[1] + action.team2,
      ];
    },
    reset: (state) => {
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = gameSlice.actions;

export default gameSlice.reducer;
