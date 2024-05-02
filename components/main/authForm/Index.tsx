import React, { useState } from "react";
import styled from "styled-components";
import ToggleFormButton from "./ToggleFormButton";
import { createUser } from "./utility";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";
import { Container } from "@/styles/Utilities";
import { h2styles } from "@/styles/Type";

const AuthContainer = styled.div`
  width: 100%;
  background-color: ${variables.darkBlue};
  height: 100dvh;

  button.toggleForm {
  }
  @media ${MediaQueries.mobile} {
    height: 100dvh;
  }
`;

export default function AuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [toggleSignUpForm, setToggleSignUpForm] = useState(true);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const firstnameInputRef = React.useRef<HTMLInputElement>(null);
  const lastnameInputRef = React.useRef<HTMLInputElement>(null);
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  //signin
  const identifierInputRef = React.useRef<HTMLInputElement>(null);
  const [userMessage, setUserMessage] = useState("");

  const toggleForm = () => {
    setToggleSignUpForm((prevState) => !prevState);
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!toggleSignUpForm) {
      //create user
      const enteredEmail = emailInputRef.current?.value;
      const enteredFirstname = firstnameInputRef.current?.value;
      const enteredLastname = lastnameInputRef.current?.value;
      const enteredUsername = usernameInputRef.current?.value;
      const enteredPassword = passwordInputRef.current?.value;
      const enteredConfirmPassword = confirmPasswordRef.current?.value;

      /* 
                validate fields are not null and that the entered passwords match
                All other validation like email @ signs pass restrictions are done on /auth/signup
            */
      if (
        enteredPassword &&
        enteredUsername &&
        enteredPassword == enteredConfirmPassword
      ) {
        try {
          const result = await createUser(
            enteredUsername,
            enteredEmail,
            enteredPassword,
            enteredFirstname,
            enteredLastname
          );

          console.log(result, "RESULT CREATE USER");

          if (result.status === 201) {
            const result = await signIn("credentials", {
              redirect: false,
              identifier: enteredUsername,
              password: enteredPassword,
            });

            if (!result?.error) {
              router.replace("/auth/timeline");
            }

            if (result && result.error) {
              // setLoading(false);
              window.alert(result!.error);
            }
          }
          console.log(result, "RESULT");
          setUserMessage("User created successfully");
          // setToggleSignUpForm((prevState) => !prevState);
        } catch (error) {
          let message = "Unknown Error";
          if (error instanceof Error) message = error.message;
          console.log(message, "MESSAGE ERROR");
          setUserMessage(message);
          // throw new Error(message);
        }
      } else {
        if (!enteredUsername) {
          setUserMessage("Please enter a username");
        }
        if (enteredPassword !== enteredConfirmPassword) {
          setUserMessage("Passwords do not match");
        }
      }
    } else {
      //signin user
      const enteredIdentifier = identifierInputRef.current?.value;
      const enteredPassword = passwordInputRef.current?.value;

      const result = await signIn("credentials", {
        redirect: false,
        identifier: enteredIdentifier,
        password: enteredPassword,
      });

      if (!result?.error) {
        router.replace("/auth/timeline");
      }
    }
  };

  return (
    <AuthContainer>
      {!toggleSignUpForm ? (
        <SignUpForm
          userMessage={userMessage}
          toggleForm={toggleForm}
          firstnameInputRef={firstnameInputRef}
          lastnameInputRef={lastnameInputRef}
          submitHandler={submitHandler}
          emailInputRef={emailInputRef}
          usernameInputRef={usernameInputRef}
          passwordInputRef={passwordInputRef}
          confirmPasswordRef={confirmPasswordRef}
        />
      ) : (
        <SignInForm
          identifierInputRef={identifierInputRef}
          passwordInputRef={passwordInputRef}
          submitHandler={submitHandler}
          toggleForm={toggleForm}
        />
      )}
    </AuthContainer>
  );
}
