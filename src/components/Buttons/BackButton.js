import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      outline
      color="primary"
      onClick={() => navigate(-1)}
      className="my-3"
    >
      {t("Back")}
    </Button>
  );
};

export default BackButton;
