import { configureStore } from "@reduxjs/toolkit";

import catchphraseReducer from "./catchphrase";
import listReducer from "./listwords";
import passwordReducer from "./password";
import pictionaryReducer from "./pictionary";

export default configureStore({
  reducer: {
    password: passwordReducer,
    pictionary: pictionaryReducer,
    listwords: listReducer,
    catchphrase: catchphraseReducer,
  },
});
