import React from "react";
import { Col, Row } from "reactstrap";

import WhiteCard from "components/cards/WhiteCard";

const Landing = () => {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });

  const games = [
    {
      title: "PassWord",
      desc: "This is it",
      img: require("assets/img/card-bg/3.svg").default,
      url: "/password",
      rulesUrl: "password-rules",
    },
    {
      title: "ListWords",
      desc: "This is it",
      img: require("assets/img/card-bg/2.svg").default,
      url: "/list",
      rulesUrl: "list-rules",
    },
  ];

  return (
    <Row>
      {games.map(({ title, desc, img, url, rulesUrl }, i) => (
        <Col md="6" key={i}>
          <WhiteCard
            title={title}
            desc={desc}
            bg={img}
            gameUrl={url}
            rulesUrl={rulesUrl}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Landing;
