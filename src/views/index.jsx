import { useSearchParams } from "react-router-dom";
import FormatPicker from "components/Competition/FormatPicker";
import { gameGroups } from "../utils/competition";
import { useTranslation } from "react-i18next";

import WhiteCard from "components/cards/WhiteCard";

const Landing = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const format = ["group", "teams"].includes(params.get("format")) ? "group" : "2v2";
  const group = gameGroups.find(({ id }) => id === format);

  const games = [
    {
      title: "PassWord",
      desc: t(
        "This is the game of guessing 1 given word by 1-word hints passed by teammate"
      ),
      url: "/password",
      rulesUrl: "/password-rules",
    },
    {
      title: "Pictionary",
      desc: t(
        "This is the game of guessing 1 given word by drawing hints passed by teammate"
      ),
      url: "/pictionary",
      rulesUrl: "/pictionary-rules",
    },
    {
      title: "Mafia",
      desc: t(
        "This is the game of mafia, with killers, citizens, judges, nurses, and drowner."
      ),
      url: "/mafia",
      rulesUrl: "/mafia-rules",
    },
    {
      title: "ListWords",
      desc: t(
        "Time-limited challenge to list highest number of words follow given category"
      ),
      comingSoon: true,
      url: "/listwords",
      rulesUrl: "/listwords-rules",
    },
    {
      title: "CatchPhrase",
      desc: t("Time-limited challenge to give hints & guess given phrases"),
      comingSoon: true,
      url: "/catchphrase",
      rulesUrl: "/catchphrase-rules",
    },
  ];

  return (
    <div className="game-library">
      <div className="library-intro">
        <section className="library-welcome"><h1>{t("Your people.")}<br /><span>{t("Your break.")}</span></h1><p>{t("From the first coffee to the lunch-hour laugh. Bring your colleagues together for a little friendly competition.")}</p><div className="break-perks"><span><i className="fas fa-mug-hot" aria-hidden="true" /> {t("Office-friendly fun")}</span><span lang="ar" dir="rtl">بالعربي أو بالإنجليزي</span></div></section>
        <FormatPicker selected={format} onSelect={(value) => setParams({ format: value }, { preventScrollReset: true })} />
      </div>
      <section id="games" className="selected-games" aria-labelledby="games-heading">
        <div className="section-heading"><div><h2 id="games-heading">{t("What’s the break plan?")}</h2></div><span className="format-pill">{t(group.label)}</span></div>
        <p className="lineup-note">{t(format === "group" ? "Mafia is a group role game with no player limit." : "Two teams of two. Take turns between teams and swap roles within each team.")}</p>
        <div className="game-list">{games.filter(({ url }) => format === "group" ? url === "/mafia" : ["/password", "/pictionary"].includes(url)).map(({ url, ...rest }) => <div key={url}><WhiteCard gameUrl={url} format={format} {...rest} /></div>)}</div>
      </section>
      <section className="selected-games" aria-labelledby="upcoming-heading"><h2 id="upcoming-heading">{t("Coming Soon")}</h2><div className="game-list mt-4">{games.filter(({ comingSoon }) => comingSoon).map(({ url, ...rest }) => <WhiteCard key={url} gameUrl={url} {...rest} />)}</div></section>
    </div>
  );
};

export default Landing;
