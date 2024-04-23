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
      desc: "This is the game of guessing 1 given word by 1-word hints passed by teammate.",
      img: require("assets/img/card-bg/3.svg").default,
      url: "/password",
      rulesUrl: "/password-rules",
    },
    {
      title: "ListWords",
      desc: "Time-limited challenge to list highest number of words follow given category.",
      comingSoon: true,
      img: require("assets/img/card-bg/2.svg").default,
      url: "/list-words",
      rulesUrl: "/list-words-rules",
    },
    {
      title: "CatchPhrase",
      desc: "Time-limited challenge to give hints & guess given phrases.",
      comingSoon: true,
      img: require("assets/img/card-bg/8.svg").default,
      url: "/catch-phrase",
      rulesUrl: "/catch-phrase-rules",
    },
  ];

  return (
    <Row>
      {games.map(({ img, url, ...rest }, i) => (
        <Col md="6" key={i}>
          <WhiteCard bg={img} gameUrl={url} {...rest} />
        </Col>
      ))}
    </Row>
  );
};

export default Landing;
