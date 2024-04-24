import React, { Fragment } from "react";

import CreateGame from "./Create";

const CatchPhraseLanding = () => {
  React.useEffect(() => {
    document.body.classList.add("register-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  return (
    <Fragment>
      {/* <div className="form-container sign-in-container">
            <JoinGame />
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right"> */}
      <CreateGame />
      {/* </div>
            </div>
          </div> */}
    </Fragment>
  );
};

export default CatchPhraseLanding;