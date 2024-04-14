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
          ?.filter(({ team }) => team === "Team 1")
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{team}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>Team 1 Total</td>
          <td>
            {history
              ?.filter(({ team }) => team === "Team 1")
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>

        {history
          ?.filter(({ team }) => team === "Team 2")
          ?.map(({ team, point, word }, i) => (
            <tr className="text-white" key={i}>
              <td>{team}</td>
              <td>{word}</td>
              <td>{point}</td>
            </tr>
          ))}

        <tr className="bg-white font-weight-bolder">
          <td colSpan={2}>Team 2 Total</td>
          <td>
            {history
              ?.filter(({ team }) => team === "Team 2")
              ?.reduce((final, { point }) => final + point, 0)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoresTable;
