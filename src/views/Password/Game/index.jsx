import { useState } from "react";
import { useTranslation } from "react-i18next";
import GameView from "views/Common/GameView";

import { reset } from "../../../redux/password";
import Game from "./Game";
import Header from "./Header";
import ScoresTable from "./Scores";
import TeamsTable from "./TeamsTable";

const PassWordGame = () => {
  const [tableMode, setTableMode] = useState(true);
  const { t } = useTranslation();
  if (tableMode) return <Game onExit={() => setTableMode(false)} />;
  return (
    <GameView
      header={<Header />}
      game={<button className="btn btn-primary" onClick={() => setTableMode(true)}>{t("Return to table")}</button>}
      teams={<TeamsTable />}
      scores={<ScoresTable />}
      reset={reset}
    />
  );
};

export default PassWordGame;
