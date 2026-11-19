import { roundRoles } from "../../../utils/competition";
import { useRef, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { randomSort } from "consts/functions";
import { isPasswordHistorySyncEnabled } from "services/passwordHistory";
import {
  loadPasswordWordBank,
} from "services/passwordWordBank";

import { addScores, loadHistory, syncHistory } from "../../../redux/password";

const Game = ({ onExit }) => {
  const master = useSelector((state) => state.password.master);
  const members = useSelector((state) => state.password.members);
  const format = useSelector((state) => state.password.format);
  const solo = format === "1v1";
  const gameId = useSelector((state) => state.password.gameId);
  const history = useSelector((state) => state.password.history);
  const playedHistory = useSelector((state) => state.password.playedHistory);
  const historyStatus = useSelector((state) => state.password.historyStatus);
  const historyError = useSelector((state) => state.password.historyError);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || "en";

  const [wordBank, setWordBank] = useState([]);
  const [wordBankStatus, setWordBankStatus] = useState("idle");
  const [wordBankError, setWordBankError] = useState("");
  const words = useMemo(() => {
    const playedWords = new Set(
      [...playedHistory, ...history].map(({ word }) => word),
    );
    const availableWords = wordBank.filter((word) => !playedWords.has(word));

    return availableWords.length ? availableWords : wordBank;
  }, [history, playedHistory, wordBank]);

  const getRandomInt = useCallback((min = 0, max = words.length) => {
    if (max <= min) {
      return 0;
    }

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }, [words.length]);

  const [word, setWord] = useState(0);
  const [roundWord, setRoundWord] = useState("");
  const [startingTeamTurn, setStartingTeamTurn] = useState("Team A");
  const [teamTurn, setTeamTurn] = useState("Team A");
  const [guesserTurn, setGuesserTurn] = useState(0);
  const [point, setPoint] = useState(6);
  const [phase, setPhase] = useState("hidden");
  const [wakeStatus, setWakeStatus] = useState("pending");
  const tapGuard = useRef(0);

  useEffect(() => {
    let lock;
    let disposed = false;
    let requesting = false;
    const requestLock = async () => {
      if (!navigator.wakeLock) { setWakeStatus("unavailable"); return; }
      if (document.visibilityState !== "visible" || requesting) return;
      try {
        if (lock && !lock.released) return;
        requesting = true;
        const acquired = await navigator.wakeLock.request("screen");
        if (disposed) { await acquired.release(); return; }
        lock = acquired;
        setWakeStatus("active");
        lock.addEventListener("release", () => { if (!disposed) setWakeStatus("inactive"); });
      } catch { if (!disposed) setWakeStatus("inactive"); }
      finally { requesting = false; }
    };
    requestLock();
    document.addEventListener("visibilitychange", requestLock);
    // A tap also retries browsers that require user interaction.
    document.addEventListener("pointerdown", requestLock);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", requestLock);
      document.removeEventListener("pointerdown", requestLock);
      if (lock && !lock.released) lock.release().catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (gameId && isPasswordHistorySyncEnabled) {
      dispatch(loadHistory());
    }
  }, [dispatch, gameId]);

  useEffect(() => {
    let ignore = false;

    const loadWords = async () => {
      setWordBankStatus("loading");
      setWordBankError("");

      try {
        const remoteWordBank = await loadPasswordWordBank(language);

        if (!ignore) {
          setWordBank(randomSort(remoteWordBank));
          setWordBankStatus("loaded");
        }
      } catch (error) {
        if (!ignore) {
          setWordBankError(error.message || "Word bank sync failed");
          setWordBankStatus("error");
        }
      }
    };

    setPhase("hidden");
    setWord(0);
    setWordBank([]);
    loadWords();

    return () => {
      ignore = true;
    };
  }, [language]);

  useEffect(() => {
    if (word >= words.length) {
      setWord(getRandomInt(0, words.length));
    }
  }, [getRandomInt, word, words.length]);

  const changeWord = () => { setPhase("hidden"); setWord(getRandomInt()); };
  const changeTeam = (current) => (current === "Team A" ? "Team B" : "Team A");
  const changeGuesser = () =>
    setGuesserTurn((current) => current + 1);

  const startNew = () => {
    setPoint(6);
    setPhase("hidden");
    changeWord();
    const newTeam = changeTeam(startingTeamTurn);
    setStartingTeamTurn(newTeam);
    changeGuesser();
    setTeamTurn(newTeam);
  };

  const answer = (correct, answeringTeam) => {
    if (answeringTeam !== teamTurn || phase !== "playing" || !words.length || Date.now() - tapGuard.current < 650) return;
    tapGuard.current = Date.now();
    if (correct) {
      dispatch(addScores({ team: teamTurn, point, word: roundWord, language }));
      if (isPasswordHistorySyncEnabled) dispatch(syncHistory());
      startNew();
    } else if (point > 1) {
      setPoint((current) => current - 1);
      setTeamTurn((current) => changeTeam(current));
    } else startNew();
  };

  const teamLabel = (team) => solo ? members[team === "Team A" ? 0 : 1][0] : t(team);

  const renderWordArea = () => (
            <div className="table-word-area">
              {phase === "hidden" && <>
                <p>{t("Clue givers only. Tap to view the word.")}</p>
                <small>{t("Guessers, look away until the word is hidden.")}</small>
                <button className="table-reveal" disabled={!words.length} onClick={() => { setRoundWord(words[word]); setPhase("revealed"); }}>{t("Show word")}</button>
              </>}
              {phase === "revealed" && <>
                <strong className="table-secret" dir="auto">{roundWord}</strong>
                <button className="table-reveal" onClick={() => { tapGuard.current = Date.now(); setPhase("playing"); }}>{t("Hide word & start guessing")}</button>
              </>}
              {phase === "playing" && <div className="table-hidden"><i className="fas fa-lock" aria-hidden="true" /> {t("Word hidden. Give your clues!")}</div>}
              {wordBankStatus === "loading" && <small role="status">{t("Loading")}</small>}
              {wordBankStatus === "loaded" && !words.length && <small role="status">{t("No words available. Please try again.")}</small>}
            </div>
  );

  return (
    <section className="password-table" aria-label={t("PassWord")}>
      <div className="table-tools">
        <button onClick={onExit}>{t("Game menu")}</button>
        <span role="status">{t(wakeStatus === "active" ? "Screen stays on" : wakeStatus === "pending" ? "Keeping screen on…" : "Screen lock unavailable — check display settings")}</span>
      </div>
      <div className="desktop-round-info" aria-live="polite">
        <span>{t("Round")} {history.length + 1} · {t("Game Master Name")}: {master}</span>
        <h1>{t("It's team turn", { team: teamLabel(teamTurn) })}</h1>
        <strong>{t("Playing for x points", { point })}</strong>
      </div>
      <div className="table-halves">
        <div className="desktop-word">{renderWordArea()}</div>
        {["Team B", "Team A"].map((team, index) => (
          <section key={team} className={`table-team ${index === 0 ? "table-team-opposite" : ""} ${teamTurn === team ? "team-active" : ""}`} aria-label={teamLabel(team)}>
            <header><strong>{teamLabel(team)}</strong><span>{t(teamTurn === team ? "Your turn" : "Other team's turn")} · {t("Playing for x points", { point })}</span></header>
            <div className="table-player-info">
              <span>{t("Guesser")}: <strong>{roundRoles(members[team === "Team A" ? 0 : 1], guesserTurn, master).guessers.join(", ")}</strong></span>
              <span>{t("Clue giver")}: <strong>{roundRoles(members[team === "Team A" ? 0 : 1], guesserTurn, master).clueGiver}</strong></span>
              <small>{t("Score")}: {history.filter((score) => score.team === team).reduce((total, score) => total + score.point, 0)}</small>
            </div>
            {renderWordArea()}
            <div className="table-answers">
              <button className="answer-wrong" disabled={teamTurn !== team || phase !== "playing" || !words.length} onClick={() => answer(false, team)}><span aria-hidden="true">✕</span>{t("Guessed Wrong")}</button>
              <button className="answer-right" disabled={teamTurn !== team || phase !== "playing" || !words.length} onClick={() => answer(true, team)}><span aria-hidden="true">✓</span>{t("Guessed Right")}</button>
            </div>
          </section>
        ))}
      </div>
      <div className="table-bottom-tools">
        <button onClick={changeWord} disabled={!words.length}>{t("Change Word")}</button>
        {!solo && <button onClick={() => { changeGuesser(); setPhase("hidden"); }}>{t("Switch Clue Givers")}</button>}
        <button onClick={() => setTeamTurn((current) => changeTeam(current))}>{t("Switch Team")}</button>
      </div>
      {(historyError || wordBankError || historyStatus === "loading") && <small className="table-sync" role="status">{t(historyError || wordBankError ? "Sync unavailable. Continue playing locally." : "Loading")}</small>}
    </section>
  );
};

export default Game;
