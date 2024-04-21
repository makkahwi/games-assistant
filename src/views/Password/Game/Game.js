import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Row } from "reactstrap";

import { addScores } from "../../../redux/password";
import { wordsBank } from "./WordBank";

const Game = () => {
  const members = useSelector((state) => state.password.members);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = [members[0], members[1]];

  const words = wordsBank.reduce(
    (final, { words }) => [...final, ...words],
    []
  );

  const getRandomInt = (min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const [word, setWord] = useState(getRandomInt());
  const [startingTeamTurn, setStartingTeamTurn] = useState(t("Team A"));
  const [teamTurn, setTeamTurn] = useState(t("Team A"));
  const [guesserTurn, setGuesserTurn] = useState(0);
  const [point, setPoint] = useState(6);

  const changeWord = () => setWord(getRandomInt());
  const changeTeam = (current) =>
    current === t("Team A") ? t("Team B") : t("Team A");
  const changeGuesser = () =>
    setGuesserTurn((current) => (current == 0 ? 1 : current == 1 ? 2 : 0));

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
      <Row>
        <Col md="6">
          <h4 className="text-white">
            {t("It's team turn", { team: teamTurn })}
          </h4>
        </Col>

        <Col md="6">
          <Button onClick={() => setTeamTurn((current) => changeTeam(current))}>
            {t("Switch Team")}
          </Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md="6">
          <h4 className="text-white">
            {t("PassWord is")} "{words[word]}"
          </h4>
        </Col>

        <Col md="6">
          <Button onClick={() => changeWord()}>{t("Change Word")}</Button>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <h4 className="text-white">
            {t("Hand PassWord to")} {data[0][guesserTurn > 0 ? 1 : 0]} &{" "}
            {data[1][guesserTurn > 0 ? 1 : 0]}
          </h4>
        </Col>

        <Col md="6">
          <Button onClick={() => changeGuesser()}>
            {t("Switch Clue Givers")}
          </Button>
        </Col>
      </Row>

      <h5 className="text-white">{t("Playing for x points", { point })}</h5>

      <ButtonGroup>
        <Button
          color="success"
          type="button"
          onClick={() => {
            dispatch(
              addScores(
                teamTurn === t("Team A")
                  ? { team: teamTurn, point, word: words[word] }
                  : { team: teamTurn, point, word: words[word] }
              )
            );
            startNew();
          }}
        >
          {t("Guessed Right")}
        </Button>

        <Button
          color="danger"
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
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default Game;
