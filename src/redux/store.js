import { configureStore } from "@reduxjs/toolkit";

import catchphraseReducer from "./catchphrase";
import listReducer from "./listwords";
import passwordReducer from "./password";

export default configureStore({
  reducer: {
    password: passwordReducer,
    listwords: listReducer,
    catchphrase: catchphraseReducer,
  },
});
