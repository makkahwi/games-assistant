import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GameView = ({ header, game, teams, scores, reset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("gameTab");

  useLayoutEffect(() => {
    document.body.classList.add("landing-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <div className="row text-center">
      <div className="col-lg-7 mx-auto text-white">{header}</div>

      <div className="col-lg-7 mx-auto text-white" lg="7">
        <ul className="nav nav-tabs nav-fill" role="tablist">
          <div className="nav-item">
            <div
              className={
                "nav-link " +
                (activeTab === "gameTab" ? "active" : "text-white bg-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("gameTab");
              }}
            >
              {t("Game")}
            </div>
          </div>

          <div className="nav-item">
            <div
              className={
                "nav-link " +
                (activeTab === "teamsTab" ? "active" : "text-white bg-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("teamsTab");
              }}
            >
              {t("Teams")}
            </div>
          </div>

          <div className="nav-item">
            <div
              className={
                "nav-link " +
                (activeTab === "scoresTab" ? "active" : "text-white bg-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("scoresTab");
              }}
            >
              {t("Scores")}
            </div>
          </div>
        </ul>

        <div className="card shadow bg-primary">
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane p-5 ${
                  activeTab === "gameTab" ? "active" : ""
                }`}
                tabId="gameTab"
              >
                {game}
              </div>

              <div
                className={`tab-pane p-5 ${
                  activeTab === "teamsTab" ? "active" : ""
                }`}
                tabId="teamsTab"
              >
                {teams}
              </div>

              <div
                className={`tab-pane p-5 ${
                  activeTab === "scoresTab" ? "active" : ""
                }`}
                tabId="scoresTab"
              >
                {scores}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-danger text-white mt-4 w-100"
          onClick={(e) => {
            e.preventDefault();
            dispatch(reset());
            navigate(0);
          }}
        >
          {t("Create New Game")}
        </button>
      </div>
    </div>
  );
};

export default GameView;
