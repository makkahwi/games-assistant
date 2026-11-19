import { useTranslation } from "react-i18next";

const GameHeader = ({ name }) => {
  const { t } = useTranslation();

  return (
    <h1 className="text-white bg-primary py-3">{t("Welcome", { name })}</h1>
  );
};

export default GameHeader;
