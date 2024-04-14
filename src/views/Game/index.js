import React, { useLayoutEffect } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";

import Game from "./Game";
import Header from "./Header";
import TeamsTable from "./TeamsTable";

const GamePage = () => {
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
    <div className="wrapper">
      <header className="header-4 skew-separator">
        <div className="header-wrapper">
          <div className="page-header header-video">
            <div className="overlay" />

            <video
              autoPlay="autoPlay"
              loop="loop"
              muted="muted"
              playsInline="playsInline"
            >
              <source
                src={require("assets/videos/Lights - 26607.mp4")}
                type="video/mp4"
              />
            </video>

            <Container className="text-center">
              <Row>
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
                            "mb-sm-3 mb-md-0 " +
                            (activeTab === "gameTab"
                              ? "active"
                              : "text-primary")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("gameTab");
                          }}
                        >
                          Game
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={
                            "mb-sm-3 mb-md-0 " +
                            (activeTab === "teamsTab"
                              ? "active"
                              : "text-primary")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("teamsTab");
                          }}
                        >
                          Teams
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <Card className="shadow bg-primary">
                    <CardBody>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="gameTab" role="tabpanel">
                          <Game/>
                        </TabPane>

                        <TabPane tabId="teamsTab" role="tabpanel">
                          <TeamsTable />
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </header>
    </div>
  );
};

export default GamePage;
