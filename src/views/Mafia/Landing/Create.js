import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormComp from "../../../components/Form";
import { setRoles } from "../../../redux/mafia";

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
      name: "killers",
      label: t("Mafia Count"),
      icon: "fa-solid fa-k",
      min: 1,
      defaultValue: 1,
      type: "number",
      required: true,
    },
    {
      name: "citizens",
      label: t("Citizens Count"),
      icon: "fa-solid fa-c",
      min: 1,
      note: t(
        "Remember that there are Judge & Nurse, and don't count downer here"
      ),
      type: "number",
      required: true,
    },
    {
      name: "drowner",
      label: t("With Drowner?"),
      icon: "fa-solid fa-d",
      type: "boolean",
      required: true,
    },
  ];

  return (
    <Fragment>
      <FormComp
        label={t("Create New Mafia Game")}
        inputs={inputs}
        submitLabel={t("Create")}
        onSubmit={(values) => {
          const result = window.confirm(
            `With ${
              values.drowner === "Yes"
                ? "Judge, Nurse & Drowner"
                : "Judge & Nurse"
            }, Total Number of Players Is: ${
              2 +
              parseInt(values.killers) +
              parseInt(values.citizens) +
              (values.drowner === "Yes" ? 1 : 0)
            }`
          );

          if (result) {
            dispatch(setRoles(values));
            navigate(0);
          }
        }}
      />
    </Fragment>
  );
};

export default CreateGame;
