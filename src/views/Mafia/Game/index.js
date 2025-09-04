import GameView from "views/Common/GameView";

import { reset } from "../../../redux/mafia";
import Game from "./Game";
import Header from "./Header";

const MafiaGame = () => {
  return <GameView header={<Header />} game={<Game />} reset={reset} />;
};

export default MafiaGame;
