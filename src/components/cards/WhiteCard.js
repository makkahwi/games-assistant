import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

const WhiteCard = ({ title, desc, bg, rulesUrl }) => {
  return (
    <Card className="card-blog" data-header="pattern">
      <CardImg alt="..." className="img pattern rounded" src={bg} top />

      <CardBody>
        <CardTitle className="h5 mb-0">{title}</CardTitle>

        <CardText className="mt-4">{desc}</CardText>

        <Link to={rulesUrl}>
          <Button className="px-0" color="link">
            Game Rules
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default WhiteCard;
