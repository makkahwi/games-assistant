import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { reset } from "values";

import Game from "./Game";
import Header from "./Header";
import ScoresTable from "./Scores";
import TeamsTable from "./TeamsTable";
import { useTranslation } from "react-i18next";

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = React.useState("gameTab");

  useLayoutEffect(() => {
    document.body.classList.add("landing-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <Row className="text-center">
      <Col className="mx-auto text-white" lg="7">
        <Header />
      </Col>

      <Col className="mx-auto text-white" lg="7">
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                className={
                  "" + (activeTab === "gameTab" ? "active" : "text-primary")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("gameTab");
                }}
              >
                {t("Game")}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={
                  "" + (activeTab === "teamsTab" ? "active" : "text-primary")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("teamsTab");
                }}
              >
                {t("Teams")}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={
                  "" + (activeTab === "scoresTab" ? "active" : "text-primary")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("scoresTab");
                }}
              >
                {t("Scores")}
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <Card className="shadow bg-primary">
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="gameTab" role="tabpanel">
                <Game />
              </TabPane>

              <TabPane tabId="teamsTab" role="tabpanel">
                <TeamsTable />
              </TabPane>

              <TabPane tabId="scoresTab" role="tabpanel">
                <ScoresTable />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>

        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                className="bg-danger text-white"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(reset());
                  navigate(0);
                }}
              >
                {t("Create New Game")}
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Col>
    </Row>
  );
};

export default GamePage;
