import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  format: localStorage.getItem("pictionary-format") || "teams",
  master: localStorage.getItem("pictionary-master") || "",
  members: (localStorage.getItem("pictionary-members") &&
    JSON.parse(localStorage.getItem("pictionary-members"))) || [
    ["", ""],
    ["", ""],
  ],
  history:
    (localStorage.getItem("pictionary-history") &&
      JSON.parse(localStorage.getItem("pictionary-history"))) ||
    [],
};

export const pictionarySlice = createSlice({
  name: "pictionary",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.format = action.payload?.format || "teams";
      state.history = [];
      state.members = action.payload?.members || [
        [action.payload?.teamAmember1, action.payload?.teamAmember2],
        [action.payload?.teamBmember1, action.payload?.teamBmember2],
      ];

      localStorage.setItem("pictionary-format", state.format);
      localStorage.setItem("pictionary-history", "[]");
      localStorage.setItem("pictionary-master", state.master);
      localStorage.setItem("pictionary-members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.history.push(action.payload);

      localStorage.setItem("pictionary-history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.removeItem("pictionary-master");
      localStorage.removeItem("pictionary-members");
      localStorage.removeItem("pictionary-history");
      localStorage.removeItem("pictionary-format");
      state.master = "";
      state.members = [["", ""], ["", ""]];
      state.history = [];
      state.format = "teams";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = pictionarySlice.actions;

export default pictionarySlice.reducer;
