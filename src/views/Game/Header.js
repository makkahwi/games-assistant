import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";

import TeamsTable from "./Table";

const Header = () => {
  return (
    <>
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
                  <h1 className="text-white">Welcome Suhaib</h1>
                  <h4 className="text-white">Your Team is Team 1</h4>

                  <h6 className="text-white">Game Code: thisIsGameCode</h6>

                  <ButtonGroup>
                    <Button color="primary" type="button">
                      Copy Game Code
                    </Button>

                    <Button color="success" type="button">
                      Share On Wasap
                    </Button>
                  </ButtonGroup>
                </Col>

                <Col className="mx-auto" lg="7">
                  <TeamsTable />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
