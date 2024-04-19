import React, { useState, FormEvent, useEffect } from "react";
import styled from "styled-components";
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
import { uploadFileToCloudinary } from "@/lib/uploadFileToCloudinary";
import { fontOptions } from "@/lib/fonts";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";

const FormContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 0px 24px 24px;
  padding: 88px 24px 24px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  &::before {
    background-color: ${variables.lightGrey};
    content: "";
    max-width: 960px;
    width: 100%;
    top: 0;
    position: fixed;
    height: 140px;
    z-index: 1000;
    @media ${MediaQueries.tablet} {
      max-width: 90%;
    }
    @media ${MediaQueries.tablet} {
      max-width: 80%;
    }
  }

  h2 {
    color: ${variables.black};
    grid-column: 1 / span 2;
    letter-spacing: 1.5px;
  }
  @media ${MediaQueries.mobile} {
    padding: 88px 24px 24px;
    /* height: 80dvh; */
  }
`;

const Form = styled.form`
  /* max-height: 550px; */
  overflow-y: scroll;
  @media ${MediaQueries.mobile} {
    max-height: 100%;
  }
`;

const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 24px;
  @media ${MediaQueries.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const LinkContainer = styled.div`
  color: ${variables.black};
  grid-column: 1 / span 2;
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
  background-color: ${variables.lightGrey};
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
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
    /* border-radius: 50%; */
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    /* object-fit: cover; */
  }
`;

const ThemeInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
  @media ${MediaQueries.mobile} {
    flex-direction: column;
    grid-column: unset;
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

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    ${pXSmall}
  }
`;

const LabelInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  label {
    ${pXSmall}
    color: ${variables.black};
  }
  input,
  textarea {
    ${inputType}
  }
  select {
    ${inputType}
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
      no-repeat 99% 99%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  textarea {
    min-height: 150px;
  }

  input[type="date"] {
    width: 100%;
    min-height: 40px;
    -webkit-appearance: none;
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
    min-height: 40px;
    @media ${MediaQueries.mobile} {
      height: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  left: 1095px;
  top: 10vh;
  display: flex;
  width: fit-content;
  /* justify-content: space-between; */
  gap: 20px;
  z-index: 1001;
  align-items: center;

  @media (max-width: 1250px) {
    right: 50px;
    left: unset;
  }
  @media ${MediaQueries.tablet} {
    right: 50px;
    left: unset;
  }
  button {
    ${buttonType}
  }
`;

const BackButtonContainer = styled.div`
  /* position: fixed;
  left: 285px;
  top: 10vh; */
  display: flex;
  /* width: fit-content; */
  justify-content: space-between;
  gap: 4px;
  z-index: 1001;
  @media (max-width: 1250px) {
    right: 50px;
    left: unset;
  }
  @media ${MediaQueries.tablet} {
    right: 50px;
    left: unset;
  }
  a {
    ${linkStyles}
  }
  img {
    width: 12px;
  }
`;

const ImageIcon = styled.img`
  width: 20px !important;
`;

const ImageUploadedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MainFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Line = styled.hr`
  grid-column: 1 / span 2;
  height: 5px;
  background-color: ${variables.black};
`;

const MainImageUploadContainer = styled.div`
  height: 100%;
  background-color: ${variables.lightGrey};
  border-radius: 12px;
  border: 2px dashed steelblue;
  position: relative;
  transition: background-color ease-in 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${MediaQueries.mobile} {
    min-height: 200px;
  }
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    width: 20px;
  }
  &:hover {
    transition: background-color ease-in 0.3s;
    background-color: ${variables.veryLightBlue};
  }
`;

const SingleImageContainer = styled.div`
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: ${variables.white};
    color: black;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 12px;
    z-index: 5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SingleImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100%;
  object-fit: cover;
  z-index: 2;
`;

interface PeopleProps {
  mainImage?: string;
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
  uploadDatas?: { [key: number]: { images: string[]; ageText: string } };
  slug?: string;
  font?: string;
  theme?: number | string;
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
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [font, setFont] = useState(updatedPerson.font);
  const [theme, setTheme] = useState(updatedPerson.theme);
  const maxDate = new Date().toISOString().split("T")[0];

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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newUpdatedPerson = { ...updatedPerson };
    if (selectedAge !== null) {
      // Remove the image URL from uploadDatas array for the selectedAge
      if (
        newUpdatedPerson.uploadDatas &&
        newUpdatedPerson.uploadDatas[selectedAge]?.images
      ) {
        newUpdatedPerson.uploadDatas[selectedAge].images.splice(imageIndex, 1);
      }
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

  const handleAgeTextChange = (selectedAge: any, newText: string) => {
    setUpdatedPerson((prevState) => {
      const newState = { ...prevState };
      // Ensure that newState.uploadDatas is initialized as an object if it's undefined
      newState.uploadDatas = newState.uploadDatas || {};
      newState.uploadDatas[selectedAge] = {
        ...newState.uploadDatas[selectedAge],
        ageText: newText,
      };
      return newState;
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    propertyName: string
  ) => {
    // event.preventDefault();
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
    // event.preventDefault();
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

  const handleSingleRemoveImage = async (
    imageUrlToDelete: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (selectedAge !== null) {
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
          // Reset mainImage state to null
          const updatedPersonCopy = { ...updatedPerson };
          // Update the mainImage property to null
          updatedPersonCopy.mainImage = "";
          // Update the state with the modified object
          setUpdatedPerson(updatedPersonCopy);
        } else {
          // Handle error response from the API route
          console.error("Failed to delete image:", response.statusText);
        }
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error deleting image:", error);
      }
    }
  };

  const handleOnChange = async (changeEvent: any) => {
    changeEvent.preventDefault();
    const file = changeEvent.target.files[0];

    // Ensure that only one file is selected
    if (!file) {
      alert(`Please select an image.`);
      return;
    }

    // setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async (onLoadEvent: any) => {
      onLoadEvent.preventDefault();
      // setSingleImageSrc(onLoadEvent.target.result);
      const imageDataUrl = onLoadEvent.target.result;

      // Upload file to Cloudinary
      const uploadedUrl = await uploadFileToCloudinary(file);

      // Once file is uploaded, update the state with the URL
      const updatedPersonCopy = { ...updatedPerson };
      // Update the mainImage property with the uploaded URL
      updatedPersonCopy.mainImage = uploadedUrl;
      // Update the state with the modified object
      setUpdatedPerson(updatedPersonCopy);
      // setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = (
    selectedAge: number,
    newUploadDatas: string[],
    prevState: any
  ) => {
    // Create a copy of the previous state
    const newState = { ...prevState };

    // Retrieve existing uploadDatas or initialize as an empty object
    const existingUploadDatas = newState?.uploadDatas || {};

    // Retrieve existing uploadDatas for the selected age or initialize as an empty object
    const existingUploadDatasForAge = existingUploadDatas[selectedAge] || {
      images: [],
      ageText: "",
    };

    // Update images for the selected age
    const updatedImages = [
      ...(existingUploadDatasForAge.images || []),
      ...newUploadDatas,
    ];

    // Update the uploadDatas object with the updated images for the selected age
    newState.uploadDatas = {
      ...existingUploadDatas,
      [selectedAge]: {
        ...existingUploadDatas[selectedAge],
        images: updatedImages,
      },
    };

    // Return the updated state
    return newState;
  };

  return (
    <>
      {person && (
        <FormContainer>
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
              <h2>MAIN INFORMATION</h2>
              <MainContainerForImage>
                <p>Main Image</p>
                <MainImageUploadContainer>
                  {!updatedPerson.mainImage ? (
                    <label htmlFor="file">
                      Add Main Image
                      <input
                        id="file"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </label>
                  ) : (
                    <SingleImageContainer>
                      <button
                        onClick={(e) =>
                          handleSingleRemoveImage(
                            updatedPerson.mainImage ?? "",
                            e
                          )
                        }
                      >
                        x
                      </button>
                      <SingleImage
                        src={updatedPerson.mainImage}
                        alt="Uploaded image"
                      ></SingleImage>
                    </SingleImageContainer>
                  )}
                </MainImageUploadContainer>
              </MainContainerForImage>
              <MainFieldContainer>
                <ThemeInfoContainer>
                  <TextInput
                    type="color"
                    id="color"
                    name="color"
                    value={updatedPerson.color}
                    placeholder=" "
                    label="Theme Color"
                    onChange={(e: any) => {
                      handleInputChange(e, "color");
                    }}
                  />
                  {/* <LabelInputContainer>
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
                </LabelInputContainer> */}

                  <Select
                    id="font-family"
                    label={"Theme Font"}
                    placeholder={font?.split(",").splice(0, 1).toString()}
                    className="max-w-xs"
                    onChange={(e: any) => {
                      handleSelectChange(e, "font");
                    }}
                    value={font}
                    labelPlacement={"outside"}
                  >
                    {fontOptions.map((selectOption: any) => (
                      <SelectItem
                        key={selectOption.value}
                        value={selectOption.value}
                        style={{
                          fontFamily: selectOption.value,
                          color: "black",
                        }}
                      >
                        {selectOption.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label={"Theme"}
                    id="themes"
                    placeholder={theme?.toString()}
                    className="max-w-xs"
                    onChange={(e) => {
                      handleThemeChange(e, "theme");
                    }}
                    value={theme}
                    labelPlacement={"outside"}
                  >
                    {themeData.map((selectOption: any) => (
                      <SelectItem
                        key={selectOption.value}
                        value={selectOption.value}
                        style={{
                          color: "black",
                        }}
                      >
                        {selectOption.name}
                      </SelectItem>
                    ))}
                  </Select>
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
                  <TextInput
                    type="date"
                    id="start"
                    name="trip-start"
                    min="1900-01-01"
                    max={maxDate}
                    value={updatedPerson.dob}
                    label={"Date of Birth*"}
                    onChange={(e: any) => {
                      handleInputChange(e, "dob");
                      handleDateOfBirthChange(e);
                    }}
                    required
                  />

                  <TextInput
                    type="date"
                    id="start"
                    name="trip-start"
                    min="1900-01-01"
                    max="2030-12-31"
                    value={updatedPerson.death}
                    label={"Death (Optional)"}
                    onChange={(e: any) => {
                      handleInputChange(e, "death");
                    }}
                  />
                </DatesContainer>
              </MainFieldContainer>
              <Line />
              <h2>SPECIFIC AGE INFORMATION</h2>
              <ImageUploadedContainer>
                <Select
                  label={"Year/Age"}
                  // placeholder="Select Year/Age"
                  placeholder=" "
                  className="max-w-xs"
                  onChange={handleAgeChange}
                  value={selectedAge}
                  labelPlacement={"outside"}
                >
                  {ageOptions.map((selectOption: any) => (
                    <SelectItem
                      key={selectOption.value}
                      value={selectOption.value}
                      style={{
                        color: "black",
                      }}
                    >
                      {selectOption.label}
                    </SelectItem>
                  ))}
                </Select>
                {/* <LabelInputContainer>
                <label htmlFor="ageText">Edit Paragraph about the Age</label>
                <textarea
                  placeholder="Write about this year..."
                  id="ageText"
                  value={
                    updatedPerson?.uploadDatas?.[selectedAge]?.ageText || ""
                  }
                  onChange={(e) =>
                    handleAgeTextChange(selectedAge, e.target.value)
                  }
                ></textarea>
              </LabelInputContainer> */}

                <Textarea
                  label={"Description of this Year/Age"}
                  placeholder="Enter your description"
                  className="max-w-xs"
                  value={
                    updatedPerson?.uploadDatas?.[selectedAge]?.ageText || ""
                  }
                  onChange={(e: any) =>
                    handleAgeTextChange(selectedAge, e.target.value)
                  }
                  labelPlacement={"outside"}
                />
              </ImageUploadedContainer>
              {/* Render the UploadFileInputEdit component passing existing uploadDatas */}
              <UploadFileInputEdit
                selectedAge={selectedAge}
                updatedPerson={updatedPerson}
                onUpload={(selectedAge: number, newUploadDatas: string[]) =>
                  setUpdatedPerson((prevState) =>
                    handleUpload(selectedAge, newUploadDatas, prevState)
                  )
                }
              />
              <ImageGridContainer>
                {person &&
                  updatedPerson.uploadDatas &&
                  selectedAge !== null &&
                  updatedPerson.uploadDatas[selectedAge]?.images?.map(
                    (src: string, index: number) => {
                      return (
                        <ImageWithCaption key={index}>
                          <ImageContainer>
                            <Image
                              width={300}
                              height={200}
                              src={src}
                              alt={`Image ${index}`}
                            />
                            {/* <img src={src} alt={`Uploaded image ${index}`} /> */}
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
                  [
                    ...Array(
                      Math.max(
                        0,
                        4 -
                          (updatedPerson?.uploadDatas[selectedAge]?.images
                            ?.length || 0)
                      )
                    ),
                  ].map((_, index) => (
                    <ImageWithCaption key={index + 300}>
                      <ImageContainer>
                        <ImageIcon
                          src="/main_image_icon.svg"
                          alt="Upload icon"
                        ></ImageIcon>
                        {/* {index + 1} */}
                      </ImageContainer>
                    </ImageWithCaption>
                  ))}
              </ImageGridContainer>

              <ButtonContainer>
                <BackButtonContainer>
                  <img src="/return.svg" alt="return arrow" />
                  <Link href="/auth/timeline">Back</Link>
                </BackButtonContainer>
                <button type="submit">Save</button>
              </ButtonContainer>
            </FormInnerContainer>
          </Form>
        </FormContainer>
      )}
    </>
  );
}

export default EditPeopleScreen;
