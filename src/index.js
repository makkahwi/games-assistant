import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import GamePage from "views/Game";
import Landing from "views/Landing";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-design-system.scss?v1.0.0";
import { Provider } from "react-redux";
import store from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar type="transparent" />

      <Routes>
        {store.getState().game.master ? (
          <Route path="/" exact element={<GamePage />} />
        ) : (
          <Route path="/" exact element={<Landing />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  </Provider>
);
