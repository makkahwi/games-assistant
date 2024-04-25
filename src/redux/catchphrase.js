import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("catchphrase-master") || "",
  members: (localStorage.getItem("catchphrase-members") &&
    JSON.parse(localStorage.getItem("catchphrase-members"))) || ["", ""],
  history:
    (localStorage.getItem("catchphrase-history") &&
      JSON.parse(localStorage.getItem("catchphrase-history"))) ||
    [],
};

export const catchphraseSlice = createSlice({
  name: "catchphrase",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      state.master = action.payload?.master;
      state.members = [action.payload?.member1, action.payload?.member2];

      localStorage.setItem("catchphrase-master", state.master);
      localStorage.setItem(
        "catchphrase-members",
        JSON.stringify(state.members)
      );
    },
    addScores: (state, action) => {
      state.history.push(action.payload);

      localStorage.setItem(
        "catchphrase-history",
        JSON.stringify(state.history)
      );
    },
    reset: (state) => {
      localStorage.removeItem("catchphrase-master");
      localStorage.removeItem("catchphrase-members");
      localStorage.removeItem("catchphrase-history");
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = catchphraseSlice.actions;

export default catchphraseSlice.reducer;
