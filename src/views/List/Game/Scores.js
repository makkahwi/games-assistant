import { Table } from "reactstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ScoresTable = () => {
  const history = useSelector((state) => state.password.history);
  const { t } = useTranslation();

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="text-primary">
          <th>{t("Team")}</th>

          <th>{t("PassWord")}</th>

          <th>{t("Point")}</th>
        </tr>
      </thead>

      <tbody className="list">
        {history
          ?.filter(({ team }) => team === "Team A")
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("Team A Total")}</td>
          <td>
            {history
              ?.filter(({ team }) => team === "Team A")
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>

        {history
          ?.filter(({ team }) => team === "Team B")
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{t(team)}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("Team B Total")}</td>
          <td>
            {history
              ?.filter(({ team }) => team === "Team B")
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoresTable;
