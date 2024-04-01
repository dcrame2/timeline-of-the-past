import React, { useState, FormEvent, ChangeEvent } from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import UploadFileInputNew from "../reusable/formFields/uploadFileInputNew/Index";
import { buttonType } from "@/styles/Type";
import { useRouter } from "next/router";
import { inputType, pXSmall } from "@/styles/Type";
import Image from "next/image";
import slugifyNames from "@/lib/slugify";
import { MediaQueries } from "@/styles/Utilities";

const FormContainer = styled(motion.div)`
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
const Form = styled.form``;

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

const NameContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
  @media ${MediaQueries.mobile} {
    flex-direction: column;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 12px;

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

const LabelInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  label {
    ${pXSmall}
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

const ImageUploadedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: 1 / span 2;
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

  const [uploadDatas, setUploadDatas] = useState<{ [key: number]: string[] }>(
    {}
  );

  const maxDate = new Date().toISOString().split("T")[0];

  const router = useRouter();

  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const [font, setFont] = useState("Arial, sans-serif");

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
    console.log(firstName, lastName, images, middleName, dob);

    const slug = slugifyNames(firstName, middleName, lastName);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        slug,
        firstName,
        middleName,
        lastName,
        dob,
        death,
        color,
        font,
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
    if (!(age in uploadDatas)) {
      setUploadDatas((prevUploadDatas) => ({
        ...prevUploadDatas,
        [age]: [],
      }));
    }
  };

  const handleFontChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFont(selectedValue);
  };

  const handleRemoveImage = async (
    imageUrlToDelete: string,
    imageIndex: number,
    e: any
  ) => {
    e.preventDefault();
    // Create a copy of the updatedPerson
    const newUpdatedPerson = { ...uploadDatas };

    // Remove the image URL from uploadDatas array for the selectedAge
    if (uploadDatas && selectedAge !== null) {
      uploadDatas[selectedAge].splice(imageIndex, 1);
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
    setUploadDatas(newUpdatedPerson);
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

  return (
    <FormContainer {...motionPropsRight}>
      <Form method="post" onSubmit={submitNewPerson}>
        <FormInnerContainer>
          <MainFormContainer>
            <NameContainer>
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
            </NameContainer>
            <DatesContainer>
              <LabelInputContainer>
                <label htmlFor="start">Date of Birth</label>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  min="1900-01-01"
                  max={maxDate}
                  ref={dobRef}
                  onChange={(e: any) => handleDateOfBirthChange(e)}
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
              <LabelInputContainer>
                <label htmlFor="color">Theme Color</label>
                <input type="color" id="color" name="color" ref={colorRef} />
              </LabelInputContainer>
              <LabelInputContainer>
                <label htmlFor="font-family">Theme Font:</label>
                <select
                  id="font-family"
                  value={font}
                  onChange={handleFontChange}
                  style={{ fontFamily: font }}
                >
                  <option value="">Select Font</option>
                  {fontOptions.map((option, index) => (
                    <option
                      style={{ fontFamily: option.value }}
                      key={index}
                      value={option.value}
                    >
                      <span style={{ fontFamily: option.value }}>
                        {option.label}
                      </span>
                    </option>
                  ))}
                </select>
              </LabelInputContainer>
            </DatesContainer>

            {/* <SocialMediaContainer>
              <TextInput
                name="facebook"
                label="Facebook"
                placeholder="http://"
                type="text"
                ref={facebookRef}
              />
              <TextInput
                name="twitter"
                label="Twitter"
                placeholder="http://"
                type="text"
                ref={twitterRef}
              />
              <TextInput
                name="linkedin"
                label="LinkedIn"
                placeholder="http://"
                type="text"
                ref={linkedinRef}
              />
            </SocialMediaContainer> */}
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
            <UploadFileInputNew
              selectedAge={selectedAge}
              setUploadDatas={setUploadDatas}
              uploadDatas={uploadDatas}
              setImageSrcs={setImageSrcs}
              imageSrcs={imageSrcs}
            />
            <ImageGridContainer>
              {uploadDatas[selectedAge]?.map((src: string, index: number) => (
                <ImageContainer>
                  <img key={index} src={src} alt={`Uploaded image ${index}`} />
                  <button onClick={(e) => handleRemoveImage(src, index, e)}>
                    x
                  </button>
                </ImageContainer>
              ))}
            </ImageGridContainer>
          </ImageUploadedContainer>

          <ButtonContainer>
            <button type="submit">Preview</button>
            <button type="submit">Save</button>
          </ButtonContainer>
        </FormInnerContainer>
      </Form>
    </FormContainer>
  );
}

export default NewPersonForm;
