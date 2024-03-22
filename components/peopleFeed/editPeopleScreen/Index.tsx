import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType } from "@/styles/Type";

const PeopleScreen = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 24px;
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
`;

const Form = styled.form`
  button {
    ${buttonType}
    margin-bottom: 4px;
  }
`;

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

interface PeopleProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  age?: string;
  dob?: string;
}

function EditPeopleScreen({
  showEditScreen,
  showEditScreenHandler,
  person,
  selectedIndex,
  setShowEditScreen,
  fetchData,
}: {
  showEditScreen: boolean;
  showEditScreenHandler: (person: PeopleProps, index: number) => void;
  person: PeopleProps | null;
  selectedIndex: number;
  setShowEditScreen: any;
  fetchData: any;
}) {
  const [updatedPerson, setUpdatedPerson] = useState<PeopleProps>({
    ...person,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    setUpdatedPerson((prevState) => ({
      ...prevState,
      [propertyName]: event.target.value,
    }));
  };

  const handleSave = async () => {
    // onSave(updatedPerson);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    const response = await fetch("/api/people/update-people", {
      method: "POST",
      body: JSON.stringify({
        sessionUserEmail,
        updatedPerson,
        selectedIndex,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "Response");

    fetchData();
  };

  return (
    <PeopleScreen {...motionPropsRight}>
      <Form>
        <TextInput
          label="First Name:"
          type="text"
          value={updatedPerson.firstName}
          onChange={(e: any) => handleInputChange(e, "firstName")}
        />
        <TextInput
          label="Middle Name:"
          type="text"
          value={updatedPerson.middleName}
          onChange={(e: any) => handleInputChange(e, "middleName")}
        />

        <TextInput
          label="Last Name:"
          type="text"
          value={updatedPerson.lastName}
          onChange={(e: any) => handleInputChange(e, "lastName")}
        />

        <TextInput
          label=" Age:"
          type="text"
          value={updatedPerson.age}
          onChange={(e: any) => handleInputChange(e, "age")}
        />

        <label>
          Age:
          <input
            type="date"
            value={updatedPerson.dob}
            onChange={(e) => handleInputChange(e, "dob")}
          />
        </label>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setShowEditScreen(!showEditScreen)}>
          Cancel
        </button>
      </Form>
    </PeopleScreen>
  );
}

export default EditPeopleScreen;
