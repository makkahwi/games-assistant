import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TeamsTable = () => {
  const members = useSelector((state) => state.listwords.members);
  const { t } = useTranslation();

  return (
    <table className="table table-responsive align-items-center table-flush">
      <tbody className="list">
        <tr>
          <td className="bg-white text-primary">{t("Team A")}</td>
          <td>{members[0]}</td>
        </tr>

        <tr>
          <td className="bg-white text-primary">{t("Team B")}</td>
          <td>{members[1]}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TeamsTable;
