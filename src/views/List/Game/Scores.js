import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";

const ScoresTable = () => {
  const members = useSelector((state) => state.list.members);
  const history = useSelector((state) => state.list.history);
  const { t } = useTranslation();

  const wordCategories = [
    "Animals",
    "Colors",
    "Names",
    "Places",
    "Cities",
    "Countries",
  ];

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
          ?.filter(({ team }) => team === members[0])
          ?.map(({ team, point, category }, i) => (
            <tr className="text-white" key={i}>
              <td>{t(team)}</td>
              <td>{wordCategories[category]}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("Member Total", { member: members[0] })}</td>
          <td>
            {history
              ?.filter(({ team }) => team === members[0])
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>

        {history
          ?.filter(({ team }) => team === members[1])
          ?.map(({ team, point, category }, i) => (
            <tr className="text-white" key={i}>
              <td>{t(team)}</td>
              <td>{wordCategories[category]}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>{t("Member Total", { member: members[0] })}</td>
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

export default ScoresTable;
