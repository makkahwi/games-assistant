import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./values";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
