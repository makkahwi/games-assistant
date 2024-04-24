import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";

const TeamsTable = () => {
  const members = useSelector((state) => state.catchphrase.members);
  const { t } = useTranslation();

  return (
    <Table className="align-items-center table-flush" responsive>
      <tbody className="list">
        <tr>
          <td className="bg-white text-primary">{t("Team A")}</td>
          <td className="text-white">{members[0]}</td>
        </tr>

        <tr>
          <td className="bg-white text-primary">{t("Team B")}</td>
          <td className="text-white">{members[1]}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TeamsTable;
