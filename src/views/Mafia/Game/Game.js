import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const generateRandomNumberInRange = (min = 1, max = 9, exclusions = []) => {
  const range = [];

  for (let i = min; i <= max; i++) {
    if (!exclusions.includes(i)) {
      range.push(i);
    }
  }

  if (range.length === 0) {
    alert("That's it, all roles have been exposed to players.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * range.length);
  return range[randomIndex];
};

const Game = () => {
  const roles = useSelector((state) => state.mafia.roles);
  const { t, i18n } = useTranslation();

  const [availableRoles, setAvailableRoles] = useState([]);
  const [takenRoles, setTakenRoles] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [hide, setHide] = useState(true);

  const generateRandomNumber = (length = 0) => {
    const newRandomNumber = generateRandomNumberInRange(
      0,
      length - 1,
      takenRoles
    );
    setRandomNumber(newRandomNumber);
    setTakenRoles((current) => [...current, newRandomNumber]);
  };

  useEffect(() => {
    const { killers, citizens, drowner } = roles;

    const final = [t("Judge"), t("Nurse")];

    if (drowner === "Yes") {
      final.push(t("Drowner"));
    }

    for (let i = 0; i < killers; i++) {
      final.push(t("Mafia"));
    }

    for (let i = 0; i < citizens; i++) {
      final.push(t("Citizen"));
    }

    setAvailableRoles(final);
    generateRandomNumber(final.length);
  }, [roles, i18n.language]);

  const onHide = () => {
    setHide(true);
    generateRandomNumber(availableRoles.length);
  };

  return (
    <Fragment>
      <div className="row my-3">
        <div className="col-md-12 mt-4 mb-2">
          <h4 className="text-white">
            {t("Total Number of Players")} {availableRoles.length}
            <br />
            <br />
            {t("Available roles are")}
            <br />
            <br />
            <pre>
              {JSON.stringify(
                availableRoles.reduce((final, current) => {
                  if (final[current]) {
                    return { ...final, [current]: final[current] + 1 };
                  }
                  return { ...final, [current]: 1 };
                }, {}),
                null,
                2
              )}
            </pre>
          </h4>
        </div>

        <div className="col-md-12 mt-4 mb-2">
          <h4 className="text-white">
            {t("Your role is")}
            <br />
            {hide ? (
              <button
                className="btn btn-danger my-2"
                onClick={() => setHide(false)}
              >
                {t("Show")}
              </button>
            ) : (
              <span className="h6">
                {availableRoles[randomNumber]}
                <br />
                <button
                  className="btn btn-danger my-2"
                  onClick={() => onHide()}
                >
                  {t("Next")}
                </button>
              </span>
            )}
          </h4>
        </div>

        <div className="col-md-12 mt-4 mb-2">
          <h4 className="text-white">
            <button
              className="btn btn-success text-white my-2"
              onClick={() => window.location.reload()}
            >
              {t("New Game With Same Roles & Same Number Of People")}{" "}
              {availableRoles.length}
            </button>
          </h4>
        </div>
      </div>
    </Fragment>
  );
};

export default Game;
