import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Header = () => {
  const master = useSelector((state) => state.game.master);
  const { t } = useTranslation();

  return <h1 className="text-white">{t("Welcome", { name: master })}</h1>;
};

export default Header;
