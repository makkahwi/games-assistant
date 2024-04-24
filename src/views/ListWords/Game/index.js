import GameView from "views/Common/GameView";

import { reset } from "../../../redux/listwords";
import Game from "./Game";
import Header from "./Header";
import ScoresTable from "./Scores";
import TeamsTable from "./TeamsTable";

const ListWordsGame = () => {
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

export default ListWordsGame;
