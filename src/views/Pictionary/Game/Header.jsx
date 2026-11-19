import { useSelector } from "react-redux";

import GameHeader from "views/Common/Header";

const Header = () => {
  const master = useSelector((state) => state.pictionary.master);

  const format = useSelector((state) => state.pictionary.format);
  return <GameHeader name={master} format={format} />;
};

export default Header;
