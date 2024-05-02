import styled from "styled-components";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType, formStyles } from "@/styles/Type";

import { SlimLayout } from "@/mainWebsite2/components/SlimLayout";
import { Button } from "@nextui-org/react";
import { Logo } from "@/mainWebsite2/components/Logo";
import Link from "next/link";
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
  toggleForm: () => void;
  userMessage: string;
}

export default function SignUpForm({
  submitHandler,
  emailInputRef,
  usernameInputRef,
  passwordInputRef,
  confirmPasswordRef,
  firstnameInputRef,
  lastnameInputRef,
  toggleForm,
  userMessage,
}: signUpFormProps) {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <Link
          onClick={toggleForm}
          href="/auth/authenticate"
          className="font-medium text-lightOrange hover:underline"
        >
          Sign in
        </Link>{" "}
        to your account.
      </p>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextInput
          name="firstname"
          placeholder="Dylan"
          label="First name*"
          required={true}
          ref={firstnameInputRef}
        />
        <TextInput
          name="lastname"
          label="Last name*"
          placeholder="Cramer"
          required={true}
          ref={lastnameInputRef}
        />
        <TextInput
          name="email"
          label="Email address*"
          placeholder="email@email.com"
          required={true}
          ref={emailInputRef}
        />
        <TextInput
          name="username"
          label="Username*"
          placeholder="Username"
          required={true}
          ref={usernameInputRef}
        />
        <TextInput
          type="password"
          name="password"
          label="Password*"
          placeholder="Password"
          required={true}
          ref={passwordInputRef}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          label="Confirm Password*"
          placeholder="Confirm Password"
          required={true}
          ref={confirmPasswordRef}
        />

        <div className="col-span-full">
          <Button
            onClick={submitHandler}
            className="submit w-full bg-lightOrange text-white"
            type="submit"
            variant="solid"
          >
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
        {userMessage && <p className="col-span-full text-red">{userMessage}</p>}
      </form>
    </SlimLayout>
  );
}
