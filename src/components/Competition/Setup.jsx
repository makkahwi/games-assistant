import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormComp from "../Form";
import FormatPicker from "./FormatPicker";
import { isFormat, formatLabel, rosterFromValues } from "../../utils/competition";

export default function CompetitionSetup({ game, setNames }) {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const format = params.get("format");
  const [teamSize, setTeamSize] = useState(3);
  const dispatch = useDispatch();
  if (!isFormat(format)) return <FormatPicker onSelect={(value) => setParams({ format: value })} />;
  const count = format === "1v1" ? 1 : format === "2v2" ? 2 : teamSize;
  const inputs = [{ name: "master", label: t("Break host name"), icon: "fas fa-mug-hot", minLength: 2, pattern: ".*\\S.*", required: true }, ...["A", "B"].flatMap((team, side) => Array.from({ length: count }, (_, index) => ({
    name: `team${team}member${index + 1}`,
    label: format === "1v1" ? t("Player name", { number: side + 1 }) : t("Team member name", { team, number: index + 1 }),
    icon: "fas fa-user", minLength: 2, pattern: ".*\\S.*", required: true,
  })))];
  return <div className="break-setup">
    <div className="setup-heading"><Link to="/">← {t("Change format")}</Link><span className="format-pill">{t(formatLabel(format))}</span><h1>{t(game)}</h1><p>{t(format === "1v1" ? (game === "Pictionary" ? "The host draws for both players. First correct guess wins one point." : "Your host gives both players clues and keeps score. Players take turns guessing.") : "Your host keeps things fair. Teammates take turns giving clues.")}</p></div>
    {format === "teams" && <div className="team-size-control"><label htmlFor="team-size">{t("People per team")}</label><select id="team-size" value={teamSize} onChange={(event) => setTeamSize(Number(event.target.value))}>{[2, 3, 4, 5, 6, 7, 8].map((size) => <option value={size} key={size}>{size}</option>)}</select></div>}
    <FormComp key={`${format}-${count}`} label={t("Meet your break crew")} inputs={inputs} submitLabel={t("Yalla, let’s play")} onSubmit={(values) => {
      dispatch(setNames({ ...values, master: values.master.trim(), format, members: rosterFromValues({ ...values, teamSize }, format) }));
    }} />
  </div>;
}
