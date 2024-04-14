import { Table } from "reactstrap";
import { useSelector } from "react-redux";

const TeamsTable = () => {
  const members = useSelector((state) => state.game.members);
  const scores = useSelector((state) => state.game.scores);

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="text-primary">
          <th />

          <th>Team 1</th>

          <th>Team 2</th>
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

        <tr className="bg-white text-primary font-weight-bolder">
          <td>Scores</td>
          <td>{scores[0]}</td>
          <td>{scores[1]}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TeamsTable;
