import React, { useState, useContext, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType } from "@/styles/Type";
import UploadFileInputEdit from "@/components/reusable/formFields/uploadFileInputEdit/Index";
import { useRouter } from "next/router";
import { inputType } from "@/styles/Type";

const PeopleScreen = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 88px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
`;

const Form = styled.form`
  button {
    ${buttonType}
    margin-bottom: 4px;
  }
`;

const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  img {
    width: 200px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  gap: 40px;
  grid-column: 1 / span 2;
  /* flex-direction: column; */
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 40px;
  grid-column: 1 / span 2;
`;

const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 40px;
  grid-column: 1 / span 2;
  /* flex-direction: column; */
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

const LabelInputContainer = styled.div`
  /* justify-content: center; */
  display: flex;
  width: 100%;
  flex-direction: column;
  label {
    color: ${variables.black};
  }
  input,
  select {
    ${inputType}
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 20px;
  display: flex;
  gap: 20px;
  button {
    ${buttonType}
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
  death?: string;
  twitterLink?: string;
  facebookLink?: string;
  linkedinLink?: string;
  uploadDatas?: { [key: number]: string[] };
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
  const [selectedAge, setSelectedAge] = useState<number>(0); // Track selected age
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]); // Age options

  console.log(updatedPerson, "updatedPerson");

  useEffect(() => {
    if (person) {
      setUpdatedPerson({ ...person });

      if (person && person.dob) {
        // Parse the dob string into a Date object
        const selectedDate = new Date(person.dob);
        const today = new Date();
        const diffYears = today.getFullYear() - selectedDate.getFullYear();

        // Generate options for dropdown starting from the selected age
        const initialAge =
          selectedDate.getFullYear() !== today.getFullYear() ? diffYears : 0; // Set initial age based on the selected date
        const ageOptions = Array.from(
          { length: diffYears + 1 },
          (_, index) => ({
            value: index,
            label:
              index === 0
                ? `Born (Year: ${selectedDate.getFullYear()})`
                : `Age ${index} (Year ${selectedDate.getFullYear() + index})`,
          })
        );

        setSelectedAge(initialAge); // Set initial selected age
        setAgeOptions(ageOptions);
      }
    }
  }, [person]);

  const handleRemoveImage = async (
    imageUrlToDelete: string,
    imageIndex: number,
    e: any
  ) => {
    // Create a copy of the updatedPerson
    const newUpdatedPerson = { ...updatedPerson };

    // Remove the image URL from uploadDatas array for the selectedAge
    if (newUpdatedPerson.uploadDatas && selectedAge !== null) {
      newUpdatedPerson.uploadDatas[selectedAge].splice(imageIndex, 1);
    }

    try {
      // Make a POST request to the deleteImage API route
      const response = await fetch("/api/deleteImage/deleteImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrlToDelete }),
      });

      if (response.ok) {
        // Image deletion was successful
        console.log("Image deleted successfully");
      } else {
        // Handle error response from the API route
        console.error("Failed to delete image:", response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error deleting image:", error);
    }
    // }

    // Update the updatedPerson state
    setUpdatedPerson(newUpdatedPerson);
  };

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = new Date(event.target.value);

    const today = new Date();
    const diffYears = today.getFullYear() - selectedDate.getFullYear();
    console.log(diffYears, "selectedData");
    // Generate options for dropdown starting from the selected age
    const ageOptions = Array.from({ length: diffYears + 1 }, (_, index) => ({
      value: index,
      label:
        index === 0
          ? `Born (Year: ${selectedDate.getFullYear()})`
          : `Age ${index} (Year ${selectedDate.getFullYear() + index})`,
    }));

    setSelectedAge(selectedAge); // Reset selected age
    setAgeOptions(ageOptions);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const age = parseInt(event.target.value);
    console.log(age, "AGE");
    setSelectedAge(age);
    // if (!(age in uploadDatas)) {
    //   setUploadDatas((prevUploadDatas) => ({
    //     ...prevUploadDatas,
    //     [age]: [],
    //   }));
    // }
  };

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
        <PeopleScreen>
          <Form onSubmit={(e) => handleSave(e)}>
            <FormInnerContainer>
              <NameContainer>
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
              </NameContainer>
              <SocialMediaContainer>
                <TextInput
                  label="Twitter"
                  type="text"
                  value={updatedPerson.twitterLink}
                  onChange={(e: any) => handleInputChange(e, "twitterLink")}
                />
                <TextInput
                  label="Linkedin"
                  type="text"
                  value={updatedPerson.linkedinLink}
                  onChange={(e: any) => handleInputChange(e, "linkedinLink")}
                />
                <TextInput
                  label="Facebook"
                  type="text"
                  value={updatedPerson.facebookLink}
                  onChange={(e: any) => handleInputChange(e, "facebookLink")}
                />
              </SocialMediaContainer>
              <DatesContainer>
                <LabelInputContainer>
                  <label>
                    Age:
                    <input
                      type="date"
                      value={updatedPerson.dob}
                      onChange={(e) => {
                        handleInputChange(e, "dob");
                        handleDateOfBirthChange(e);
                      }}
                    />
                  </label>
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>
                    Death:
                    <input
                      type="date"
                      value={updatedPerson.death}
                      onChange={(e) => {
                        handleInputChange(e, "death");
                        // handleDateOfBirthChange(e);
                      }}
                    />
                  </label>
                </LabelInputContainer>
              </DatesContainer>
              <LabelInputContainer>
                <label htmlFor="age">Select Age</label>
                <select id="age" onChange={handleAgeChange} value={selectedAge}>
                  {ageOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </LabelInputContainer>

              {/* Render the UploadFileInputEdit component passing existing uploadDatas */}
              <UploadFileInputEdit
                selectedAge={selectedAge}
                onUpload={(selectedAge: number, newUploadDatas: string[]) =>
                  setUpdatedPerson((prevState) => {
                    // Create a copy of the previous state
                    const newState = { ...prevState };

                    // Retrieve existing uploadDatas or initialize as an empty object
                    const existingUploadDatas = newState.uploadDatas || {};

                    // Retrieve existing uploadDatas for the selected age or initialize as an empty array
                    const existingUploadDatasForAge =
                      existingUploadDatas[selectedAge] || [];

                    // Concatenate existing uploadDatas with the newUploadDatas
                    const updatedUploadDatasForAge = [
                      ...existingUploadDatasForAge,
                      ...newUploadDatas,
                    ];

                    // Update the uploadDatas object with the updated array for the selected age
                    newState.uploadDatas = {
                      ...existingUploadDatas,
                      [selectedAge]: updatedUploadDatasForAge,
                    };

                    return newState; // Return the updated state
                  })
                }
              />
              <ImageGridContainer>
                {person &&
                  person.uploadDatas &&
                  selectedAge !== null &&
                  Array.isArray(person.uploadDatas[selectedAge]) &&
                  person.uploadDatas[selectedAge].map(
                    (image: string, index: number) => {
                      return (
                        <ImageContainer>
                          <img src={image} />
                          <button
                            onClick={(e) => handleRemoveImage(image, index, e)}
                          >
                            x
                          </button>
                        </ImageContainer>
                      );
                    }
                  )}
              </ImageGridContainer>
              <ButtonContainer>
                <button type="submit">Preview</button>
                <button type="submit">Save</button>
              </ButtonContainer>
            </FormInnerContainer>
          </Form>
        </PeopleScreen>
      )}
    </>
  );
}

export default EditPeopleScreen;
// export default EditPeopleScreen;
