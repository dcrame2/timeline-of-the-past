import React, {
  MouseEventHandler,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { create } from "domain";
import axios from "axios";

const FormContainer = styled(motion.div)`
  width: 60vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: black;
`;
const Form = styled.form``;

function NewPersonForm({
  fetchData,
  setShowAddPersonFields,
  showAddPersonFields,
}: any) {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const imagesRef = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);

  console.log(image, "IMAGE");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const submitNewPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredfirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    const enteredAge = ageRef.current?.value;
    const enteredImages = imagesRef.current?.files?.[0];
    console.log(enteredfirstName, enteredLastName);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    // if (!image) {
    //   return;
    // }
    // const formData = new FormData();
    // formData.append("image", image);
    // console.log(formData, "FORMDATA");

    // try {
    //   const response = await fetch("/api/upload/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   console.log("Response from server:", data);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }

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
      <Form onSubmit={submitNewPerson} encType="multipart/form-data">
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
        <input
          name="image"
          // label="Images"
          // placeholder="21"
          onChange={onChangeHandler}
          type="file"
          id="images"
          // ref={imagesRef}
        />
        <button type="submit">Submit New Person</button>
      </Form>
    </FormContainer>
  );
}

export default NewPersonForm;
