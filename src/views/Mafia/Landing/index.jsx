import { useTranslation } from "react-i18next";
import CreateGame from "./Create";

export default function MafiaLanding() {
  const { t } = useTranslation();
  return <><div className="setup-heading break-setup"><span className="format-pill">{t("Multiplayer group")}</span><p className="lineup-note">{t("Mafia is a group role game with no player limit.")}</p></div><CreateGame /></>;
}
