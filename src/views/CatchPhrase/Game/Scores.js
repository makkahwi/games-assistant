import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ScoresTableView from "views/Common/Scores";

const ScoresTable = () => {
  const members = useSelector((state) => state.catchphrase.members);
  const history = useSelector((state) => state.catchphrase.history);
  const { t } = useTranslation();

  return (
    <ScoresTableView
      wordType={t("Category")}
      members={members}
      history={history}
    />
  );
};

export default ScoresTable;
