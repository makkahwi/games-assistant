import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TeamsTable = () => {
  const members = useSelector((state) => state.pictionary.members);
  const { t } = useTranslation();

  return (
    <table className="table table-striped table-responsive w-100">
      <thead className="thead-light">
        <tr className="text-primary">
          <th />

          <th>{t("Team A")}</th>

          <th>{t("Team B")}</th>
        </tr>
      </thead>

      <tbody className="list">
        {[1, 2].map((_, i) => (
          <tr className="text-white" key={i}>
            <td>
              {t("Member")} {i + 1}
            </td>
            <td>{members[0][i]}</td>
            <td>{members[1][i]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;
