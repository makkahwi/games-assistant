import { useSelector } from "react-redux";

import GameHeader from "views/Common/Header";

const Header = () => {
  const master = useSelector((state) => state.password.master);
  const gameId = useSelector((state) => state.password.gameId);

  return (
    <>
      <GameHeader name={master} />
      {gameId && <small className="text-white">Game ID: {gameId}</small>}
    </>
  );
};

export default Header;
