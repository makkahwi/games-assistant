import { Card, CardBody, CardHeader, CardImg, CardTitle } from "reactstrap";

const YellowCard = () => {
  return (
    <Card className="card-blog" data-header="skew">
      <CardHeader className="bg-yellow">
        <div className="card-image">
          <CardImg
            alt="..."
            src={require("assets/img/ill/inn.svg").default}
            top
          ></CardImg>
        </div>
      </CardHeader>
      <CardBody>
        <h6 className="card-category">
          <i className="ni ni-paper-diploma"></i>
          Business
        </h6>
        <CardTitle tag="h5">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            Springer Spends $343M To Buy Business Insider
          </a>
        </CardTitle>
        <p className="card-description">
          German media giant Axel Springer has announced it’s acquiring online
          business news publication Business Inside...
        </p>
      </CardBody>
    </Card>
  );
};

export default YellowCard;
