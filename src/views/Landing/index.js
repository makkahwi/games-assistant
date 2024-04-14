import React from "react";
import { Container } from "reactstrap";

import DemoFooter from "components/footers/DemoFooter.js";
import DemoNavbar from "components/navbars/DemoNavbar.js";

import CreateGame from "./Create";
import JoinGame from "./Join";

const Landing = () => {
  React.useEffect(() => {
    document.body.classList.add("register-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  return (
    <>
      <DemoNavbar type="transparent" />

      <div className="wrapper">
        <div className="page-header bg-default">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("assets/img/ill/register_bg.png") + ")",
            }}
          />

          <Container>
            <div className="form-container sign-in-container">
              <JoinGame />
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <CreateGame />
                </div>
              </div>
            </div>
          </Container>
        </div>
        <DemoFooter />
      </div>
    </>
  );
};

export default Landing;
