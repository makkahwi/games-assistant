import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { randomSort } from "consts/functions";
import { wordsBank, newWordsBank } from "consts/WordBank";
import { isPasswordHistorySyncEnabled } from "services/passwordHistory";

import { addScores, loadHistory, syncHistory } from "../../../redux/password";

const wordBank = randomSort(
  [...wordsBank, ...newWordsBank].reduce(
    (final, { words }) => [...final, ...words],
    [],
  ),
);

const Game = () => {
  const members = useSelector((state) => state.password.members);
  const gameId = useSelector((state) => state.password.gameId);
  const history = useSelector((state) => state.password.history);
  const playedHistory = useSelector((state) => state.password.playedHistory);
  const historyStatus = useSelector((state) => state.password.historyStatus);
  const historyError = useSelector((state) => state.password.historyError);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = [members[0], members[1]];
  const words = useMemo(() => {
    const playedWords = new Set(
      [...playedHistory, ...history].map(({ word }) => word),
    );
    const availableWords = wordBank.filter((word) => !playedWords.has(word));

    return availableWords.length ? availableWords : wordBank;
  }, [history, playedHistory]);

  const getRandomInt = useCallback((min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }, [words.length]);

  const [word, setWord] = useState(getRandomInt());
  const [startingTeamTurn, setStartingTeamTurn] = useState("Team A");
  const [teamTurn, setTeamTurn] = useState("Team A");
  const [guesserTurn, setGuesserTurn] = useState(0);
  const [point, setPoint] = useState(6);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (gameId && isPasswordHistorySyncEnabled) {
      dispatch(loadHistory());
    }
  }, [dispatch, gameId]);

  useEffect(() => {
    if (word >= words.length) {
      setWord(getRandomInt(0, words.length));
    }
  }, [getRandomInt, word, words.length]);

  const changeWord = () => setWord(getRandomInt());
  const changeTeam = (current) => (current === "Team A" ? "Team B" : "Team A");
  const changeGuesser = () =>
    setGuesserTurn((current) => (current === 0 ? 1 : current === 1 ? 2 : 0));

  const startNew = () => {
    setPoint(6);
    setHide(true);
    changeWord();
    const newTeam = changeTeam(startingTeamTurn);
    setStartingTeamTurn(newTeam);
    changeGuesser();
    setTeamTurn(newTeam);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white">
            {t("It's team turn", { team: t(teamTurn) })}
          </h4>
        </div>

        <div className="col-md-6">
          <button
            className="btn btn-light"
            onClick={() => setTeamTurn((current) => changeTeam(current))}
          >
            {t("Switch Team")}
          </button>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-md-6 mt-4 mb-2">
          <h4 className="text-white">
            {t("PassWord is")}
            <br />
            {hide ? (
              <button
                className="btn btn-danger my-2"
                onClick={() => setHide(false)}
              >
                {t("Show")}
              </button>
            ) : (
              <span className="h1">"{words[word]}"</span>
            )}
          </h4>
        </div>

        <div className="col-md-6 mb-4">
          <button className="btn btn-light mt-3" onClick={() => changeWord()}>
            {t("Change Word")}
          </button>
        </div>

        {historyStatus === "loading" && (
          <div className="col-12">
            <small className="text-white">{t("Loading")}</small>
          </div>
        )}

        {historyError && (
          <div className="col-12">
            <small className="text-warning">{historyError}</small>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white">
            {t("Hand PassWord to")}
            <br />
            <span className="text-decoration-underline">
              {data[0][guesserTurn > 0 ? 1 : 0]}
            </span>{" "}
            &{" "}
            <span className="text-decoration-underline">
              {data[1][guesserTurn > 0 ? 1 : 0]}
            </span>
          </h4>
        </div>

        <div className="col-md-6 my-3">
          <button className="btn btn-light" onClick={() => changeGuesser()}>
            {t("Switch Clue Givers")}
          </button>
        </div>
      </div>

      <h5 className="text-white">{t("Playing for x points", { point })}</h5>

      <div className="btn-group">
        <button
          className="btn btn-success"
          type="button"
          disabled={hide}
          onClick={() => {
            dispatch(addScores({ team: teamTurn, point, word: words[word] }));
            dispatch(syncHistory());
            startNew();
          }}
        >
          {t("Guessed Right")}
        </button>

        <button
          className="btn btn-danger"
          type="button"
          disabled={hide}
          onClick={() => {
            if (point > 1) {
              setPoint((current) => current - 1);
              setTeamTurn((current) => changeTeam(current));
            } else {
              startNew();
            }
          }}
        >
          {t("Guessed Wrong")}
        </button>
      </div>
    </Fragment>
  );
};

export default Game;
