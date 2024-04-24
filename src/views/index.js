import React from "react";
import { Col, Row } from "reactstrap";

import WhiteCard from "components/cards/WhiteCard";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation();

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
      desc: t(
        "This is the game of guessing 1 given word by 1-word hints passed by teammate"
      ),
      img: require("assets/img/card-bg/3.svg").default,
      url: "/password",
      rulesUrl: "/password-rules",
    },
    {
      title: "ListWords",
      desc: t(
        "Time-limited challenge to list highest number of words follow given category"
      ),
      comingSoon: true,
      img: require("assets/img/card-bg/2.svg").default,
      url: "/listwords",
      rulesUrl: "/listwords-rules",
    },
    {
      title: "CatchPhrase",
      desc: t("Time-limited challenge to give hints & guess given phrases"),
      comingSoon: true,
      img: require("assets/img/card-bg/8.svg").default,
      url: "/catchphrase",
      rulesUrl: "/catchphrase-rules",
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
