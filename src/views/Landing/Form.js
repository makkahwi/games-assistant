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
    <Form>
      <h4 className={light ? "text-white" : "text-dark"}>{label}</h4>

      {inputs.map(({ name, label, icon, type = "text", required }, i) => (
        <FormGroup className={"mb-3 " + inputFocuses[name]} key={i}>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={icon}></i>
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
            />
          </InputGroup>
        </FormGroup>
      ))}

      <Button
        className="mt-3"
        color={light ? "white" : "primary"}
        onClick={() => onSubmit(inputValues)}
      >
        {submitLabel}
      </Button>
    </Form>
  );
};

export default FormComp;
