import { Fragment, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { wordsBank } from "./WordBank";
import { useDispatch, useSelector } from "react-redux";
import { addScores } from "values";

const Game = () => {
  const members = useSelector((state) => state.game.members);
  const dispatch = useDispatch();

  const data = [members[0], members[1]];

  const words = wordsBank;

  const getRandomInt = (min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const [word, setWord] = useState(getRandomInt());
  const [startingTeamTurn, setStartingTeamTurn] = useState("Team 1");
  const [teamTurn, setTeamTurn] = useState("Team 1");
  const [guesserTurn, setGuesserTurn] = useState(0);
  const [point, setPoint] = useState(6);

  const changeWord = () => setWord(getRandomInt());
  const changeTeam = (current) => (current === "Team 1" ? "Team 2" : "Team 1");
  const changeGuesser = () =>
    setGuesserTurn((current) => (current == 0 ? 1 : 0));

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
          <h4 className="text-white">It's {teamTurn} turn</h4>
        </Col>

        <Col md="6">
          <Button onClick={() => setTeamTurn((current) => changeTeam(current))}>
            Switch Team
          </Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md="6">
          <h4 className="text-white">Word is {words[word]}</h4>
        </Col>

        <Col md="6">
          <Button onClick={() => changeWord()}>Change Word</Button>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <h4 className="text-white">
            Hand word to {data[0][guesserTurn]} & {data[1][guesserTurn]}
          </h4>
        </Col>

        <Col md="6">
          <Button onClick={() => changeGuesser()}>Switch Guessers</Button>
        </Col>
      </Row>

      <h5 className="text-white">Playing for {point} points</h5>

      <ButtonGroup>
        <Button
          color="success"
          type="button"
          onClick={() => {
            dispatch(
              addScores(
                teamTurn === "Team 1"
                  ? {
                      team1: point,
                      team2: 0,
                      game: { team: teamTurn, point, word: words[word] },
                    }
                  : {
                      team1: 0,
                      team2: point,
                      game: { team: teamTurn, point, word: words[word] },
                    }
              )
            );
            startNew();
          }}
        >
          Guessed Right
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
          Guessed Wrong
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default Game;
