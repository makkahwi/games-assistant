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
      icon: "fa-solid fa-person-chalkboard",
      required: true,
    },
    {
      name: "teamAmember1",
      label: "Team A Member 1 Name",
      icon: "fa-solid fa-a",
      required: true,
    },
    {
      name: "teamAmember2",
      label: "Team A Member 2 Name",
      icon: "fa-solid fa-a",
      required: true,
    },
    {
      name: "teamBmember1",
      label: "Team B Member 1 Name",
      icon: "fa-solid fa-b",
      required: true,
    },
    {
      name: "teamBmember2",
      label: "Team B Member 2 Name",
      icon: "fa-solid fa-b",
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
