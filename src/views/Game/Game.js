import { Fragment } from "react";
import { Button, ButtonGroup } from "reactstrap";

const Game = () => {
  return (
    <Fragment>
      <h5 className="text-white">Your now a Guesser / Handler</h5>

      <h4 className="text-white my-3">Word your handling is "Car"</h4>

      <h5 className="text-white">Your playing for 6 points</h5>

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
