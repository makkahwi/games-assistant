import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setNames } from "values";

import FormComp from "../../components/Form";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputs = [
    {
      name: "master",
      label: "Your Name",
      icon: "fa-solid fa-person-chalkboard",
      minLength: 4,
      required: true,
    },
    {
      name: "teamAmember1",
      label: "Team A Member 1 Name",
      icon: "fa-solid fa-a",
      minLength: 4,
      required: true,
    },
    {
      name: "teamAmember2",
      label: "Team A Member 2 Name",
      icon: "fa-solid fa-a",
      minLength: 4,
      required: true,
    },
    {
      name: "teamBmember1",
      label: "Team B Member 1 Name",
      icon: "fa-solid fa-b",
      minLength: 4,
      required: true,
    },
    {
      name: "teamBmember2",
      label: "Team B Member 2 Name",
      icon: "fa-solid fa-b",
      minLength: 4,
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
