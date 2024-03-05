import React, { useState } from "react";
import styled from "styled-components";
import ToggleFormButton from "./ToggleFormButton";
import { createUser } from "./utility";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Image from "next/image";

const Container = styled.div`
  height: 100vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: black;
  button.toggleForm {
  }
`;

const IntialSignInContainer = styled.div`
  width: 40%;
`;
const MainImageContainer = styled.div`
  width: 60%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100vh;
  }
`;

export default function AuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [toggleSignUpForm, setToggleSignUpForm] = useState(true);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
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
            enteredPassword
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
        router.replace("/auth/protected");
      }
    }
  };

  return (
    <Container>
      <IntialSignInContainer>
        {!toggleSignUpForm ? (
          <SignUpForm
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
      </IntialSignInContainer>
      {/* <MainImageContainer>
        <Image
          src="/main_image.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </MainImageContainer> */}
    </Container>
  );
}
