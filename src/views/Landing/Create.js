import FormComp from "../../components/Form";

const CreateGame = () => {
  const inputs = [
    {
      name: "name",
      label: "Your Name",
      icon: "ni ni-email-83",
      required: true,
    },
  ];

  return (
    <FormComp
      label="Create New Game"
      inputs={inputs}
      submitLabel="Create"
      light
    />
  );
};

export default CreateGame;
