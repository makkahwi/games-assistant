import { useSelector } from "react-redux";

import GameHeader from "views/Common/Header";

const Header = () => {
  const master = useSelector((state) => state.password.master);
  const gameId = useSelector((state) => state.password.gameId);

  const format = useSelector((state) => state.password.format);

  return (
    <>
      <GameHeader name={master} format={format} />
      {gameId && <small className="text-white">Game ID: {gameId}</small>}
    </>
  );
};

export default Header;
