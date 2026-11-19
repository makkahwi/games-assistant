import { useState } from "react";
import { useTranslation } from "react-i18next";
import GameActions from "../../components/GameActions";
import Tabs from "../../components/Tabs";

export default function GameView({ header, game, teams, scores }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("game");
  const tabs = [{ id: "game", label: t("Game"), content: game }, ...(teams ? [{ id: "teams", label: t("Teams"), content: teams }] : []), ...(scores ? [{ id: "scores", label: t("Scores"), content: scores }] : [])];
  return <div className="game-workspace">
    <header className="game-heading"><div>{header}</div><GameActions /></header>
    <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} label={t("Game menu")} />

  </div>;
}
