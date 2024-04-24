import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import BackButton from "components/Buttons/BackButton";

const GameRules = ({ gameName, rules }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Introduction");

  return (
    <Card className="p-5">
      <h4 className="text-primary mb-4">{gameName} Game Rules</h4>

      <Nav className="nav-pills-primary" pills role="tablist">
        {rules.map(({ title }, i) => (
          <NavItem className="p-0 text-center mr-4">
            <NavLink
              className={activeTab === title ? "active" : ""}
              onClick={() => setActiveTab(title)}
            >
              {t(title)}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent className="mt-2" activeTab={activeTab}>
        {rules.map(({ title, rules }, i) => (
          <TabPane tabId={title} key={i}>
            <ul className="pl-4">
              {rules.map((text, y) => (
                <li
                  className="description text-primary font-weight-bold text-justify mb-3"
                  key={y}
                >
                  {text}
                </li>
              ))}
            </ul>
          </TabPane>
        ))}
      </TabContent>

      <BackButton />
    </Card>
  );
};

export default GameRules;
