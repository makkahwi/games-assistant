import { useSelector } from "react-redux";

import GameHeader from "views/Common/Header";

const Header = () => {
  const master = useSelector((state) => state.catchphrase.master);

  return <GameHeader name={master} />;
};

export default Header;
