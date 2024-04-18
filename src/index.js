import ReactDOM from "react-dom/client";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Landing from "views";
import ListWordsGame from "views/List/Game";
import ListWordsLanding from "views/List/Landing";
import ListWordsRules from "views/List/Rules";
import PassWordGame from "views/Password/Game";
import PassWordLanding from "views/Password/Landing";
import PassWordRules from "views/Password/Rules";

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
                    element={<PassWordRules />}
                  />
                  <Route
                    path="/list-words-rules"
                    exact
                    element={<ListWordsRules />}
                  />

                  {store.getState().password.master ? (
                    <Route path="/password" exact element={<PassWordGame />} />
                  ) : (
                    <Route
                      path="/password"
                      exact
                      element={<PassWordLanding />}
                    />
                  )}

                  {store.getState().list.master ? (
                    <Route
                      path="/list-words"
                      exact
                      element={<ListWordsGame />}
                    />
                  ) : (
                    <Route
                      path="/list-words"
                      exact
                      element={<ListWordsLanding />}
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
