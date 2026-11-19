import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import FormComp from "../Form";
import { rosterFromValues } from "../../utils/competition";

export default function CompetitionSetup({ game, setNames }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, setParams] = useSearchParams();
  const inputs = [
    { name: "master", label: t("Break host name"), icon: "fas fa-mug-hot", minLength: 2, pattern: ".*\\S.*", required: true },
    ...["A", "B"].flatMap((team) => [1, 2].map((number) => ({ name: `team${team}member${number}`, label: t("Team member name", { team, number }), icon: "fas fa-user", minLength: 2, pattern: ".*\\S.*", required: true }))),
  ];
  return <div className="break-setup">
    <div className="setup-heading"><Link to="/?format=2v2">{t("Back to games")}</Link><span className="format-pill">{t("2 vs 2")}</span><h1>{t(game)}</h1><p>{t("Two teams of two. Take turns between teams and swap roles within each team.")}</p></div>
    <FormComp label={t("Meet your break crew")} inputs={inputs} submitLabel={t("Yalla, let’s play")} onSubmit={(values) => { setParams({ format: "2v2" }, { replace: true }); dispatch(setNames({ ...values, master: values.master.trim(), format: "2v2", members: rosterFromValues(values, "2v2") })); }} />
  </div>;
}
