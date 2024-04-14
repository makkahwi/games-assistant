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
      state.master = action.payload?.master;
      state.members = [
        [action.payload?.team1member1, action.payload?.team1member2],
        [action.payload?.team2member1, action.payload?.team2member2],
      ];
    },
    addScores: (state, action) => {
      state.scores = [
        state.scores[0] + action.payload?.team1,
        state.scores[1] + action.payload?.team2,
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
