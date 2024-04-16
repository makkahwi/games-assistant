import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

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
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValues);
      }}
    >
      <h4 className={light ? "text-white" : "text-dark"}>{label}</h4>

      {inputs.map(
        (
          { name, label, icon, type = "text", required, options, minLength },
          i
        ) => (
          <FormGroup className={"mb-3 w-100 " + inputFocuses[name]} key={i}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className={icon} />
                </InputGroupText>
              </InputGroupAddon>

              <Input
                placeholder={label + (required ? " *" : "")}
                value={inputValues[name]}
                onChange={(e) =>
                  setInputValues((current) => ({
                    ...current,
                    [name]: e.target.value,
                  }))
                }
                minLength={minLength}
                required={required}
                type={type}
                onFocus={() =>
                  setInputFocuses((current) => ({
                    ...current,
                    [name]: "focused",
                  }))
                }
                onBlur={() =>
                  setInputFocuses((current) => ({ ...current, [name]: "" }))
                }
              >
                <option placeholder="true">{"Select " + label}</option>
                {options?.map(({ name, label }, y) => (
                  <option defaultValue={name} key={y}>
                    {label || name}
                  </option>
                ))}
              </Input>
            </InputGroup>
          </FormGroup>
        )
      )}

      <Button
        className="mt-3"
        color={light ? "white" : "primary"}
        type="submit"
      >
        {submitLabel}
      </Button>
    </Form>
  );
};

export default FormComp;
