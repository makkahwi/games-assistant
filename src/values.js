import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("master") || "",
  members: (localStorage.getItem("members") &&
    JSON.parse(localStorage.getItem("members"))) || [
    ["", ""],
    ["", ""],
  ],
  scores: localStorage.getItem("scores") || [0, 0],
  history:
    (localStorage.getItem("history") &&
      JSON.parse(localStorage.getItem("history"))) ||
    [],
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

      localStorage.setItem("master", state.master);
      localStorage.setItem("members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.scores = [
        state.scores[0] + action.payload?.team1,
        state.scores[1] + action.payload?.team2,
      ];
      state.history.push(action.payload?.game);

      localStorage.setItem("scores", state.scores);
      localStorage.setItem("history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.setItem("master", "");
      localStorage.setItem(
        "members",
        JSON.stringify([
          ["", ""],
          ["", ""],
        ])
      );
      localStorage.setItem("scores", [0, 0]);
      localStorage.setItem("history", JSON.stringify([]));
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = gameSlice.actions;

export default gameSlice.reducer;
