import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { randomSort } from "consts/functions";
import { wordsBank } from "consts/WordBank";

import { addScores } from "../../../redux/password";

const words = randomSort(
  wordsBank.reduce((final, { words }) => [...final, ...words], [])
);

const Game = () => {
  const members = useSelector((state) => state.password.members);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = [members[0], members[1]];

  const getRandomInt = (min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const [word, setWord] = useState(getRandomInt());
  const [startingTeamTurn, setStartingTeamTurn] = useState("Team A");
  const [teamTurn, setTeamTurn] = useState("Team A");
  const [guesserTurn, setGuesserTurn] = useState(0);
  const [point, setPoint] = useState(6);

  const changeWord = () => setWord(getRandomInt());
  const changeTeam = (current) => (current === "Team A" ? "Team B" : "Team A");
  const changeGuesser = () =>
    setGuesserTurn((current) => (current === 0 ? 1 : current === 1 ? 2 : 0));

  const startNew = () => {
    setPoint(6);
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
        <div className="col-md-6">
          <h4 className="text-white">
            {t("PassWord is")} "{words[word]}"
          </h4>
        </div>

        <div className="col-md-6">
          <button className="btn btn-light" onClick={() => changeWord()}>
            {t("Change Word")}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white">
            {t("Hand PassWord to")} {data[0][guesserTurn > 0 ? 1 : 0]} &{" "}
            {data[1][guesserTurn > 0 ? 1 : 0]}
          </h4>
        </div>

        <div className="col-md-6">
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
          onClick={() => {
            dispatch(
              addScores(
                teamTurn === "Team A"
                  ? { team: teamTurn, point, word: words[word] }
                  : { team: teamTurn, point, word: words[word] }
              )
            );
            startNew();
          }}
        >
          {t("Guessed Right")}
        </button>

        <button
          className="btn btn-danger"
          type="button"
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
