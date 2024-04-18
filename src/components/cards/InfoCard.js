import { Card, CardBody } from "reactstrap";

const InfoCard = () => {
  return (
    <Card className="card-blog bg-info">
      <img
        alt="..."
        className="img pattern rounded"
        src={require("assets/img/ill/p7.svg").default}
      ></img>
      <CardBody>
        <h4 className="display-4 text-white">Here Be Dragons</h4>
        <p className="lead text-white mt-0">
          Our brains are finely attuned to distraction, so today's digital
          environment makes it especially hard to focus...
        </p>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
