import React, { MouseEventHandler } from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormContainer = styled(motion.div)`
  width: 60vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`;
const Form = styled.form``;

function NewPersonForm({ fetchData, setShowAddPersonFields }: any) {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const imagesRef = React.useRef<HTMLInputElement>(null);

  const submitNewPerson: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const enteredfirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    const enteredAge = ageRef.current?.value;
    const enteredImages = imagesRef.current?.value;
    console.log(enteredfirstName, enteredLastName);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        enteredfirstName,
        enteredLastName,
        enteredAge,
        enteredImages,
        sessionUserEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchData();
    setShowAddPersonFields(false);
  };

  const motionPropsRight = {
    initial: {
      opacity: 0,
      x: "100%",
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "100%",
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };

  return (
    <FormContainer {...motionPropsRight}>
      <Form>
        <TextInput
          name="firstName"
          label="First Name"
          placeholder="John"
          type="text"
          ref={firstNameRef}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          type="text"
          ref={lastNameRef}
        />
        <TextInput
          name="age"
          label="Age"
          placeholder="21"
          type="text"
          ref={ageRef}
        />
        {/* TODO: Look into Middleware Multer for file upload / can start off with localhost and maybe move to cloudinary  */}
        <TextInput
          name="images"
          label="Images"
          // placeholder="21"
          type="file"
          ref={imagesRef}
        />
        <button onClick={submitNewPerson} type="submit">
          Submit New Person
        </button>
      </Form>
    </FormContainer>
  );
}

export default NewPersonForm;
