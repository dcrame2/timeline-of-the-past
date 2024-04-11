import React, { useState, FormEvent, ChangeEvent } from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import UploadFileInputNew from "../reusable/formFields/uploadFileInputNew/Index";
import { buttonType, h2styles, linkStyles } from "@/styles/Type";
import { useRouter } from "next/router";
import { inputType, pXSmall } from "@/styles/Type";
import Image from "next/image";
import slugifyNames from "@/lib/slugify";
import { MediaQueries } from "@/styles/Utilities";
import { themeData } from "@/themes/themeData";
import Link from "next/link";

import { uploadFileToCloudinary } from "@/lib/uploadFileToCloudinary";

const H1Element = styled.h1`
  font-size: 30px;
  margin: 24px;
  color: #060606;
`;

const FormContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 88px 24px 24px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.mobile} {
    padding: 88px 24px 24px;
  }
`;
const Form = styled.form`
  max-height: 550px;
  overflow-y: scroll;
  @media ${MediaQueries.mobile} {
    max-height: 90%;
  }
`;

const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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

const NameContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
  @media ${MediaQueries.mobile} {
    flex-direction: column;
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
    min-height: 100px;
  }

  input[type="date"] {
    width: 100%;
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
    min-height: 42px;
  }
`;

const ImageUploadedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: 1 / span 2;
  padding: 12px;
  background-color: ${variables.darkerLightGrey};
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 20px;
  display: flex;
  width: fit-content;
  justify-content: space-between;
  gap: 20px;
  button {
    ${buttonType}
  }
`;

const BackButtonContainer = styled.div`
  position: absolute;
  left: 40px;
  top: 20px;
  display: flex;
  width: fit-content;
  justify-content: space-between;
  gap: 20px;
  a {
    ${linkStyles}
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
  @media ${MediaQueries.mobile} {
    min-height: 200px;
  }
  img {
    object-fit: contain;
    width: 200px;
  }
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
`;

const CaptionInput = styled.input`
  width: 100%;
  margin-top: 5px;
`;

const MainImageUploadContainer = styled.div`
  height: 75px;
  width: 75px;
  background-color: ${variables.lightGrey};
  border-radius: 50%;
  border: 2px dashed steelblue;
  position: relative;
  transition: background-color ease-in 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Position the input element */
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer; /* Ensure cursor changes to pointer on hover */
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
  /* position: relative; */
  /* overflow: hidden; */
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
    z-index: 5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SingleImage = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100%;
  object-fit: cover;
  /* opacity: 0; */
  z-index: 2;
`;

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    ${pXSmall}
  }
`;

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

function NewPersonForm() {
  const motionPropsRight = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };

  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const imagesRef = React.useRef<HTMLInputElement>(null);
  const middleNameRef = React.useRef<HTMLInputElement>(null);
  const dobRef = React.useRef<HTMLInputElement>(null);
  const deathRef = React.useRef<HTMLInputElement>(null);
  const facebookRef = React.useRef<HTMLInputElement>(null);
  const linkedinRef = React.useRef<HTMLInputElement>(null);
  const twitterRef = React.useRef<HTMLInputElement>(null);
  const colorRef = React.useRef<HTMLInputElement>(null);
  const captionRef = React.useRef<HTMLInputElement>(null);

  const [uploadDatas, setUploadDatas] = useState<{
    [key: number]: { images: string[]; ageText: string };
  }>({});
  const maxDate = new Date().toISOString().split("T")[0];

  const router = useRouter();

  const [ageText, setAgeText] = useState("");

  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [singleImageSrc, setSingleImageSrc] = useState();

  const [font, setFont] = useState("Arial, sans-serif");
  const [theme, setTheme] = useState(1);

  const [mainImage, setMainImage] = useState<string | null>(null);

  const submitNewPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const images = imagesRef.current?.files?.[0];
    const middleName = middleNameRef.current?.value || "";
    const dob = dobRef.current?.value || "";
    const death = deathRef.current?.value || "";
    const facebookLink = facebookRef.current?.value || "";
    const linkedinLink = linkedinRef.current?.value || "";
    const twitterLink = twitterRef.current?.value || "";
    const color = colorRef.current?.value || "#ff0000";
    // const caption = captionRef.current?.value | "";
    console.log(firstName, lastName, images, middleName, dob);

    const slug = slugifyNames(firstName, middleName, lastName);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        mainImage,
        slug,
        firstName,
        middleName,
        lastName,
        dob,
        death,
        color,
        font,
        theme,
        facebookLink,
        linkedinLink,
        twitterLink,
        uploadDatas,
        sessionUserEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/auth/timeline");
  };

  // Handler for age text input change
  const handleAgeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    setAgeText(newText);

    setUploadDatas((prevUploadDatas) => ({
      ...prevUploadDatas,
      [selectedAge]: {
        ...prevUploadDatas[selectedAge],
        ageText: newText,
        images: prevUploadDatas[selectedAge]?.images || [],
      },
    }));
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

    setSelectedAge(selectedAge !== null ? selectedAge : 0); // Reset selected age
    setAgeOptions(ageOptions);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const age = parseInt(event.target.value);
    console.log(age, "AGE");
    setSelectedAge(age);
    setAgeText(""); // Reset ageText to empty string when age is changed
    // Check if age exists in uploadDatas
    if (!(age in uploadDatas)) {
      // If not, initialize it with an empty array for images and empty string for ageText
      setUploadDatas((prevUploadDatas) => ({
        ...prevUploadDatas,
        [age]: { images: [], ageText: "" },
      }));
    } else {
      // If age exists, update ageText to empty string if it's not already set
      if (!uploadDatas[age].ageText) {
        setUploadDatas((prevUploadDatas) => ({
          ...prevUploadDatas,
          [age]: {
            ...prevUploadDatas[age],
            ageText: "",
          },
        }));
      }
    }
  };

  const handleFontChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFont(selectedValue);
  };

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = +event.target.value;
    setTheme(selectedValue);
  };

  const handleRemoveImage = async (
    imageUrlToDelete: string,
    imageIndex: number,
    e: any
  ) => {
    e.preventDefault();
    // Check if selectedAge is not empty
    if (selectedAge !== null) {
      // Create a copy of the uploadDatas object
      const updatedUploadDatas = { ...uploadDatas };
      // Remove the image URL from the images array for the selectedAge
      if (updatedUploadDatas[selectedAge]) {
        updatedUploadDatas[selectedAge].images.splice(imageIndex, 1);
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
      // Update the uploadDatas state with the modified object
      setUploadDatas(updatedUploadDatas);
    }
  };

  const handleSingleRemoveImage = async (
    imageUrlToDelete: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // Check if selectedAge is not empty
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
          setMainImage(null);
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

  const handleCaptionChange = (index: number, caption: string) => {
    setUploadDatas((prevUploadDatas: any) => {
      const updatedUploadDatas = { ...prevUploadDatas };
      updatedUploadDatas[selectedAge][index].caption = caption;
      return updatedUploadDatas;
    });
  };

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
      setSingleImageSrc(onLoadEvent.target.result);
      const imageDataUrl = onLoadEvent.target.result;

      // Upload file to Cloudinary
      const uploadedUrl = await uploadFileToCloudinary(file);

      // Once file is uploaded, update the state with the URL
      setMainImage(uploadedUrl);
      // setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <H1Element>Create a new Timeline</H1Element>
      <FormContainer {...motionPropsRight}>
        <Form method="post" onSubmit={submitNewPerson}>
          <FormInnerContainer>
            <MainFormContainer>
              <MainContainerForImage>
                <p>Main Image</p>
                <MainImageUploadContainer>
                  {!mainImage ? (
                    <label htmlFor="file">
                      <img src="/main_image_icon.svg" alt="Upload icon"></img>
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
                        onClick={(e) => handleSingleRemoveImage(mainImage, e)}
                      >
                        x
                      </button>
                      <SingleImage
                        src={mainImage}
                        alt="Uploaded image"
                      ></SingleImage>
                    </SingleImageContainer>
                  )}
                </MainImageUploadContainer>
              </MainContainerForImage>
              <ThemeInfoContainer>
                <LabelInputContainer>
                  <label htmlFor="color">Theme Color</label>
                  <input type="color" id="color" name="color" ref={colorRef} />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label htmlFor="font-family">Theme Font</label>
                  <select
                    id="font-family"
                    value={font}
                    onChange={handleFontChange}
                    style={{ fontFamily: font }}
                  >
                    {fontOptions.map((option, index) => (
                      <option
                        style={{ fontFamily: option.value }}
                        key={index}
                        value={option.value}
                      >
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
                    onChange={handleThemeChange}
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
                  name="firstName"
                  label="First Name*"
                  placeholder="John"
                  type="text"
                  ref={firstNameRef}
                  required
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
                  label="Last Name*"
                  placeholder="Doe"
                  type="text"
                  ref={lastNameRef}
                  required
                />
              </NameContainer>
              <DatesContainer>
                <LabelInputContainer>
                  <label htmlFor="start">Date of Birth*</label>
                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    min="1900-01-01"
                    max={maxDate}
                    ref={dobRef}
                    onChange={(e: any) => handleDateOfBirthChange(e)}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label htmlFor="start">Death (Optional)</label>
                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    min="1900-01-01"
                    max="2030-12-31"
                    ref={deathRef}
                  />
                </LabelInputContainer>
              </DatesContainer>
            </MainFormContainer>
            <ImageUploadedContainer>
              <LabelInputContainer>
                <label htmlFor="age">Select Age to Upload Images For</label>
                <select id="age" onChange={handleAgeChange} value={selectedAge}>
                  {ageOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </LabelInputContainer>

              <LabelInputContainer>
                <label htmlFor="ageText">
                  Enter Paragraph about this year {selectedAge}
                </label>
                <textarea
                  id="ageText"
                  placeholder="Write about this year..."
                  value={uploadDatas[selectedAge]?.ageText || ageText}
                  onChange={handleAgeTextChange}
                ></textarea>
              </LabelInputContainer>
              <UploadFileInputNew
                selectedAge={selectedAge}
                setUploadDatas={setUploadDatas}
                uploadDatas={uploadDatas}
                setImageSrcs={setImageSrcs}
                imageSrcs={imageSrcs}
              />
              <ImageGridContainer>
                {uploadDatas[selectedAge]?.images?.map(
                  (src: string, index: number) => (
                    <ImageWithCaption key={index}>
                      <ImageContainer>
                        <img src={src} alt={`Uploaded image ${index}`} />
                        <button
                          onClick={(e) => handleRemoveImage(src, index, e)}
                        >
                          x
                        </button>
                      </ImageContainer>
                      {/* <TextInput
                    type="text"
                    placeholder="Enter caption..."
                    ref={captionRef}
                    onChange={handleCaptionChange}
                    // onChange={handleCaptionChange}
                  /> */}
                    </ImageWithCaption>
                  )
                )}
                {[
                  ...Array(
                    Math.max(
                      0,
                      4 - (uploadDatas[selectedAge]?.images?.length || 0)
                    )
                  ),
                ].map((_, index) => (
                  <ImageWithCaption key={index + 100}>
                    <ImageContainer>{index + 1}</ImageContainer>
                    {/* <TextInput
                    type="text"
                    placeholder="Enter caption..."
                    ref={captionRef}
                    onChange={handleCaptionChange}
                    // onChange={handleCaptionChange}
                  /> */}
                  </ImageWithCaption>
                ))}
              </ImageGridContainer>
            </ImageUploadedContainer>

            <ButtonContainer>
              <button type="submit">Save</button>
            </ButtonContainer>
            <BackButtonContainer>
              <Link href="/auth/timeline">Back</Link>
            </BackButtonContainer>
          </FormInnerContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default NewPersonForm;
