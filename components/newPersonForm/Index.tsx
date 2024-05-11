import React, { useState, ChangeEvent } from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import UploadFileInputNew from "../reusable/formFields/uploadFileInputNew/Index";
import { useRouter } from "next/router";
import { Button, Tooltip } from "@nextui-org/react";
import slugifyNames from "@/lib/slugify";
import { MediaQueries } from "@/styles/Utilities";
import { themeData } from "@/themes/themeData";
import { fontOptions } from "@/lib/fonts";
import { Textarea } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { uploadFileToCloudinary } from "@/lib/uploadFileToCloudinary";
import MainContainer from "../reusable/mainContainer/Index";
import SectionHeader from "../reusable/sectionHeader/Index";
import MainImageUpload from "../reusable/mainImageUpload/Index";
import UploadModal from "./uploadModal/Index";
import FourImageGrid from "./fourImageGrid/Index";
import SelectInput from "../reusable/formFields/selectInput/Index";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import ErrorFormMessage from "../reusable/errorFormMessage/Index";
import Notification from "../reusable/notification/Index";
const Form = styled.form`
  max-width: 100%;

  @media ${MediaQueries.mobile} {
    max-height: 100%;
  }
`;

const MainInfo = styled.h2`
  grid-column: 1;
  grid-row: 1 / span 2;
  @media ${MediaQueries.mobile} {
    grid-column: unset;
  }
`;
const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 24px;
  @media ${MediaQueries.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const MainFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  grid-column: 2;
  grid-row: 2;
`;

const ThemeInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  [type="color"] {
    height: 42px;
  }
  @media ${MediaQueries.mobile} {
    flex-direction: column;
    grid-column: unset;
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

const ImageUploadedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: 2;
`;

function NewPersonForm() {
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
  const mainTextRef = React.useRef<HTMLTextAreaElement>(null);
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

  console.log(uploadDatas[selectedAge], "uploadDatas[selectedAge]");
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [singleImageSrc, setSingleImageSrc] = useState();

  const [font, setFont] = useState("Arial, sans-serif");

  const [theme, setTheme] = useState(1);

  const [saveAttempt, setSaveAttempt] = useState(false);

  const [mainImage, setMainImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  console.log(uploadedImages, "UPLOADED IMAGES");

  interface UploadedImage {
    src: string;
    progress: number;
  }

  const [uploadProgress, setUploadProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (uploadProgress > 0 && uploadProgress <= 100) {
        setUploadProgress((prevProgress) => prevProgress + 0.5);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [uploadProgress]);

  const submitNewPerson = async (event: any) => {
    event.preventDefault();

    setSaveAttempt(true);

    if (
      !firstNameRef?.current?.value ||
      !lastNameRef?.current?.value ||
      !dobRef?.current?.value
    ) {
      // Show error message or handle validation failure

      return; // Exit function without submitting the form
    }

    setIsLoading(true);
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const middleName = middleNameRef.current?.value || "";
    const dob = dobRef.current?.value || "";
    const death = deathRef.current?.value || "";
    const facebookLink = facebookRef.current?.value || "";
    const linkedinLink = linkedinRef.current?.value || "";
    const twitterLink = twitterRef.current?.value || "";
    const color = colorRef.current?.value || "#ff0000";
    const mainText = mainTextRef.current?.value || "";
    const slug = slugifyNames(firstName, middleName, lastName);
    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;

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
        mainText,
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

    await fetch("/api/auth/user/reduce-timelines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include the sessionUserEmail in the request body
      body: JSON.stringify({ sessionUserEmail }),
    });

    router.push("/auth/timeline");
  };

  const handleAgeTextChange = (e: any) => {
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
    const selectedDate = new Date(dobRef.current?.value || "");

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
    setAgeText("");
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
    setUploadedImages([]);
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
      setUploadedImages((prevImages) =>
        prevImages.filter((_, i) => i !== imageIndex)
      );
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
          setSingleImageSrc(undefined);
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
    setUploadProgress(1);
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

      console.log(onLoadEvent.target.result, "onLoadEvent.target.result");
      setSingleImageSrc(onLoadEvent.target.result);
      const imageDataUrl = onLoadEvent.target.result;

      // Upload file to Cloudinary
      const uploadedUrl = await uploadFileToCloudinary(file);

      if (uploadedUrl !== null) {
        setUploadProgress(100);
      }

      // Once file is uploaded, update the state with the URL
      setMainImage(uploadedUrl);
      // setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <SectionHeader
        backButton={true}
        button={
          <>
            {!isLoading ? (
              <Button
                style={{
                  backgroundColor: `${variables.lightOrange}`,
                  color: `${variables.white}`,
                }}
                onClick={submitNewPerson}
              >
                Save
              </Button>
            ) : (
              <Button
                isLoading
                disabled
                style={{
                  backgroundColor: `${variables.lightOrange}`,
                  color: `${variables.white}`,
                }}
              >
                Saving...
              </Button>
            )}{" "}
          </>
        }
        heading="Create a new timeline"
      />
      {/* <MainContainer> */}
      <Form method="post">
        <FormInnerContainer>
          <div className="row-span-2 flex gap-4 flex-col">
            <MainInfo>MAIN INFORMATION</MainInfo>
            <p className="italic text-xs">
              Supply the personal information regarding the timeline
            </p>
            <p className="italic text-xs">This information will be public</p>
          </div>
          <div className="flex flex-col gap-2 ">
            <MainImageUpload
              handleSingleRemoveImage={handleSingleRemoveImage}
              mainImage={mainImage}
              handleOnChange={handleOnChange}
              setSingleImageSrc={setSingleImageSrc}
              singleImageSrc={singleImageSrc}
              uploadProgress={uploadProgress}
            />
            {!mainImage && saveAttempt && (
              <ErrorFormMessage message="Main image is required" />
            )}
          </div>
          <MainFieldContainer>
            <ThemeInfoContainer className="w-full">
              <TextInput
                className=""
                type="color"
                id="color"
                name="color"
                ref={colorRef}
                label="Theme Color"
                style={{ borderRadius: 0 }}
              />

              <SelectInput
                placeholder="Select a font"
                label={"Theme Font"}
                onChange={handleFontChange}
                value={font}
                options={fontOptions}
              />
              <SelectInput
                label={"Theme"}
                placeholder="Select a theme"
                onChange={handleThemeChange}
                value={theme}
                options={themeData}
              />
            </ThemeInfoContainer>
            <NameContainer>
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  name="firstName"
                  label="First Name*"
                  placeholder="John"
                  type="text"
                  ref={firstNameRef}
                  required
                />
                {!firstNameRef?.current?.value && saveAttempt && (
                  <ErrorFormMessage message="First name is required" />
                )}
              </div>
              <TextInput
                name="middleName"
                label="Middle Name"
                placeholder="George"
                type="text"
                ref={middleNameRef}
              />
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  name="lastName"
                  label="Last Name*"
                  placeholder="Doe"
                  type="text"
                  ref={lastNameRef}
                  required
                />
                {!lastNameRef?.current?.value && saveAttempt && (
                  <ErrorFormMessage message="Last name is required" />
                )}
              </div>
            </NameContainer>
            <DatesContainer>
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="date"
                  id="start"
                  name="trip-start"
                  min="1900-01-01"
                  max={maxDate}
                  ref={dobRef}
                  label={"Date of Birth*"}
                  onChange={(e: any) => handleDateOfBirthChange(e)}
                  required
                />
                {!dobRef?.current?.value && saveAttempt && (
                  <ErrorFormMessage message="Date of Birth is required" />
                )}
              </div>

              <TextInput
                type="date"
                id="start"
                name="trip-start"
                min="1900-01-01"
                max="2030-12-31"
                label={"Death (Optional)"}
                ref={deathRef}
              />
            </DatesContainer>
            <Textarea
              label={"Write a main description of the life"}
              ref={mainTextRef}
              placeholder="Enter your description"
              className="border-none focus:outline-none focus:shadow-none shadow-none"
              labelPlacement={"outside"}
            />
          </MainFieldContainer>
          <Divider className="my-4 col-span-2" />
          <div className="row-span-2 flex gap-4 flex-col">
            <h2>SPECIFIC AGE INFORMATION</h2>
            <p className="italic text-xs">
              Supply the information regarding the specific age of your life.
            </p>
            <p className="italic text-xs">This information will be public.</p>
          </div>

          <ImageUploadedContainer>
            <SelectInput
              placeholder="Select Year/Age"
              label={
                <Tooltip content="Must fill in Date of Birth">
                  <div className="flex items-center">
                    <span className="mr-2">Select Year/Age</span>
                    <InformationCircleIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </Tooltip>
              }
              onChange={handleAgeChange}
              value={ageOptions[selectedAge]?.label || ageOptions[0]?.value}
              options={ageOptions}
            />
            <Textarea
              label={`Description of   ${
                ageOptions[selectedAge]?.label
                  ? ageOptions[selectedAge].label
                  : "Born"
              }`}
              placeholder="Enter your description"
              className="border-none"
              value={uploadDatas[selectedAge]?.ageText || ageText}
              onChange={handleAgeTextChange}
              labelPlacement={"outside"}
            />
            <UploadModal
              uploadDatas={uploadDatas}
              selectedAge={selectedAge}
              ageOptions={ageOptions}
              setUploadedImages={setUploadedImages}
            >
              <UploadFileInputNew
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                selectedAge={selectedAge}
                setUploadDatas={setUploadDatas}
                uploadDatas={uploadDatas}
                setImageSrcs={setImageSrcs}
                imageSrcs={imageSrcs}
                handleRemoveImage={handleRemoveImage}
              />
            </UploadModal>
          </ImageUploadedContainer>
          <FourImageGrid
            uploadDatas={uploadDatas}
            selectedAge={selectedAge}
            handleRemoveImage={handleRemoveImage}
          />
        </FormInnerContainer>
      </Form>
      {/* </MainContainer> */}
    </>
  );
}

export default NewPersonForm;
