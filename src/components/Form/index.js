import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

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
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValues);
      }}
    >
      <h4 className={(light ? "text-white" : "text-primary") + " mb-4"}>
        {label}
      </h4>

      {inputs.map(
        (
          { name, label, icon, type = "text", required, options, minLength },
          i
        ) => (
          <FormGroup className={"mb-3 w-100 " + inputFocuses[name]} key={i}>
            <InputGroup className="input-group-alternative">
              <InputGroupText>
                <i className={icon} />
              </InputGroupText>

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

      <ButtonGroup>
        <Button
          className="my-3"
          color={light ? "white" : "primary"}
          type="submit"
        >
          {submitLabel}
        </Button>

        <BackButton />
      </ButtonGroup>
    </Form>
  );
};

export default FormComp;
