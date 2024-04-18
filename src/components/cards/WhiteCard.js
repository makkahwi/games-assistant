import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

const WhiteCard = ({ title, desc, bg, gameUrl, rulesUrl }) => {
  const navigate = useNavigate();

  return (
    <Card className="card-blog" data-header="pattern">
      <CardImg alt="..." className="img pattern rounded" src={bg} top />

      <CardBody>
        <CardTitle className="h5 mb-0">{title}</CardTitle>

        <CardText className="mt-2 mb-4">{desc}</CardText>

        <ButtonGroup>
          <Button color="primary" onClick={() => navigate(gameUrl)}>
            Start Game
          </Button>

          <Button
            color="light"
            className="text-dark"
            onClick={() => navigate(rulesUrl)}
          >
            Game Rules
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default WhiteCard;
