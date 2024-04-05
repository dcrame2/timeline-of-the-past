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

const AuthContainer = styled.div`
  width: 100%;
  background-color: ${variables.darkBlue};

  button.toggleForm {
  }
  @media ${MediaQueries.mobile} {
    height: 100dvh;
  }
`;

const IntialSignInContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  ${Container}
`;

const FormInfoContainer = styled.div`
  width: 40%;
  padding-top: 48px;
  padding-bottom: 48px;
  @media ${MediaQueries.tablet} {
    width: 100%;
    height: 100dvh;
  }
  @media ${MediaQueries.mobile} {
    height: 100dvh;
  }
  img {
    width: 300px;
    @media ${MediaQueries.mobile} {
      width: 200px;
    }
  }
`;

const FormInfoInnerContainer = styled.div`
  background-color: ${variables.darkerLightGrey};
  border-radius: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 50px -20px #ffffff;
  -moz-box-shadow: 0px 0px 50px -20px #ffffff;
  box-shadow: 0px 0px 50px -20px #ffffff;
`;

const MainImageContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${MediaQueries.tablet} {
    display: none;
  }

  img {
    width: 50%;
    height: 100vh;
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
        } catch (error) {
          let message = "Unknown Error";
          if (error instanceof Error) message = error.message;
          throw new Error(message);
        }
      } else {
        if (!enteredUsername) {
          window.alert("Please enter a username");
        }
        if (enteredPassword !== enteredConfirmPassword) {
          window.alert("Passwords do not match");
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
      <IntialSignInContainer>
        <FormInfoContainer>
          <FormInfoInnerContainer>
            <img src="/timeline_that_logo_blue.svg" alt="" />
            {!toggleSignUpForm ? (
              <SignUpForm
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
              />
            )}

            <ToggleFormButton
              toggleSignUpForm={toggleSignUpForm}
              onClick={toggleForm}
            />
          </FormInfoInnerContainer>
        </FormInfoContainer>
        <MainImageContainer>
          <Image
            src="/hourglass.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </MainImageContainer>
      </IntialSignInContainer>
    </AuthContainer>
  );
}
