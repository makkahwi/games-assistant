import { Table } from "reactstrap";
import { useSelector } from "react-redux";

const TeamsTable = () => {
  const members = useSelector((state) => state.game.members);

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="text-primary">
          <th />

          <th>Team A</th>

          <th>Team B</th>
        </tr>
      </thead>

      <tbody className="list">
        {[1, 2].map((_, i) => (
          <tr className="text-white" key={i}>
            <td>Member {i + 1}</td>
            <td>{members[0][i]}</td>
            <td>{members[1][i]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamsTable;
