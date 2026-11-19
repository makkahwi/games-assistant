import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLocalizedWords, randomSort } from "consts/functions";
import { phrasesBank } from "consts/CatchPhrase";
import { roundRoles } from "../../../utils/competition";
import { addScores } from "../../../redux/pictionary";

export default function Game() {
  const { members, master, format } = useSelector((state) => state.pictionary);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || "en";
  const words = useMemo(() => randomSort(getLocalizedWords(phrasesBank, language)), [language]);
  const [round, setRound] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("hidden");
  const solo = format === "1v1";
  const roles = members.map((team) => roundRoles(team, round, master));
  const nextWord = () => { setWordIndex((index) => index + 1); setPhase("hidden"); };
  const score = (index) => {
    dispatch(addScores({ team: index === 0 ? "Team A" : "Team B", point: 1, word: words[wordIndex % words.length], language }));
    setRound((value) => value + 1);
    nextWord();
  };
  return <div>
    <p>{t("Round")} {round + 1}</p>
    <p className="solo-notice">{t(solo ? "The host draws for both players. First correct guess wins one point." : "Only the drawing players see the phrase. Everyone else looks away.")}</p>
    <h3>{solo ? master : roles.map(({ clueGiver }) => clueGiver).join(" & ")}</h3>
    {phase === "hidden" && <button className="btn btn-primary my-3" disabled={!words.length} onClick={() => setPhase("revealed")}>{t("Show word")}</button>}
    {phase === "revealed" && <div className="my-4"><h2 dir="auto">{words[wordIndex % words.length]}</h2><button className="btn btn-primary mt-3" onClick={() => setPhase("playing")}>{t("Hide phrase & start drawing")}</button></div>}
    {phase === "playing" && <p className="my-4">{t("Phrase hidden. Start drawing!")}</p>}
    <div className="btn-group my-3">{members.map((team, index) => <button key={index} className={`btn btn-${index === 0 ? "success" : "danger"}`} disabled={phase !== "playing" || !words.length} onClick={() => score(index)}>{t("Player guessed", { player: solo ? team[0] : t(index === 0 ? "Team A" : "Team B") })}</button>)}</div>
    <div className="btn-group d-flex justify-content-center"><button className="btn btn-light" onClick={nextWord} disabled={!words.length}>{t("Change Word")}</button>{!solo && <button className="btn btn-light" onClick={() => { setRound((value) => value + 1); setPhase("hidden"); }}>{t("Switch Clue Givers")}</button>}</div>
  </div>;
}
