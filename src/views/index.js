import { useTranslation } from "react-i18next";

import WhiteCard from "components/cards/WhiteCard";

const Landing = () => {
  const { t } = useTranslation();

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
      title: "Pictionary",
      desc: t(
        "This is the game of guessing 1 given word by drawing hints passed by teammate"
      ),
      img: require("assets/img/card-bg/5.svg").default,
      url: "/pictionary",
      rulesUrl: "/pictionary-rules",
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
    <div className="row g-5">
      {games.map(({ img, url, ...rest }, i) => (
        <div className="col-md-6" key={i}>
          <WhiteCard bg={img} gameUrl={url} {...rest} />
        </div>
      ))}
    </div>
  );
};

export default Landing;
