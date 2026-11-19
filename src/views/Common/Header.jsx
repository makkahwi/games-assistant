import { formatLabel } from "../../utils/competition";
import { useTranslation } from "react-i18next";

const GameHeader = ({ name, format }) => {
  const { t } = useTranslation();

  return (
    <>
    {format && <span className="format-pill mb-3">{t(formatLabel(format))}</span>}
    <h1 className="text-white bg-primary py-3">{t("Welcome", { name })}</h1>
    </>
  );
};

export default GameHeader;
