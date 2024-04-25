import { useState } from "react";

import BackButton from "components/Buttons/BackButton";

const FormComp = ({
  label,
  inputs,
  onSubmit,
  submitLabel = "Submit",
  light,
}) => {
  const [inputFocuses, setInputFocuses] = useState({});
  const [inputValues, setInputValues] = useState({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValues);
      }}
      className="card p-5"
    >
      <h4
        className={
          "mb-4 text-center " + (light ? "text-white" : "text-primary")
        }
      >
        {label}
      </h4>

      {inputs.map(
        (
          { name, label, icon, type = "text", required, options, minLength },
          i
        ) => {
          const props = {
            placeholder: label + (required ? " *" : ""),
            value: inputValues[name],
            onChange: (e) =>
              setInputValues((current) => ({
                ...current,
                [name]: e.target.value,
              })),
            minLength: minLength,
            required: required,
            type: type,
            onFocus: () =>
              setInputFocuses((current) => ({
                ...current,
                [name]: "focused",
              })),
            onBlur: () =>
              setInputFocuses((current) => ({ ...current, [name]: "" })),
            className: "form-control",
          };

          return (
            <div
              className={"input-group mb-3 w-100 " + inputFocuses[name]}
              key={i}
            >
              <div className="input-group-text">
                <i className={icon} />
              </div>

              {type === "select" ? (
                <select {...props}>
                  <option placeholder="true">{"Select " + label}</option>
                  {options?.map(({ name, label }, y) => (
                    <option defaultValue={name} key={y}>
                      {label || name}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...props} />
              )}
            </div>
          );
        }
      )}

      <div className="btn-group">
        <button
          className={`btn btn-${light ? "white" : "primary"} my-3`}
          type="submit"
        >
          {submitLabel}
        </button>

        <BackButton />
      </div>
    </form>
  );
};

export default FormComp;
