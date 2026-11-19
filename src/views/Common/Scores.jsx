import { useTranslation } from "react-i18next";

const ScoresTableView = ({ wordType, members, history, labels }) => {
  const { t } = useTranslation();

  return (
    <div className="scores-view">
    {!history?.length && <div className="empty-state" role="status"><i className="fas fa-flag-checkered" aria-hidden="true" />{t("No rounds yet. Play your first round to see scores here.")}</div>}
    <table className="table table-striped table-responsive w-100">
      <thead>
        <tr className="text-primary">
          <th scope="col">{t(labels ? "Player" : "Team")}</th>

          <th scope="col">{wordType}</th>

          <th scope="col">{t("Score")}</th>
        </tr>
      </thead>

      <tbody className="list">
        {history
          ?.filter(({ team }) => team === members[0])
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{labels?.[members.indexOf(team)] || t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="fw-bolder">
          <td colSpan={2}>{t("X Total", { member: labels?.[0] || t(members[0]) })}</td>
          <td>
            {history
              ?.filter(({ team }) => team === members[0])
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>

        {history
          ?.filter(({ team }) => team === members[1])
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{labels?.[members.indexOf(team)] || t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="fw-bolder">
          <td colSpan={2}>{t("X Total", { member: labels?.[1] || t(members[1]) })}</td>
          <td>
            {history
              ?.filter(({ team }) => team === members[1])
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default ScoresTableView;
