import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormComp from "../../../components/Form";
import { setNames } from "../../../redux/catchphrase";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputs = [
    {
      name: "master",
      label: t("Game Master Name"),
      icon: "fa-solid fa-person-chalkboard",
      minLength: 3,
      required: true,
    },
    {
      name: "member1",
      label: t("Member 1 Name"),
      icon: "fa-solid fa-a",
      minLength: 3,
      required: true,
    },
    {
      name: "member2",
      label: t("Member 2 Name"),
      icon: "fa-solid fa-b",
      minLength: 3,
      required: true,
    },
  ];

  return (
    <FormComp
      label={t("Create New CatchPhrase Game")}
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
