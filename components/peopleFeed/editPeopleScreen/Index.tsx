import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";

const PeopleScreen = styled(motion.div)`
  width: 60vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 105;
  background-color: ${variables.lightGrey};
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
  // return (
  // <PeopleScreen {...motionPropsRight}>
  //   <p onClick={showEditScreenHandler}>
  //     {person?.enteredfirstName} {person?.enteredLastName}
  //   </p>
  // </PeopleScreen>

  // const handleFirstNameChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setUpdatedPerson((prevState) => ({
  //     ...prevState,
  //     enteredfirstName: event.target.value,
  //   }));
  // };

  // const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUpdatedPerson((prevState) => ({
  //     ...prevState,
  //     enteredLastName: event.target.value,
  //   }));
  // };

  // const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUpdatedPerson((prevState) => ({
  //     ...prevState,
  //     enteredAge: event.target.value,
  //   }));
  // };

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

  // const handleCancel = () => {
  //   onCancel();
  // };
  return (
    <PeopleScreen {...motionPropsRight}>
      <label>
        First Name:
        <input
          type="text"
          value={updatedPerson.firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={updatedPerson.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="text"
          value={updatedPerson.age}
          onChange={(e) => handleInputChange(e, "age")}
        />
      </label>
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
      <button onClick={() => setShowEditScreen(!showEditScreen)}>Cancel</button>
    </PeopleScreen>
  );
}

export default EditPeopleScreen;
