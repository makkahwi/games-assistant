import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { randomSort } from "consts/functions";
import { phrasesBank } from "consts/CatchPhrase";

import { addScores } from "../../../redux/pictionary";

const words = randomSort(
  phrasesBank.reduce((final, { words }) => [...final, ...words], [])
);

const Game = () => {
  const members = useSelector((state) => state.pictionary.members);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = [members[0], members[1]];

  const getRandomInt = (min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const [word, setWord] = useState(getRandomInt());
  const [guesserTurn, setGuesserTurn] = useState(0);

  const changeWord = () => setWord(getRandomInt());
  const changeGuesser = () =>
    setGuesserTurn((current) => (current === 0 ? 1 : current === 1 ? 2 : 0));

  const startNew = () => {
    changeWord();
    changeGuesser();
  };

  return (
    <Fragment>
      <div className="row my-3">
        <div className="col-md-6 mt-4 mb-2">
          <h4 className="text-white">
            {t("Pictionary Phrase is")}
            <br />
            <span className="h1">"{words[word]}"</span>
          </h4>
        </div>

        <div className="col-md-6 mb-4">
          <button className="btn btn-light mt-3" onClick={() => changeWord()}>
            {t("Change Word")}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-white">
            {t("Hand Pictionary to")}
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

      <div className="btn-group">
        <button
          className="btn btn-success"
          type="button"
          onClick={() => {
            dispatch(
              addScores({ team: "Team A", point: 1, word: words[word] })
            );
            startNew();
          }}
        >
          {t("Team A Guessed")}
        </button>

        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            dispatch(
              addScores({ team: "Team B", point: 1, word: words[word] })
            );
            startNew();
          }}
        >
          {t("Team B Guessed")}
        </button>
      </div>
    </Fragment>
  );
};

export default Game;
