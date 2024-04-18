import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormComp from "../../components/Form";
import { setNames } from "../../redux/password";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputs = [
    {
      name: "master",
      label: t("Game Master Name"),
      icon: "fa-solid fa-person-chalkboard",
      minLength: 4,
      required: true,
    },
    {
      name: "teamAmember1",
      label: t("Team A Member 1 Name"),
      icon: "fa-solid fa-a",
      minLength: 4,
      required: true,
    },
    {
      name: "teamAmember2",
      label: t("Team A Member 2 Name"),
      icon: "fa-solid fa-a",
      minLength: 4,
      required: true,
    },
    {
      name: "teamBmember1",
      label: t("Team B Member 1 Name"),
      icon: "fa-solid fa-b",
      minLength: 4,
      required: true,
    },
    {
      name: "teamBmember2",
      label: t("Team B Member 2 Name"),
      icon: "fa-solid fa-b",
      minLength: 4,
      required: true,
    },
  ];

  return (
    <FormComp
      label={t("Create New Game")}
      inputs={inputs}
      submitLabel={t("Create")}
      onSubmit={(values) => {
        dispatch(setNames(values));
        navigate(0);
      }}
    />
  );
};

export default CreateGame;
