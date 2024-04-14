import { Fragment } from "react";
import { Button, ButtonGroup } from "reactstrap";

const Header = () => {
  return (
    <Fragment>
      <h1 className="text-white">Welcome Suhaib</h1>
      <h4 className="text-white">Your Team is Team 1</h4>

      <h6 className="text-white">Game Code: thisIsGameCode</h6>

      <ButtonGroup>
        <Button color="primary" type="button">
          Copy Game Code
        </Button>

        <Button color="success" type="button">
          Share On Wasap
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default Header;
