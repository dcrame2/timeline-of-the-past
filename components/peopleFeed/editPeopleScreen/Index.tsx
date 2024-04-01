import React, { useState, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType, linkStyles } from "@/styles/Type";
import UploadFileInputEdit from "@/components/reusable/formFields/uploadFileInputEdit/Index";
import { useRouter } from "next/router";
import { inputType } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import Link from "next/link";

const PeopleScreen = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 88px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.mobile} {
    padding: 88px 24px;
  }
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

const LinkContainer = styled.div`
  color: ${variables.black};
  a {
    ${linkStyles}
  }
`;

const NameContainer = styled.div`
  display: flex;
  gap: 40px;
  grid-column: 1 / span 2;
  @media ${MediaQueries.mobile} {
    flex-direction: column;
    gap: 12px;
  }
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
  @media ${MediaQueries.mobile} {
    flex-direction: column;
    gap: 12px;
  }
`;

const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / span 2;
  gap: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: ${variables.lightGrey};
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
    object-fit: contain;
  }
`;

const LabelInputContainer = styled.div`
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

  input[type="color"] {
    padding: 0px 10px;
    height: 100%;
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

const ImageUploadedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: 1 / span 2;
`;

const MainFormContainer = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
  border-bottom: 2px solid ${variables.lightBlue};
  @media ${MediaQueries.mobile} {
    gap: 12px;
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
  color?: string;
  death?: string;
  twitterLink?: string;
  facebookLink?: string;
  linkedinLink?: string;
  uploadDatas?: { [key: number]: string[] };
  slug?: string;
  font?: string;
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
  const [updatedPerson, setUpdatedPerson] = useState<PeopleProps>({
    ...person,
  });
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState<number>(0); // Track selected age
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]); // Age options
  const [font, setFont] = useState(updatedPerson.font);
  const maxDate = new Date().toISOString().split("T")[0];

  console.log(updatedPerson, "updatedPerson");

  const fontOptions = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
    { label: "Helvetica", value: "Helvetica, sans-serif" },
    { label: "Palatino", value: "Palatino, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Book Antiqua", value: "Book Antiqua, serif" },
    { label: "Arial Black", value: "Arial Black, sans-serif" },
    { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
    { label: "Impact", value: "Impact, fantasy" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode, sans-serif" },
    { label: "Lucida Console", value: "Lucida Console, monospace" },
    { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
    { label: "Geneva", value: "Geneva, sans-serif" },
    { label: "Copperplate", value: "Copperplate, fantasy" },
    { label: "Brush Script MT", value: "Brush Script MT, cursive" },
    { label: "Optima", value: "Optima, sans-serif" },
  ];

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
    e.preventDefault();
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

    setSelectedAge(selectedAge);
    setAgeOptions(ageOptions);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const age = parseInt(event.target.value);
    console.log(age, "AGE");
    setSelectedAge(age);
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

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    propertyName: string
  ) => {
    event.preventDefault();
    if (updatedPerson) {
      setUpdatedPerson((prevState) => ({
        ...prevState,
        [propertyName]: event.target.value,
      }));
    }
    setFont(event.target.value);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle the case where updatedPerson is null
    if (!updatedPerson) {
      return;
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
      {person && (
        <PeopleScreen>
          <Form onSubmit={(e) => handleSave(e)}>
            <FormInnerContainer>
              <LinkContainer>
                {`URL: `}
                <Link
                  target="_blank"
                  href={`https://timelinethat.com${person.slug}`}
                >
                  https://timelinethat.com{person.slug}
                </Link>
              </LinkContainer>
              <MainFormContainer>
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
                <DatesContainer>
                  <LabelInputContainer>
                    <label>
                      Age:
                      <input
                        type="date"
                        min="1900-01-01"
                        max={maxDate}
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
                        }}
                      />
                    </label>
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <label>
                      Theme Color:
                      <input
                        type="color"
                        value={updatedPerson.color}
                        onChange={(e) => {
                          handleInputChange(e, "color");
                        }}
                      />
                    </label>
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <label htmlFor="font-family">Theme Font:</label>
                    <select
                      id="font-family"
                      value={font}
                      onChange={(e) => {
                        handleSelectChange(e, "font");
                      }}
                      style={{ fontFamily: font }}
                    >
                      <option value="">Select Font</option>
                      {fontOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </LabelInputContainer>
                </DatesContainer>
                {/* <SocialMediaContainer>
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
                </SocialMediaContainer> */}
              </MainFormContainer>
              <ImageUploadedContainer>
                <LabelInputContainer>
                  <label htmlFor="age">Select Age</label>
                  <select
                    id="age"
                    onChange={handleAgeChange}
                    value={selectedAge}
                  >
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
                  updatedPerson={updatedPerson}
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
                      // Return the updated state
                      return newState;
                    })
                  }
                />
                <ImageGridContainer>
                  {person &&
                    updatedPerson.uploadDatas &&
                    selectedAge !== null &&
                    Array.isArray(updatedPerson.uploadDatas[selectedAge]) &&
                    updatedPerson.uploadDatas[selectedAge].map(
                      (src: string, index: number) => {
                        return (
                          <ImageContainer>
                            <img src={src} />
                            <button
                              onClick={(e) => handleRemoveImage(src, index, e)}
                            >
                              x
                            </button>
                          </ImageContainer>
                        );
                      }
                    )}
                </ImageGridContainer>
              </ImageUploadedContainer>

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
