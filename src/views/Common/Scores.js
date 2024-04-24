import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";

const ScoresTableView = ({ wordType, members, history }) => {
  const { t } = useTranslation();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="text-primary">
          <th>{t("Team")}</th>

          <th>{wordType}</th>

          <th>{t("Score")}</th>
        </tr>
      </thead>

      <tbody className="list">
        {history
          ?.filter(({ team }) => team === members[0])
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("X Total", { member: members[0] })}</td>
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
              <td>{t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("X Total", { member: members[0] })}</td>
          <td>
            {history
              ?.filter(({ team }) => team === members[1])
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoresTableView;
