import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("listwords-master") || "",
  members: (localStorage.getItem("listwords-members") &&
    JSON.parse(localStorage.getItem("listwords-members"))) || ["", ""],
  history:
    (localStorage.getItem("listwords-history") &&
      JSON.parse(localStorage.getItem("listwords-history"))) ||
    [],
};

export const listwordsSlice = createSlice({
  name: "listwords",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.members = [action.payload?.member1, action.payload?.member2];

      localStorage.setItem("listwords-master", state.master);
      localStorage.setItem("listwords-members", JSON.stringify(state.members));
    },
    addScores: (state, action) => {
      state.history.push(action.payload);

      localStorage.setItem("listwords-history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.removeItem("listwords-master");
      localStorage.removeItem("listwords-members");
      localStorage.removeItem("listwords-history");
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = listwordsSlice.actions;

export default listwordsSlice.reducer;
