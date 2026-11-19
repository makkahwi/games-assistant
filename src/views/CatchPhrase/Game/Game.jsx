import { useTranslation } from "react-i18next";

const Game = () => {
  const { t } = useTranslation();
  return <p>{t("Coming Soon")}</p>;
};

export default Game;
