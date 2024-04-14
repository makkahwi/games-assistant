import { Fragment, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { wordsBank } from "./WordBank";

const Game = () => {
  const words = wordsBank;

  const [word, setWord] = useState(91);
  const [role, setRole] = useState("Guesser");
  const [teamTurn, setTeamTurn] = useState("opponent team");
  const [point, setPoint] = useState(6);

  const getRandomInt = (min = 0, max = words.length) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  return (
    <Fragment>
      <h3
        className="text-white"
        onClick={() =>
          setTeamTurn((current) =>
            current === "team" ? "opponent team" : "team"
          )
        }
      >
        It's your {teamTurn} turn
      </h3>

      <h5
        className="text-white"
        onClick={() =>
          setRole((current) => (current === "Guesser" ? "Handler" : "Guesser"))
        }
      >
        Your now a {role}
      </h5>

      {role === "Handler" && (
        <h4 className="text-white my-3" onClick={() => setWord(getRandomInt())}>
          Word your handling is {words[word]}
        </h4>
      )}

      <h5
        className="text-white"
        onClick={() => setPoint((current) => current - 1)}
      >
        Your playing for {point} points
      </h5>

      <ButtonGroup>
        <Button color="success" type="button">
          Guessed Right
        </Button>

        <Button color="danger" type="button">
          Guessed Wrong
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default Game;
