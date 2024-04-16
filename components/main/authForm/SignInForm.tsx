import styled from "styled-components";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType, formStyles } from "@/styles/Type";

const Form = styled.form`
  ${formStyles}

  button {
    ${buttonType}
  }
`;

interface signInFormProps {
  submitHandler: (event: React.SyntheticEvent) => void;
  identifierInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
}

export default function SignInForm({
  submitHandler,
  identifierInputRef,
  passwordInputRef,
}: signInFormProps) {
  return (
    <Form>
      <h2>Sign in</h2>
      <TextInput
        name="identifier"
        placeholder="Username or Email"
        required={true}
        ref={identifierInputRef}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        ref={passwordInputRef}
      />
      <button className="submit" onClick={submitHandler}>
        Sign In
      </button>
    </Form>
  );
}
