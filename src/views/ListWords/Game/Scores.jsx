import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ScoresTableView from "views/Common/Scores";

const ScoresTable = () => {
  const members = useSelector((state) => state.listwords.members);
  const history = useSelector((state) => state.listwords.history);
  const { t } = useTranslation();

  return (
    <ScoresTableView
      wordType={t("Category")}
      members={members}
      history={history.map((score) => ({ ...score, word: t(score.word) }))}
    />
  );
};

export default ScoresTable;
