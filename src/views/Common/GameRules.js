import { useState } from "react";
import { useTranslation } from "react-i18next";

import BackButton from "components/Buttons/BackButton";

const GameRules = ({ gameName, rules }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Introduction");

  return (
    <div className="card p-5">
      <h4 className="text-primary mb-4">{t("X Game Rules", { gameName })}</h4>

      <ul className="nav nav-tabs" role="tablist">
        {rules.map(({ title }, i) => (
          <li
            className="nav-item p-0 text-center mr-4"
            onClick={() => setActiveTab(title)}
            key={i}
          >
            <div
              className={"nav-link " + (activeTab === title ? "active" : "")}
            >
              {t(title)}
            </div>
          </li>
        ))}
      </ul>

      <div className="tab-content py-4">
        {rules.map(({ title, rules }, i) => (
          <div
            className={`tab-pane ${activeTab === title ? "active" : ""}`}
            key={i}
          >
            <ul class="list-group list-group-flush">
              {rules.map((text, y) => (
                <li
                  className="description text-primary font-weight-bold text-justify py-3 list-group-item"
                  key={y}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <BackButton />
    </div>
  );
};

export default GameRules;
