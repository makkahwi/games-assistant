import { useSearchParams } from "react-router-dom";
import FormatPicker from "components/Competition/FormatPicker";
import { isFormat, formatLabel } from "../utils/competition";
import cardBackground0 from "assets/img/card-bg/3.svg";
import cardBackground1 from "assets/img/card-bg/5.svg";
import cardBackground2 from "assets/img/card-bg/6.svg";
import cardBackground3 from "assets/img/card-bg/2.svg";
import cardBackground4 from "assets/img/card-bg/8.svg";
import { useTranslation } from "react-i18next";

import WhiteCard from "components/cards/WhiteCard";

const Landing = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const format = params.get("format");
  const selected = isFormat(format);

  const games = [
    {
      title: "PassWord",
      desc: t(
        "This is the game of guessing 1 given word by 1-word hints passed by teammate"
      ),
      img: cardBackground0,
      url: "/password",
      rulesUrl: "/password-rules",
    },
    {
      title: "Pictionary",
      desc: t(
        "This is the game of guessing 1 given word by drawing hints passed by teammate"
      ),
      img: cardBackground1,
      url: "/pictionary",
      rulesUrl: "/pictionary-rules",
    },
    {
      title: "Mafia",
      desc: t(
        "This is the game of mafia, with killers, citizens, judges, nurses, and drowner."
      ),
      img: cardBackground2,
      url: "/mafia",
      rulesUrl: "/mafia-rules",
    },
    {
      title: "ListWords",
      desc: t(
        "Time-limited challenge to list highest number of words follow given category"
      ),
      comingSoon: true,
      img: cardBackground3,
      url: "/listwords",
      rulesUrl: "/listwords-rules",
    },
    {
      title: "CatchPhrase",
      desc: t("Time-limited challenge to give hints & guess given phrases"),
      comingSoon: true,
      img: cardBackground4,
      url: "/catchphrase",
      rulesUrl: "/catchphrase-rules",
    },
  ];

  return (
    <div className="game-library">
      <section className="library-hero break-hero">
        <div><span className="eyebrow">{t("MADE FOR JORDAN’S WORKDAY")}</span><h1>{t("Close the laptop.")}<br /><em>{t("Open the fun.")}</em></h1><p>{t("From the first coffee to the lunch-hour laugh. Bring your colleagues together for a little friendly competition.")}</p><a className="btn btn-primary" href="#formats">{t("Let’s take a break")} <span aria-hidden="true">↗</span></a><div className="break-perks"><span><i className="fas fa-mug-hot" aria-hidden="true" /> {t("Office-friendly fun")}</span><span>{t("بالعربي أو بالإنجليزي")}</span></div></div>
        <div className="hero-art break-art" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="play-tile tile-back">☕</div><div className="play-tile tile-front"><i className="fas fa-dice-five" /></div><span className="spark">✳</span><span className="hero-caption">{t("Same colleagues. New inside jokes.")}</span></div>
      </section>
      <FormatPicker selected={format} onSelect={(value) => setParams({ format: value }, { preventScrollReset: true })} />
      {selected ? <section id="games" className="selected-games" aria-labelledby="games-heading">
        <div className="section-heading"><div><span className="eyebrow">{t("STEP 02 · YOUR GAME")}</span><h2 id="games-heading">{t("What’s the break plan?")}</h2></div><span className="format-pill">{t(formatLabel(format))}</span></div>
        <p className="lineup-note">{t(format === "1v1" ? "Two players, one neutral host. Let the friendly rivalry begin." : "Pick a game and bring your crew. Your next meeting can wait until break is over.")}</p>
        <div className="row g-4">{games.map(({ img, url, ...rest }) => <div className="col-md-6 col-xl-4" key={url}><WhiteCard bg={img} gameUrl={url} format={format} groupOnly={url === "/mafia"} {...rest} /></div>)}</div>
      </section> : <p className="format-prompt"><i className="fas fa-arrow-up" aria-hidden="true" /> {t("Your break starts with your people. Choose a format above to see the games.")}</p>}
    </div>
  );
};

export default Landing;
