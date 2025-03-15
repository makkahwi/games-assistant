import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ScoresTableView from "views/Common/Scores";

const ScoresTable = () => {
  const history = useSelector((state) => state.pictionary.history);
  const { t } = useTranslation();

  return (
    <ScoresTableView
      wordType={t("Pictionary")}
      members={["Team A", "Team B"]}
      history={history}
    />
  );
};

export default ScoresTable;
