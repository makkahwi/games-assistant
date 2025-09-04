import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  master: localStorage.getItem("mafia-master") || "",
  roles: (localStorage.getItem("mafia-roles") &&
    JSON.parse(localStorage.getItem("mafia-roles"))) || [
    ["", ""],
    ["", ""],
  ],
};

export const mafiaSlice = createSlice({
  name: "mafia",
  initialState: initValues,
  reducers: {
    setRoles: (state, action) => {
      const { master, ...roles } = action.payload;

      state.master = master;
      state.roles = roles;

      localStorage.setItem("mafia-master", state.master);
      localStorage.setItem("mafia-roles", JSON.stringify(state.roles));
    },
    reset: (state) => {
      localStorage.removeItem("mafia-master");
      localStorage.removeItem("mafia-roles");
      state = initValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoles, reset } = mafiaSlice.actions;

export default mafiaSlice.reducer;
