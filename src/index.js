import ReactDOM from "react-dom/client";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Landing from "views";
import GamePage from "views/Password/Game";
import PasswordLanding from "views/Password/Landing";
import PasswordRules from "views/Password/Rules";

import i18next from "./redux/i18next";
import store from "./redux/store";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-design-system.scss?v1.0.0";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const { i18n } = useTranslation();

  document.dir = i18n.dir();
  document.lang = i18n.language;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
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
                  <Route path="/" exact element={<Landing />} />
                  <Route
                    path="/password-rules"
                    exact
                    element={<PasswordRules />}
                  />

                  {store.getState().password.master ? (
                    <Route path="/password" exact element={<GamePage />} />
                  ) : (
                    <Route
                      path="/password"
                      exact
                      element={<PasswordLanding />}
                    />
                  )}

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
};

root.render(<App />);
