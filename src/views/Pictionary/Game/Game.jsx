import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLocalizedWords, randomSort } from "consts/functions";
import { phrasesBank } from "consts/CatchPhrase";
import { pairedTurn, roundRoles } from "../../../utils/competition";
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
  const pairs = format === "2v2";
  const turn = pairedTurn(round);
  const roles = members.map((team) => roundRoles(team, pairs ? turn.roleRound : round, master));
  const nextRound = () => { setRound((value) => value + 1); nextWord(); };
  const nextWord = () => { setWordIndex((index) => index + 1); setPhase("hidden"); };
  const score = (index) => {
    dispatch(addScores({ team: index === 0 ? "Team A" : "Team B", point: 1, word: words[wordIndex % words.length], language }));
    nextRound();
  };
  return <div className="pictionary-play">
    <p className="round-label" aria-live="polite">{t("Round")} {round + 1}</p>
    <p className="solo-notice">{t(solo ? "The host draws for both players. First correct guess wins one point." : (pairs ? "Only the active drawing player sees the phrase. Everyone else looks away." : "Only the drawing players see the phrase. Everyone else looks away."))}</p>
    {pairs ? <div aria-live="polite"><h2>{t("It's team turn", { team: t(turn.teamIndex === 0 ? "Team A" : "Team B") })}</h2><p>{t("Drawing player")}: <strong>{roles[turn.teamIndex].clueGiver}</strong></p><p>{t("Guesser")}: <strong>{roles[turn.teamIndex].guessers.join(", ")}</strong></p></div> : <h3>{solo ? master : roles.map(({ clueGiver }) => clueGiver).join(" & ")}</h3>}
    {phase === "hidden" && <button className="btn btn-primary my-3" disabled={!words.length} onClick={() => setPhase("revealed")}>{t("Show word")}</button>}
    {phase === "revealed" && <div className="word-stage my-4"><h2 dir="auto">{words[wordIndex % words.length]}</h2><button className="btn btn-primary mt-3" onClick={() => setPhase("playing")}>{t("Hide phrase & start drawing")}</button></div>}
    {phase === "playing" && <p className="status-message" role="status">{t("Phrase hidden. Start drawing!")}</p>}
    {!words.length && <p className="status-message" role="status">{t("No words available. Please try again.")}</p>}
    <div className="btn-group my-3">{members.map((team, index) => <button key={index} className={`btn btn-${index === 0 ? "success" : "danger"}`} disabled={phase !== "playing" || !words.length || (pairs && index !== turn.teamIndex)} onClick={() => score(index)}>{t("Player guessed", { player: solo ? team[0] : t(index === 0 ? "Team A" : "Team B") })}</button>)}</div>
    {pairs && <button className="btn btn-light my-3" onClick={nextRound}>{t("Pass turn")}</button>}
    <div className="btn-group d-flex justify-content-center"><button className="btn btn-light" onClick={nextWord} disabled={!words.length}>{t("Change Word")}</button>{!solo && <button className="btn btn-light" onClick={() => { setRound((value) => value + (pairs ? 2 : 1)); setPhase("hidden"); }}>{t("Switch Clue Givers")}</button>}</div>
  </div>;
}
