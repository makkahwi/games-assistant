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
  const [inputValues, setInputValues] = useState(
    inputs.reduce((final, current) => {
      if (current.defaultValue) {
        return { ...final, [current.name]: current.defaultValue };
      }

      return final;
    }, {})
  );

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
          {
            name,
            label,
            icon,
            type = "text",
            required,
            options,
            minLength,
            note,
            ...rest
          },
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
            ...rest,
          };

          return (
            <div
              className={"input-group mb-3 w-100 " + inputFocuses[name]}
              key={i}
            >
              <div className="input-group-text">
                <i className={icon + " me-2"} /> {label}
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
              ) : type === "boolean" ? (
                <select {...props}>
                  <option placeholder="true">{"Select " + label}</option>
                  <option defaultValue="Yes">Yes</option>
                  <option defaultValue="No">No</option>
                </select>
              ) : (
                <input {...props} />
              )}

              {note && <div className="input-group-text">{note}</div>}
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
