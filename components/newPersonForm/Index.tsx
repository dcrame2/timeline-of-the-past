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
import { Card, Image, Skeleton } from "@nextui-org/react";
import slugifyNames from "@/lib/slugify";
import { MediaQueries } from "@/styles/Utilities";
import { themeData } from "@/themes/themeData";
import Link from "next/link";
import { fontOptions } from "@/lib/fonts";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { uploadFileToCloudinary } from "@/lib/uploadFileToCloudinary";

const H1Element = styled.h1`
  font-size: 30px;
  margin: 24px;
  color: #060606;
  @media ${MediaQueries.mobile} {
    margin: 12px 24px 0;
  }
`;

const FormContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 0px 12px 24px;
  padding: 88px 24px 24px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  height: fit-contnent;
  @media ${MediaQueries.mobile} {
    height: 100%;
  }
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
  }

  h2 {
    color: ${variables.black};
    grid-column: 1 / span 2;
    letter-spacing: 1.5px;
  }
  @media ${MediaQueries.mobile} {
    padding: 88px 12px 24px;
    /* height: 80dvh; */
  }
`;
const Form = styled.form`
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

const MainFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ThemeInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;

  .custom-color-input {
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
  grid-column: 1;
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

const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / span 2;
  gap: 10px;

  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageWithCaption = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  background-color: ${variables.lightGrey};
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;
  ${h2styles} @media ${MediaQueries.mobile} {
  }
  img {
    object-fit: contain;
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
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageIcon = styled.img`
  width: 20px !important;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptionInput = styled.input`
  width: 100%;
  margin-top: 5px;
`;

const Line = styled.hr`
  grid-column: 1 / span 2;
  height: 5px;
  background-color: ${variables.black};
`;

const MainImageUploadContainer = styled.div`
  height: 100%;
  background-color: #f4f4f5;
  border-radius: 12px;
  border: 1px dashed ${variables.darkBlue};
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  display: flex;
  transition: background-color ease-in 0.2s;
  @media ${MediaQueries.mobile} {
    min-height: 200px;
  }
  &:hover {
    transition: background-color ease-in 0.2s;
    background-color: #e4e4e7;
  }
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
`;

const StyledInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer; /* Ensure cursor changes to pointer on hover */
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

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    ${pXSmall}
  }
`;

type UploadDataState = string[];

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

  console.log(theme, "theme");

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
      <FormContainer {...motionPropsRight}>
        <Form method="post" onSubmit={submitNewPerson}>
          <FormInnerContainer>
            <h2>MAIN INFORMATION</h2>
            <MainContainerForImage>
              <p>Main Image</p>

              <MainImageUploadContainer>
                {!mainImage ? (
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
            <MainFieldContainer>
              <ThemeInfoContainer>
                <TextInput
                  className="custom-color-input"
                  type="color"
                  id="color"
                  name="color"
                  ref={colorRef}
                  placeholder=" "
                  label="Theme Color"
                />
                <Select
                  label={"Theme Font"}
                  placeholder="Select a font"
                  className="max-w-xs"
                  onChange={handleFontChange}
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
                  placeholder="Select a theme"
                  className="max-w-xs"
                  onChange={handleThemeChange}
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
            </MainFieldContainer>
            <Line />
            <h2>SPECIFIC AGE INFORMATION</h2>
            <ImageUploadedContainer>
              <Select
                label={"Year/Age"}
                placeholder="Select Year/Age"
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
              <Textarea
                label={"Description of this Year/Age"}
                placeholder="Enter your description"
                className="max-w-xs"
                value={uploadDatas[selectedAge]?.ageText || ageText}
                onChange={handleAgeTextChange}
                labelPlacement={"outside"}
              />
            </ImageUploadedContainer>
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
                  // <ImageWithCaption key={index}>
                  <ImageContainer>
                    <Image
                      width={300}
                      height={200}
                      src={src}
                      alt={`Image ${index}`}
                    />
                    <button onClick={(e) => handleRemoveImage(src, index, e)}>
                      x
                    </button>
                  </ImageContainer>
                  // </ImageWithCaption>
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
                <Card
                  disableAnimation={true}
                  className="w-[100%] relative shadow-none h-full bg-customGray"
                  radius="md"
                >
                  <Skeleton isLoaded={true} className="rounded-lg">
                    <div className="h-48 rounded-lg bg-customGray"></div>
                  </Skeleton>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon
                      src="/main_image_icon.svg"
                      alt="Upload icon"
                    ></ImageIcon>
                  </div>
                </Card>
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
    </>
  );
}

export default NewPersonForm;
