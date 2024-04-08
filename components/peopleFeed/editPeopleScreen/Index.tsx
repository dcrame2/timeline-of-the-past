import React, { useState, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { buttonType, linkStyles, h2styles, pXSmall } from "@/styles/Type";
import UploadFileInputEdit from "@/components/reusable/formFields/uploadFileInputEdit/Index";
import { useRouter } from "next/router";
import { inputType } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import Link from "next/link";
import { themeData } from "@/themes/themeData";

const Form = styled.form`
  button {
    /* ${buttonType} */
    margin-bottom: 4px;
  }
`;

const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  /* img {
    width: 200px;
  } */
`;

const LinkContainer = styled.div`
  color: ${variables.black};
  a {
    ${linkStyles}
  }
`;

const NameContainer = styled.div`
  display: flex;
  gap: 12px;
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
  gap: 12px;
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
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ImageWithCaption = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  /* flex: 1; */
  background-color: ${variables.lightGrey};
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  min-height: 250px;
  ${h2styles}
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
    /* max-width: 200px; */
    width: 100%;
    object-fit: cover;
  }
`;

const ThemeInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
  padding-bottom: 30px;
  border-bottom: 2px solid ${variables.lightBlue};
  @media ${MediaQueries.mobile} {
    flex-direction: column;
  }
`;

const NumberContainer = styled.div`
  flex: 1;
  background-color: ${variables.lightGrey};
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  ${h2styles}
`;

const LabelInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  label {
    ${pXSmall}
    color: ${variables.black};
  }
  input {
    ${inputType}
  }
  select {
    ${inputType}
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
      no-repeat 95% 50%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
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
    min-height: 42px;
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
  theme?: number;
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
  const [theme, setTheme] = useState(updatedPerson.theme);
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

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    propertyName: string
  ) => {
    event.preventDefault();
    if (updatedPerson) {
      setUpdatedPerson((prevState) => ({
        ...prevState,
        [propertyName]: +event.target.value,
      }));
    }
    setTheme(+event.target.value);
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
              <ThemeInfoContainer>
                <LabelInputContainer>
                  <label htmlFor="color">Theme Color</label>
                  <input
                    type="color"
                    id="color"
                    value={updatedPerson.color}
                    onChange={(e) => {
                      handleInputChange(e, "color");
                    }}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label htmlFor="font-family">Theme Font</label>
                  <select
                    id="font-family"
                    value={font}
                    onChange={(e) => {
                      handleSelectChange(e, "font");
                    }}
                    style={{ fontFamily: font }}
                  >
                    {fontOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </LabelInputContainer>
                <LabelInputContainer>
                  <label htmlFor="themes">Theme</label>
                  <select
                    id="themes"
                    value={theme}
                    onChange={(e) => {
                      handleThemeChange(e, "theme");
                    }}
                  >
                    {themeData.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </LabelInputContainer>
              </ThemeInfoContainer>
              <NameContainer>
                <TextInput
                  label="First Name*"
                  type="text"
                  value={updatedPerson.firstName}
                  onChange={(e: any) => handleInputChange(e, "firstName")}
                  required
                />
                <TextInput
                  label="Middle Name"
                  type="text"
                  value={updatedPerson.middleName}
                  onChange={(e: any) => handleInputChange(e, "middleName")}
                />
                <TextInput
                  label="Last Name*"
                  type="text"
                  value={updatedPerson.lastName}
                  onChange={(e: any) => handleInputChange(e, "lastName")}
                  required
                />
              </NameContainer>
              <DatesContainer>
                <LabelInputContainer>
                  <label>Date of Birth*</label>
                  <input
                    type="date"
                    min="1900-01-01"
                    max={maxDate}
                    value={updatedPerson.dob}
                    onChange={(e) => {
                      handleInputChange(e, "dob");
                      handleDateOfBirthChange(e);
                    }}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>Death (Optional)</label>
                  <input
                    type="date"
                    value={updatedPerson.death}
                    onChange={(e) => {
                      handleInputChange(e, "death");
                    }}
                  />
                </LabelInputContainer>
              </DatesContainer>
            </MainFormContainer>
            <ImageUploadedContainer>
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
                        <ImageWithCaption>
                          <ImageContainer>
                            <img src={src} />
                            <button
                              onClick={(e) => handleRemoveImage(src, index, e)}
                            >
                              x
                            </button>
                          </ImageContainer>
                        </ImageWithCaption>
                      );
                    }
                  )}
                {person &&
                  updatedPerson.uploadDatas &&
                  selectedAge !== null &&
                  // Array.isArray(updatedPerson.uploadDatas[selectedAge]) &&
                  [
                    ...Array(
                      Math.max(
                        0,
                        4 -
                          (updatedPerson?.uploadDatas[selectedAge]?.length || 0)
                      )
                    ),
                  ].map((_, index) => (
                    <ImageWithCaption>
                      <NumberContainer key={index}>{index + 1}</NumberContainer>
                    </ImageWithCaption>
                  ))}
              </ImageGridContainer>
            </ImageUploadedContainer>

            <ButtonContainer>
              {/* <button type="submit">Preview</button> */}
              <button type="submit">Save</button>
            </ButtonContainer>
          </FormInnerContainer>
        </Form>
      )}
    </>
  );
}

export default EditPeopleScreen;
