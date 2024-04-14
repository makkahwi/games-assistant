import { useDispatch } from "react-redux";
import { setNames } from "values";
import FormComp from "../../components/Form";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputs = [
    {
      name: "master",
      label: "Your Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team1member1",
      label: "Team A Member 1 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team1member2",
      label: "Team A Member 2 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team2member1",
      label: "Team B Member 1 Name",
      icon: "ni ni-email-83",
      required: true,
    },
    {
      name: "team2member2",
      label: "Team B Member 2 Name",
      icon: "ni ni-email-83",
      required: true,
    },
  ];

  return (
    <FormComp
      label="Create New Game"
      inputs={inputs}
      submitLabel="Create"
      onSubmit={(values) => {
        dispatch(setNames(values));
        navigate(0);
      }}
    />
  );
};

export default CreateGame;
