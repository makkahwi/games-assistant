import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("password-master") || "",
  members: (localStorage.getItem("password-members") &&
    JSON.parse(localStorage.getItem("password-members"))) || [
    ["", ""],
    ["", ""],
  ],
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
      state.history.push(action.payload);

      localStorage.setItem("password-history", JSON.stringify(state.history));
    },
    reset: (state) => {
      localStorage.removeItem("password-master");
      localStorage.removeItem("members");
      localStorage.removeItem("password-history");
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = passwordSlice.actions;

export default passwordSlice.reducer;
