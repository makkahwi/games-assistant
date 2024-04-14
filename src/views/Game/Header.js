import { useSelector } from "react-redux";

const Header = () => {
  const master = useSelector((state) => state.game.master);

  return <h1 className="text-white">Welcome, {master}</h1>;
};

export default Header;
