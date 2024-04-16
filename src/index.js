import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import GamePage from "views/Game";
import RulesPage from "views/Rules";
import Landing from "views/Landing";
import i18n from "./i18next";

import store from "./redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-design-system.scss?v1.0.0";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Navbar type="transparent" />

        <div className="wrapper">
          <div
            className="page-header bg-default"
            style={{
              backgroundImage: "url(" + require("assets/img/bg.png") + ")",
              backgroundSize: "100% auto",
            }}
          >
            <Container>
              <Routes>
                {store.getState().game.master ? (
                  <Route path="/" exact element={<GamePage />} />
                ) : (
                  <Route path="/" exact element={<Landing />} />
                )}

                <Route path="/rules" exact element={<RulesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Container>
          </div>
        </div>

        <Footer />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
