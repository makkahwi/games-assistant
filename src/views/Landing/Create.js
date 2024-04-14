import FormComp from "../../components/Form";

const CreateGame = () => {
  const inputs = [
    {
      name: "name",
      label: "Your Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team1member1",
      label: "Team 1 Member 1 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team1member2",
      label: "Team 1 Member 2 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team2member1",
      label: "Team 2 Member 1 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team2member2",
      label: "Team 2 Member 2 Name",
      icon: "ni ni-email-83",
      required: true,
    },
  ];

  return (
    <FormComp label="Create New Game" inputs={inputs} submitLabel="Create" />
  );
};

export default CreateGame;
