import FormComp from "../../components/Form";

const JoinGame = () => {
  const inputs = [
    {
      name: "code",
      label: "Game Code",
      icon: "fa-solid fa-code",
      required: true,
    },
    {
      name: "name",
      label: "Your Name",
      icon: "fa-solid fa-person",
      required: true,
    },
    {
      name: "team",
      label: "Your Team",
      type: "select",
      options: [{ name: "Team A" }, { name: "Team B" }],
      icon: "fa-solid fa-user-group",
      required: true,
    },
  ];

  return (
    <FormComp label="Join Existing Game" inputs={inputs} submitLabel="Join" />
  );
};

export default JoinGame;
