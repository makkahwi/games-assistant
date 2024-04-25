import ReactDOM from "react-dom/client";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Landing from "views";
import CatchPhraseGame from "views/CatchPhrase/Game";
import CatchPhraseLanding from "views/CatchPhrase/Landing";
import CatchPhraseRules from "views/CatchPhrase/Rules";
import ListWordsGame from "views/ListWords/Game";
import ListWordsLanding from "views/ListWords/Landing";
import ListWordsRules from "views/ListWords/Rules";
import PassWordGame from "views/Password/Game";
import PassWordLanding from "views/Password/Landing";
import PassWordRules from "views/Password/Rules";

import i18next from "./redux/i18next";
import store from "./redux/store";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const { i18n } = useTranslation();

  document.dir = i18n.dir();
  document.lang = i18n.language;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Navbar />

          <div
            className="py-5 mt-5 bg-primary"
            style={{
              backgroundImage: "url(" + require("assets/img/bg.png") + ")",
              backgroundSize: "100% auto",
              minHeight: "90vh",
            }}
          >
            <div className="container my-auto">
              <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route
                  path="/password-rules"
                  exact
                  element={<PassWordRules />}
                />
                <Route
                  path="/listwords-rules"
                  exact
                  element={<ListWordsRules />}
                />
                <Route
                  path="/catchphrase-rules"
                  exact
                  element={<CatchPhraseRules />}
                />

                {store.getState().password.master ? (
                  <Route path="/password" exact element={<PassWordGame />} />
                ) : (
                  <Route path="/password" exact element={<PassWordLanding />} />
                )}

                {store.getState().listwords.master ? (
                  <Route path="/listwords" exact element={<ListWordsGame />} />
                ) : (
                  <Route
                    path="/listwords"
                    exact
                    element={<ListWordsLanding />}
                  />
                )}

                {store.getState().catchphrase.master ? (
                  <Route
                    path="/catchphrase"
                    exact
                    element={<CatchPhraseGame />}
                  />
                ) : (
                  <Route
                    path="/catchphrase"
                    exact
                    element={<CatchPhraseLanding />}
                  />
                )}

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
};

root.render(<App />);
