import styled from "styled-components";
import TextInput from "@/components/reusable/formFields/TextInput1";
import { buttonType, formStyles } from "@/styles/Type";
const Form = styled.form`
  ${formStyles}

  button {
    ${buttonType}
  }
`;

interface signUpFormProps {
  submitHandler: (event: React.SyntheticEvent) => void;
  emailInputRef: React.RefObject<HTMLInputElement>;
  usernameInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  firstnameInputRef: React.RefObject<HTMLInputElement>;
  lastnameInputRef: React.RefObject<HTMLInputElement>;
}

export default function SignUpForm({
  submitHandler,
  emailInputRef,
  usernameInputRef,
  passwordInputRef,
  confirmPasswordRef,
  firstnameInputRef,
  lastnameInputRef,
}: signUpFormProps) {
  return (
    <Form>
      <h2>Sign up</h2>
      <TextInput
        name="firstname"
        placeholder="First name"
        required={true}
        ref={firstnameInputRef}
      />
      <TextInput
        name="lastname"
        placeholder="Last name"
        required={true}
        ref={lastnameInputRef}
      />
      <TextInput
        name="email"
        placeholder="Email"
        required={true}
        ref={emailInputRef}
      />

      <TextInput
        name="username"
        placeholder="Username"
        required={true}
        ref={usernameInputRef}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        ref={passwordInputRef}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required={true}
        ref={confirmPasswordRef}
      />
      <button onClick={submitHandler} className="submit">
        Sign Up
      </button>
    </Form>
  );
}
