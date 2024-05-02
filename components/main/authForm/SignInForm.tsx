import styled from "styled-components";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType, formStyles } from "@/styles/Type";
import { Button } from "@nextui-org/react";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { SlimLayout } from "@/mainWebsite2/components/SlimLayout";
import { Logo } from "@/mainWebsite2/components/Logo";

interface signInFormProps {
  submitHandler: (event: React.SyntheticEvent) => void;
  identifierInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  toggleForm: () => void;
}

export default function SignInForm({
  submitHandler,
  identifierInputRef,
  passwordInputRef,
  toggleForm,
}: signInFormProps) {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link
          href="/auth/authenticate"
          className="font-medium text-lightOrange hover:underline"
          onClick={toggleForm}
        >
          Sign up
        </Link>{" "}
        for a free trial.
      </p>
      <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextInput
          name="identifier"
          placeholder="Username or Email"
          label="Username or Email"
          required={true}
          ref={identifierInputRef}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          required={true}
          ref={passwordInputRef}
        />
        <div>
          <Button
            // as={Link}
            type="submit"
            onClick={submitHandler}
            className="w-full text-white bg-lightOrange"
          >
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
    // <Form>
    //   <h2>Sign in</h2>
    //   <TextInput
    //     name="identifier"
    //     placeholder="Username or Email"
    //     required={true}
    //     ref={identifierInputRef}
    //   />
    //   <TextInput
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //     required={true}
    //     ref={passwordInputRef}
    //   />
    //   <Button
    //     style={{
    //       backgroundColor: `${variables.lightOrange}`,
    //       color: `${variables.white}`,
    //     }}
    //     // as={Link}
    //     className="submit"
    //     onClick={submitHandler}
    //   >
    //     Sign In
    //   </Button>
    // </Form>
  );
}
