import { useTranslation } from "react-i18next";

const Game = () => {
  const { t } = useTranslation();
  return <div className="empty-state" role="status"><i className="fas fa-comments" aria-hidden="true" /><h2>{t("Coming Soon")}</h2><p>{t("CatchPhrase")}</p></div>;
};

export default Game;
