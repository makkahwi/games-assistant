import { useLayoutEffect } from "react";

import Header from "./Header";

const GamePage = () => {
  useLayoutEffect(() => {
    document.body.classList.add("landing-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <div className="wrapper">
      <Header />
    </div>
  );
};

export default GamePage;
