import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { randomSort } from "consts/functions";
import { wordsBank } from "consts/WordBank";

import { addScores } from "../../../redux/listwords";

const wordCategories = randomSort(
  wordsBank
    .filter(({ words }) => words.length > 5)
    .map(({ category }) => category)
).slice(0, 7);

const Game = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.listwords.members);
  const history = useSelector((state) => state.listwords.history);
  const { t } = useTranslation();

  const [currentCategory, setCurrentCategory] = useState(null);

  const [teamClocks, setTeamClocks] = useState([20000, 20000]);
  const [startTurn, setStartTurn] = useState(members[0]);
  const [listingTurn, setListingTurn] = useState(members[0]);
  const [challenger, setChallenger] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [flipButtons, setFlipButtons] = useState([false, false]);

  const changeStartTurn = () =>
    setStartTurn((current) =>
      current === members[0] ? members[1] : members[0]
    );

  const changeListingTurn = () =>
    setListingTurn((current) =>
      current === members[0] ? members[1] : members[0]
    );

  const CurrentStatus = ({ ownTurn }) =>
    teamClocks.filter((v) => v <= 0).length
      ? teamClocks
          .map((v) =>
            v <= 0 ? { time: v, lost: true } : { time: v, lost: false }
          )
          .map(({ lost }, i) =>
            currentCategory ? (
              <h2
                className={
                  (lost ? "bg-danger" : "bg-success") + " text-white  py-2 my-3"
                }
                key={i}
              >
                {members[i] + " " + (lost ? t("lost") : t("won"))}
              </h2>
            ) : (
              ""
            )
          )
      : ownTurn && (
          <h2 className="bg-danger text-white py-2 my-3">
            {t("It's Your Turn")}
          </h2>
        );

  const CategoryChoose = () => (
    <Fragment>
      <h6>{t("Choose Category Plz")}</h6>

      <div className="row">
        {wordCategories.map((cat, i) => {
          const playedCat = history.findIndex(({ word }) => word === cat) >= 0;

          return (
            <div className="col my-2" key={i}>
              <button
                disabled={playedCat}
                onClick={() => setCurrentCategory(i)}
                className={`btn btn-${
                  playedCat ? "secondary" : i % 2 === 0 ? "warning" : "info"
                } w-100`}
              >
                {cat}
              </button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );

  const startNewGame = () => {
    setChallenger(null);
    changeStartTurn();
    setCurrentCategory(null);
    setTeamClocks([20000, 20000]);
  };

  const addScoreToTeam1 = () => {
    dispatch(
      addScores({
        team: members[0],
        point: 1,
        word: wordCategories[currentCategory],
      })
    );
  };

  const addScoreToTeam2 = () => {
    dispatch(
      addScores({
        team: members[1],
        point: 1,
        word: wordCategories[currentCategory],
      })
    );
  };

  const recordScore = (firstTeam) => {
    firstTeam ? addScoreToTeam1() : addScoreToTeam2();

    startNewGame();
  };

  const doButtonsFlip = (player) => {
    let tempFlipButtons = [...flipButtons];
    if (player === 0) {
      tempFlipButtons = [!tempFlipButtons[0], tempFlipButtons[1]];
    } else {
      tempFlipButtons = [tempFlipButtons[0], !tempFlipButtons[1]];
    }
    setFlipButtons(tempFlipButtons);
  };

  useEffect(() => {
    if (
      teamClocks.every((value, index) => value <= [20000, 19999][index]) &&
      teamClocks.every((value) => value > 0)
    ) {
      const interval = setInterval(() => {
        if (listingTurn === members[0]) {
          setTeamClocks((current) => [current[0] - 2, current[1]]);
        } else {
          setTeamClocks((current) => [current[0], current[1] - 2]);
        }
      }, 1);

      return () => clearInterval(interval);
    }
  }, [teamClocks]);

  const switchTurn = () => {
    if (teamClocks.every((value, index) => value === [20000, 20000][index])) {
      setTeamClocks([20000, 19999]);
    }

    changeListingTurn();
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body text-right p-1">
          <button
            className="btn btn-warning p-1 float-start"
            onClick={() => setRotate((current) => !current)}
          >
            {t("Rotate")}
          </button>
        </div>

        {challenger ? (
          <div className="card-body text-primary">
            <h6>{challenger}</h6>

            <div className="btn-group">
              <button
                onClick={() =>
                  recordScore(
                    (challenger === members[0] && true) ||
                      (challenger === members[1] && false)
                  )
                }
                className="btn btn-success"
              >
                {t("Challenger is Right")}
              </button>

              <button
                onClick={() =>
                  recordScore(
                    (challenger === members[0] && true) ||
                      (challenger === members[1] && false)
                  )
                }
                className="btn btn-danger"
              >
                {t("Challenger is Wrong")}
              </button>
            </div>
          </div>
        ) : (
          members.map((member, i) => {
            const gameEnded = teamClocks.filter((v) => v <= 0).length > 0;
            const disableButtons = gameEnded || listingTurn !== member;

            return (
              <Fragment key={i}>
                <div
                  className="card-body text-primary"
                  style={i === 0 && rotate ? { rotate: "180deg" } : {}}
                >
                  <h6>{member}</h6>

                  <CurrentStatus ownTurn={listingTurn === member} />

                  {currentCategory === null ? (
                    startTurn === member && <CategoryChoose />
                  ) : (
                    <Fragment>
                      <h1>{teamClocks[i] / 1000}</h1>

                      <h4>
                        {t("Category is")} "{wordCategories[currentCategory]}"
                      </h4>

                      <div className="btn-group">
                        <button
                          onClick={() => switchTurn()}
                          disabled={disableButtons}
                          className={
                            "btn btn-success " +
                            (flipButtons[i] ? "order-3" : "order-1")
                          }
                        >
                          {t("Stop Clock")}
                        </button>

                        {teamClocks.filter((v) => v >= 19999).length === 2 &&
                          startTurn === member && (
                            <button
                              onClick={() => setCurrentCategory(null)}
                              className="btn btn-warning order-2"
                            >
                              {t("Change Category")}
                            </button>
                          )}

                        <button
                          onClick={() => setChallenger(member)}
                          disabled={disableButtons}
                          className={
                            "btn btn-danger " +
                            (flipButtons[i] ? "order-1" : "order-3")
                          }
                        >
                          {t("Challenge Pervious Answer")}
                        </button>
                      </div>

                      <div>
                        <button
                          className="btn btn-warning p-1 mt-2"
                          onClick={() => doButtonsFlip(i)}
                        >
                          {t("Flip Buttons")}
                        </button>
                      </div>

                      {gameEnded ? (
                        <button
                          className="btn btn-primary w-100 mt-4"
                          onClick={() => recordScore(teamClocks[0] > 0)}
                        >
                          {t("Save Round Point")}
                        </button>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  )}
                </div>

                {i === 0 && <hr className="bg-dark w-100" />}
              </Fragment>
            );
          })
        )}
      </div>
    </Fragment>
  );
};

export default Game;
