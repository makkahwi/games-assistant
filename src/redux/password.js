import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("password-master") || "",
  members: (localStorage.getItem("password-members") &&
    JSON.parse(localStorage.getItem("password-members"))) || [
    ["", ""],
    ["", ""],
  ],
  scores: localStorage.getItem("password-scores") || [0, 0],
  history:
    (localStorage.getItem("password-history") &&
      JSON.parse(localStorage.getItem("password-history"))) ||
    [],
};

export const passwordSlice = createSlice({
  name: "password",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.members = [
        [action.payload?.teamAmember1, action.payload?.teamAmember2],
        [action.payload?.teamBmember1, action.payload?.teamBmember2],
      ];

      localStorage.setItem("password-master", state.master);
      localStorage.setItem("password-members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.scores = [
        state.scores[0] + action.payload?.teamA,
        state.scores[1] + action.payload?.teamB,
      ];
      state.history.push(action.payload?.game);

      localStorage.setItem("password-scores", state.scores);
      localStorage.setItem("password-history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.setItem("password-master", "");
      localStorage.setItem(
        "members",
        JSON.stringify([
          ["", ""],
          ["", ""],
        ])
      );
      localStorage.setItem("password-scores", [0, 0]);
      localStorage.setItem("password-history", JSON.stringify([]));
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = passwordSlice.actions;

export default passwordSlice.reducer;
