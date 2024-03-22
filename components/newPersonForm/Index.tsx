import React, {
  MouseEventHandler,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { create } from "domain";
import axios from "axios";
import { variables } from "@/styles/Variables";
import UploadFileInput from "../reusable/formFields/uploadFileInput/Index";
import { Context } from "@/pages/_app";
import { buttonType } from "@/styles/Type";
import { useRouter } from "next/router";

const FormContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  z-index: 105;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  button {
    ${buttonType}
  }
`;

const LabelInputContainer = styled.div`
  /* justify-content: center; */
  display: flex;
`;

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

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

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const [uploadDatas, setUploadDatas] =
    useContext<[UploadDataState, SetUploadDataState]>(Context);

  console.log(image, "IMAGE");
  const router = useRouter();

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

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        middleName,
        age,
        dob,
        uploadDatas,
        sessionUserEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/auth/timeline");
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
      <Form method="post" onSubmit={submitNewPerson}>
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
        <button type="submit">Submit New Person</button>
      </Form>
      <UploadFileInput />
    </FormContainer>
  );
}

export default NewPersonForm;
