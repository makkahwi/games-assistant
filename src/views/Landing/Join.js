import FormComp from "../../components/Form";

const JoinGame = () => {
  const inputs = [
    {
      name: "code",
      label: "Game Code",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "name",
      label: "Your Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team",
      label: "Your Team",
      type: "select",
      options: [{ name: "Team A" }, { name: "Team B" }],
      icon: "ni ni-email-83",
      required: true,
    },
  ];

  return (
    <FormComp label="Join Existing Game" inputs={inputs} submitLabel="Join" />
  );
};

export default JoinGame;
