import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
    <Row className="text-center">
      <Col className="mx-auto text-white" lg="7">
        {header}
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
                {game}
              </TabPane>

              <TabPane tabId="teamsTab" role="tabpanel">
                {teams}
              </TabPane>

              <TabPane tabId="scoresTab" role="tabpanel">
                {scores}
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

export default GameView;
