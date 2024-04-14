import { Button, ButtonGroup, Col, Row } from "reactstrap";

import Table from "./Table";

const TeamsTable = () => {
  const teams = [
    { name: "Team 1", members: [{ name: "Suhaib" }, { name: "Shahad" }] },
    { name: "Team 2", members: [{ name: "Qusai" }, { name: "Eleen" }] },
  ];

  return <Table data={teams} />;
};

export default TeamsTable;
