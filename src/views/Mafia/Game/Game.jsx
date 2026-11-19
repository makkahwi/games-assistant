import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const generateRandomNumberInRange = (min = 1, max = 9, exclusions = [], onExhausted = () => {}) => {
  const range = [];

  for (let i = min; i <= max; i++) {
    if (!exclusions.includes(i)) {
      range.push(i);
    }
  }

  if (range.length === 0) {
    onExhausted();
    return;
  }

  const randomIndex = Math.floor(Math.random() * range.length);
  return range[randomIndex];
};

const Game = () => {
  const roles = useSelector((state) => state.mafia.roles);
  const { t } = useTranslation();

  const [availableRoles, setAvailableRoles] = useState([]);
  const [takenRoles, setTakenRoles] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [hide, setHide] = useState(true);

  const generateRandomNumber = useCallback((length = 0) => {
    const newRandomNumber = generateRandomNumberInRange(
      0,
      length - 1,
      takenRoles,
      () => alert(t("All roles have been shown."))
    );
    setRandomNumber(newRandomNumber);
    setTakenRoles((current) => [...current, newRandomNumber]);
  }, [takenRoles, t]);

  useEffect(() => {
    const { killers, citizens, drowner } = roles;

    const final = ["Judge", "Nurse"];

    if (drowner === "Yes") {
      final.push("Drowner");
    }

    for (let i = 0; i < killers; i++) {
      final.push("Mafia");
    }

    for (let i = 0; i < citizens; i++) {
      final.push("Citizen");
    }

    setAvailableRoles(final);
    const firstRandomNumber = generateRandomNumberInRange(0, final.length - 1);

    setRandomNumber(firstRandomNumber);
    setTakenRoles([firstRandomNumber]);
    setHide(true);
  }, [roles]);

  const onHide = () => {
    setHide(true);
    generateRandomNumber(availableRoles.length);
  };

  return (
    <Fragment>
      <div className="row my-3 mafia-game">
        <div className="col-md-12 mt-4 mb-2">
          <h4 className="text-white">
            {t("Total Number of Players")} {availableRoles.length}
            <br />
            <br />
            {t("Available roles are")}
            <br />
            <br />
            <span className="mafia-summary">{Object.entries(availableRoles.reduce((counts, role) => ({ ...counts, [role]: (counts[role] || 0) + 1 }), {})).map(([role, count]) => <span className="role-count" key={role}>{t(role)} <strong>{count}</strong></span>)}</span>
          </h4>
        </div>

        <div className="col-md-12 role-reveal">
          <h4 className="text-white">
            {t("Your role is")}
            <br />
            {hide ? (
              <button
                className="btn btn-danger my-2"
                disabled={randomNumber === undefined}
                onClick={() => setHide(false)}
              >
                {t("Show")}
              </button>
            ) : (
              <span className="h3" role="status">
                {availableRoles[randomNumber] ? t(availableRoles[randomNumber]) : t("All roles have been shown.")}
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


      </div>
    </Fragment>
  );
};

export default Game;
