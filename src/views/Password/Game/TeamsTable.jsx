import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TeamsTable = () => {
  const members = useSelector((state) => state.password.members);
  const format = useSelector((state) => state.password.format);
  const { t } = useTranslation();

  return (
    <table className="table table-striped table-responsive w-100">
      <thead className="thead-light">
        <tr className="text-primary">
          <th />

          <th>{format === "1v1" ? t("Player 1 Name") : t("Team A")}</th>

          <th>{format === "1v1" ? t("Player 2 Name") : t("Team B")}</th>
        </tr>
      </thead>

      <tbody className="list">
        {Array.from({ length: Math.max(...members.map((team) => team.length)) }, (_, i) => (
          <tr className="text-white" key={i}>
            <td>
              {t("Member")} {i + 1}
            </td>
            <td>{members[0][i] || "—"}</td>
            <td>{members[1][i] || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;
