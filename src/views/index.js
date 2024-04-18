import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const Landing = () => {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });

  return (
    <Row>
      <Col md="6">
        <Link to="/password">Password</Link>
      </Col>

      <Col md="6">
        <Link to="/list">List</Link>
      </Col>
    </Row>
  );
};

export default Landing;
