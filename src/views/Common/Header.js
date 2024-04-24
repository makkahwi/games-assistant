import { useTranslation } from "react-i18next";

const GameHeader = ({ name }) => {
  const { t } = useTranslation();

  return <h1 className="text-white">{t("Welcome", { name })}</h1>;
};

export default GameHeader;
