import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const RulesPage = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Introduction");

  const contents = [
    {
      title: t("Introduction"),
      rules: [
        t(
          "This is a game for two teams, each team is made of two members Let's call them Team A & Team B, and each team have Member 1 & Member 2"
        ),
        t(
          "The game is about guessing a password, one word of Arabic language, which could be a noun, verb or adjective"
        ),
        t(
          "Game is made of rounds, where in each round a new password is given to be guessed"
        ),
        t(
          "Team with most scores after certain number of rounds wins Number of rounds should be 4 or one of its multiplies"
        ),
      ],
    },
    {
      title: t("How To Play"),
      rules: [
        t(
          "Game start with a password given to Member 1 of each team, and Team A start playing where Member 1 check the password, then gives one-word clue to Member 2 of his team to try n guess the password"
        ),
        t("Clues can't be same or part of the password to guess"),
        t(
          "If Team A guessed it wrong, it's Team B turn to try to guess, where Member A give a new clue to Member 2"
        ),
        t("Round ends when a Member 2 guess the password right"),
        t(
          "In next round, member teams switch roles, where Member 1 become the guesser, and Member 2 is clue giver"
        ),
      ],
    },
    {
      title: t("Scores"),
      rules: [
        t(
          "Winner team is the one that collects most points of all played rounds"
        ),
        t(
          "Each round start with 6 points as possible points to earn, and it goes down with each new clue given after the first one"
        ),
        t(
          "So if password is guessed with only 1 clue given, that's 6 points to guessing team"
        ),
        t(
          "If it's guessed after 2 clues are given, that's 5 points, and so on"
        ),
        t(
          "If no one guessed it after 7 clues, that's the end of the round without any one earning points"
        ),
      ],
    },
  ];

  return (
    <Card className="p-5">
      <Nav className="nav-pills-primary" pills role="tablist">
        {contents.map(({ title }, i) => (
          <NavItem className="p-0 text-center mr-4">
            <NavLink
              className={activeTab === title ? "active" : ""}
              onClick={() => setActiveTab(title)}
            >
              {title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent className="mt-2" activeTab={activeTab}>
        {contents.map(({ title, rules }, i) => (
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
    </Card>
  );
};

export default RulesPage;
