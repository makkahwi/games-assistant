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

export const listSlice = createSlice({
  name: "list",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.members = [
        [action.payload?.teamAmember1, action.payload?.teamAmember2],
        [action.payload?.teamBmember1, action.payload?.teamBmember2],
      ];

      localStorage.setItem("master", state.master);
      localStorage.setItem("members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.scores = [
        state.scores[0] + action.payload?.teamA,
        state.scores[1] + action.payload?.teamB,
      ];
      state.history.push(action.payload?.list);

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
export const { setNames, addScores, reset } = listSlice.actions;

export default listSlice.reducer;
