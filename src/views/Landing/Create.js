import { useDispatch } from "react-redux";
import { setNames } from "values";
import FormComp from "../../components/Form";

const CreateGame = () => {
  const dispatch = useDispatch();

  const inputs = [
    {
      name: "master",
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
    <FormComp
      label="Create New Game"
      inputs={inputs}
      submitLabel="Create"
      onSubmit={(values) => dispatch(setNames(values))}
    />
  );
};

export default CreateGame;
