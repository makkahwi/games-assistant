import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormatPicker from "components/Competition/FormatPicker";
import CreateGame from "./Create";

export default function MafiaLanding() {
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  if (params.get("format") !== "teams") return <><p className="lineup-note">{t("Mafia needs a group. Choose Team vs team to play.")}</p><FormatPicker groupOnly onSelect={(format) => setParams({ format })} /></>;
  return <><p className="lineup-note">{t("Mafia is a group role game: colleagues play individual roles, not two fixed teams.")}</p><CreateGame /></>;
}
