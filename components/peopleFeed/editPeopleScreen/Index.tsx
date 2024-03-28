import React, { useState, useContext, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType } from "@/styles/Type";
import UploadFileInputEdit from "@/components/reusable/formFields/uploadFileInputEdit/Index";
import { useRouter } from "next/router";

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

const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: ${variables.white};
    color: black;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 200px;
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
  uploadDatas?: string[] | undefined;
}

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

function EditPeopleScreen({
  person,
  selectedIndex,
  setReceivedPersonData,
}: {
  person: PeopleProps | null;
  selectedIndex: any;
  setReceivedPersonData: any;
}) {
  const [updatedPerson, setUpdatedPerson] = useState<PeopleProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (person) {
      setUpdatedPerson({ ...person });
    }
  }, [person]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    event.preventDefault();
    if (updatedPerson) {
      setUpdatedPerson((prevState) => ({
        ...prevState,
        [propertyName]: event.target.value,
      }));
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedPerson) {
      return; // Handle the case where updatedPerson is null
    }

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;

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

    if (response.ok) {
      router.push("/auth/timeline");
      setReceivedPersonData(false);
    } else {
      console.error("Failed to save data");
    }
  };

  return (
    <>
      {updatedPerson && ( // Render the form only when updatedPerson is not null
        <Form onSubmit={(e) => handleSave(e)}>
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
            label="Age:"
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
          <ImageGridContainer>
            {person?.uploadDatas?.map((image: string) => {
              return (
                <ImageContainer>
                  <img src={image} />
                  <button>x</button>
                </ImageContainer>
              );
            })}
          </ImageGridContainer>
          {/* Render the UploadFileInputEdit component passing existing uploadDatas */}
          <UploadFileInputEdit
            onUpload={(newUploadDatas: any) =>
              setUpdatedPerson((prevState) => ({
                ...prevState,
                uploadDatas: [
                  ...(prevState?.uploadDatas || []), // Include existing uploadDatas if any
                  ...newUploadDatas, // Add newly uploaded URLs
                ],
              }))
            }
          />

          <button type="submit">Save</button>
        </Form>
      )}
    </>
  );
}

export default EditPeopleScreen;
// export default EditPeopleScreen;
