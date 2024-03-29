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
import UploadFileInputNew from "../reusable/formFields/uploadFileInputNew/Index";
import { Context } from "@/pages/_app";
import { buttonType } from "@/styles/Type";
import { useRouter } from "next/router";
import { inputType, pXSmall } from "@/styles/Type";

const FormContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 88px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
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
`;

const NameContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
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

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / span 2;
  gap: 10px;
`;

const ImageMediaContainer = styled.div`
  flex: 1;
  background-color: red;
  border: 1px solid #ccc;
  text-align: center;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

  // const [uploadDatas, setUploadDatas] = useState<UploadDataState>([]);
  const [uploadDatas, setUploadDatas] = useState<{ [key: number]: string[] }>(
    {}
  );

  const [newUploadDatas, setNewUploadDatas] = useState<{
    [key: number]: string[];
  }>({});

  const router = useRouter();

  const [selectedAge, setSelectedAge] = useState<number>(0); // Track selected age
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]); // Age options

  const submitNewPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const images = imagesRef.current?.files?.[0];
    const middleName = middleNameRef.current?.value;
    const dob = dobRef.current?.value;
    const death = deathRef.current?.value;
    const facebookLink = facebookRef.current?.value;
    const linkedinLink = linkedinRef.current?.value;
    const twitterLink = twitterRef.current?.value;
    console.log(firstName, lastName, images, middleName, dob);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        dob,
        death,
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
    // }

    // Update the updatedPerson state
    setUploadDatas(newUpdatedPerson);
  };

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
                  max="2030-12-31"
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
            </DatesContainer>
            <SocialMediaContainer>
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
            </SocialMediaContainer>
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
            />
            <MediaContainer>
              {uploadDatas[selectedAge]?.map((src: string, index: number) => (
                <ImageMediaContainer>
                  <img key={index} src={src} alt={`Uploaded image ${index}`} />
                  <button onClick={(e) => handleRemoveImage(src, index, e)}>
                    x
                  </button>
                </ImageMediaContainer>
              ))}
            </MediaContainer>
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
