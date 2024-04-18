import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("list-master") || "",
  members: (localStorage.getItem("list-members") &&
    JSON.parse(localStorage.getItem("list-members"))) || ["", ""],
  scores: localStorage.getItem("list-scores") || [0, 0],
  history:
    (localStorage.getItem("list-history") &&
      JSON.parse(localStorage.getItem("list-history"))) ||
    [],
};

export const listSlice = createSlice({
  name: "list",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.members = [action.payload?.member1, action.payload?.member2];

      localStorage.setItem("list-master", state.master);
      localStorage.setItem("list-members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.scores = [
        parseInt(state.scores[0]) + action.payload?.teamA,
        parseInt(state.scores[1]) + action.payload?.teamB,
      ];
      state.history.push(action.payload?.game);

      localStorage.setItem("list-scores", state.scores);
      localStorage.setItem("list-history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.setItem("list-master", "");
      localStorage.setItem("list-members", JSON.stringify(["", ""]));
      localStorage.setItem("list-scores", [0, 0]);
      localStorage.setItem("list-history", JSON.stringify([]));
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = listSlice.actions;

export default listSlice.reducer;
