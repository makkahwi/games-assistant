import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      outline
      onClick={() => navigate(-1)}
      className="btn btn-outline-primary my-3"
    >
      {t("Back")}
    </button>
  );
};

export default BackButton;
