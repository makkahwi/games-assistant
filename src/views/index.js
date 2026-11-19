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
      title: "Mafia",
      desc: t(
        "This is the game of mafia, with killers, citizens, judges, nurses, and drowner."
      ),
      img: require("assets/img/card-bg/6.svg").default,
      url: "/mafia",
      rulesUrl: "/mafia-rules",
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
    <div className="game-library">
      <section className="library-hero"><div><span className="eyebrow">{t("GOOD COMPANY. GREAT GAMES.")}</span><h1>{t("Make room for") }<br /><em>{t("a little play.")}</em></h1><p>{t("Bring your people together. Pick a game, split into teams, and let the good times begin.")}</p><a className="btn btn-primary" href="#games">{t("Find your next game")} <span aria-hidden="true">↗</span></a></div><div className="hero-art" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="play-tile tile-back">✦</div><div className="play-tile tile-front"><i className="fas fa-dice-five" /></div><span className="spark">✳</span><span className="hero-caption">{t("Less scrolling. More playing.")}</span></div></section>
      <section id="games"><div className="section-heading"><div><span className="eyebrow">{t("THE LINEUP")}</span><h2>{t("Pick your kind of fun")}</h2></div><span className="game-count">{t("5 games. Endless good times.")}</span></div><div className="row g-4">
      {games.map(({ img, url, ...rest }, i) => (
        <div className="col-md-6 col-xl-4" key={i}>
          <WhiteCard bg={img} gameUrl={url} {...rest} />
        </div>
      ))}
    </div></section></div>
  );
};

export default Landing;
