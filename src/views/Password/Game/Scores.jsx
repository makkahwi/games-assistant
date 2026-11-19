import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ScoresTableView from "views/Common/Scores";

const ScoresTable = () => {
  const history = useSelector((state) => state.password.history);
  const { t } = useTranslation();

  const session = useSelector((state) => state.password);
  return (
    <ScoresTableView
      wordType={t("PassWord")}
      members={["Team A", "Team B"]}
      labels={session.format === "1v1" ? session.members.map((team) => team[0]) : undefined}
      history={history}
    />
  );
};

export default ScoresTable;
