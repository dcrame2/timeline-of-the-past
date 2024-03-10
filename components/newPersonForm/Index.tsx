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
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 105;
  background-color: black;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LabelInputContainer = styled.div`
  /* justify-content: center; */
  display: flex;
`;

function NewPersonForm({
  fetchData,
  setShowAddPersonFields,
  showAddPersonFields,
}: any) {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const imagesRef = React.useRef<HTMLInputElement>(null);
  const middleNameRef = React.useRef<HTMLInputElement>(null);
  const dobRef = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);

  console.log(image, "IMAGE");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const submitNewPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const age = ageRef.current?.value;
    const images = imagesRef.current?.files?.[0];
    const middleName = middleNameRef.current?.value;
    const dob = dobRef.current?.value;
    console.log(firstName, lastName, age, images, middleName, dob);

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
        firstName,
        lastName,
        middleName,
        age,
        dob,
        images,
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
      // x: "100%",
    },
    animate: {
      // x: 0,
      opacity: 1,
    },
    exit: {
      // x: "100%",
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
          name="middleName"
          label="Middle Name"
          placeholder="George"
          type="text"
          ref={middleNameRef}
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
        <LabelInputContainer>
          <label htmlFor="start">Date of Birth</label>

          <input
            type="date"
            id="start"
            name="trip-start"
            // value="2018-07-22"
            min="1900-01-01"
            max="2030-12-31"
            ref={dobRef}
          />
        </LabelInputContainer>

        {/* TODO: Look into Middleware Multer for file upload / can start off with localhost and maybe move to cloudinary  */}
        <LabelInputContainer>
          <label htmlFor="images">Upload Image</label>
          <input
            name="image"
            // label="Images"
            // placeholder="21"
            onChange={onChangeHandler}
            type="file"
            id="images"
            // ref={imagesRef}
          />
        </LabelInputContainer>
        <button type="submit">Submit New Person</button>
      </Form>
    </FormContainer>
  );
}

export default NewPersonForm;
