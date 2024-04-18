import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./list";
import passwordReducer from "./password";

export default configureStore({
  reducer: {
    password: passwordReducer,
    list: listReducer,
  },
});
