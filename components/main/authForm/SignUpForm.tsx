import styled from "styled-components";
import TextInput from "@/components/reusable/formFields/TextInput";

const Form = styled.form``;

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
        label="First name"
        required={true}
        ref={firstnameInputRef}
      />
      <TextInput
        name="lastname"
        label="Last name"
        required={true}
        ref={lastnameInputRef}
      />
      <TextInput
        name="email"
        label="Email"
        required={true}
        ref={emailInputRef}
      />

      <TextInput
        name="username"
        label="Username"
        required={true}
        ref={usernameInputRef}
      />
      <TextInput
        type="password"
        name="password"
        label="Password"
        required={true}
        ref={passwordInputRef}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        required={true}
        ref={confirmPasswordRef}
      />
      <button onClick={submitHandler} className="submit">
        Sign Up
      </button>
    </Form>
  );
}
