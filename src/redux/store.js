import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./listwords";
import passwordReducer from "./password";

export default configureStore({
  reducer: {
    password: passwordReducer,
    listwords: listReducer,
  },
});
