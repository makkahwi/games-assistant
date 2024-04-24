import { useTranslation } from "react-i18next";
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

const WhiteCard = ({ title, desc, bg, gameUrl, rulesUrl, comingSoon }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="card-blog" data-header="pattern">
      <CardImg alt="..." className="img pattern rounded" src={bg} top />

      <CardBody>
        <CardTitle className="h5 mb-0">{title}</CardTitle>

        <CardText className="mt-2 mb-4">{desc}</CardText>

        {comingSoon ? (
          <Button color="danger" disabled>
            {t("Coming Soon")}
          </Button>
        ) : (
          <ButtonGroup>
            <Button color="primary" onClick={() => navigate(gameUrl)}>
              {t("Start Game")}
            </Button>

            <Button
              color="light"
              className="text-dark"
              onClick={() => navigate(rulesUrl)}
            >
              {t("Game Rules")}
            </Button>
          </ButtonGroup>
        )}
      </CardBody>
    </Card>
  );
};

export default WhiteCard;
