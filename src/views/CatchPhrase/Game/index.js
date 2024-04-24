import GameView from "views/Common/GameView";

import { reset } from "../../../redux/catchphrase";
import Game from "./Game";
import Header from "./Header";
import ScoresTable from "./Scores";
import TeamsTable from "./TeamsTable";

const CatchPhraseGame = () => {
  return (
    <GameView
      header={<Header />}
      game={<Game />}
      teams={<TeamsTable />}
      scores={<ScoresTable />}
      reset={reset}
    />
  );
};

export default CatchPhraseGame;
