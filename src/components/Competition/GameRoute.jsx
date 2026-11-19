import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { formatLabel } from "../../utils/competition";

export default function GameRoute({ name, reset, game, setup }) {
  const session = useSelector((state) => state[name]);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const chosen = params.get("format");
  const saved = session.format || "teams";
  if (!session.master) return setup;
  if (chosen && chosen !== saved) return <section className="card session-choice p-4 text-center"><h1>{t("A break is already in play")}</h1><p>{t("Your saved game uses a different format.")} {t(formatLabel(saved))}</p><div className="btn-group justify-content-center"><button className="btn btn-primary" onClick={() => setParams({ format: saved })}>{t("Resume saved game")}</button><button className="btn btn-light" onClick={() => { if (window.confirm(t("Start fresh? The current game and its scores will be cleared."))) dispatch(reset()); }}>{t("Start a new break")}</button></div></section>;
  return game;
}
