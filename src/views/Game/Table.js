import { Table } from "reactstrap";

const TeamsTable = ({ data }) => {
  return (
    <Table className="align-items-center table-flush mt-5" responsive>
      <thead>
        <tr>
          <th colSpan={3} className="text-white">
            Teams
          </th>
        </tr>

        <tr className="bg-white text-primary">
          <th />

          <th>Team 1</th>

          <th>Team 2</th>
        </tr>
      </thead>

      <tbody className="list">
        {[1, 2].map((_, i) => (
          <tr className="text-white" key={i}>
            <td>Member {i + 1}</td>
            <td>{data[0].members[i].name}</td>
            <td>{data[1].members[i].name}</td>
          </tr>
        ))}

        <tr className="bg-white text-primary font-weight-bolder">
          <td>Scores</td>
          <td>{31}</td>
          <td>{25}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TeamsTable;
