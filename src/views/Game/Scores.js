import { Table } from "reactstrap";
import { useSelector } from "react-redux";

const ScoresTable = () => {
  const history = useSelector((state) => state.game.history);

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="text-primary">
          <th>Team</th>

          <th>PassWord</th>

          <th>Point</th>
        </tr>
      </thead>

      <tbody className="list">
        {history
          ?.filter(({ team }) => team === "Team A")
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{team}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>Team A Total</td>
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
              <td>{team}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>Team B Total</td>
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
