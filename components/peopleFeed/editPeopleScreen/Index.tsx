import React, { useState, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { variables } from "@/styles/Variables";
import TextInput from "@/components/reusable/formFields/TextInput";
import { linkStyles } from "@/styles/Type";
import UploadFileInputEdit from "@/components/reusable/formFields/uploadFileInputEdit/Index";
import { useRouter } from "next/router";
import { MediaQueries } from "@/styles/Utilities";
import { themeData } from "@/themes/themeData";
import { uploadFileToCloudinary } from "@/lib/uploadFileToCloudinary";
import { fontOptions } from "@/lib/fonts";
import {
  Divider,
  Select,
  SelectItem,
  Link,
  Button,
  Textarea,
} from "@nextui-org/react";
import MainContainer from "@/components/reusable/mainContainer/Index";
import SectionHeader from "@/components/reusable/sectionHeader/Index";
import MainImageUpload from "./mainImageUpload/Index";
import UploadModal from "@/components/newPersonForm/uploadModal/Index";
import FourImageGrid from "@/components/newPersonForm/fourImageGrid/Index";

const Form = styled.form`
  @media ${MediaQueries.mobile} {
    max-height: 100%;
  }
`;

const FormInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
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

const ThemeInfoContainer = styled.div`
  display: flex;
  gap: 12px;
  grid-column: 1 / span 2;
  @media ${MediaQueries.mobile} {
    flex-direction: column;
    grid-column: unset;
  }
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
  mainText?: string;
}

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

  interface UploadedImage {
    src: string;
    progress: number;
  }

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [ageOptions, setAgeOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [font, setFont] = useState(updatedPerson.font);
  const [theme, setTheme] = useState(updatedPerson.theme);
  const maxDate = new Date().toISOString().split("T")[0];
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

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
    setUploadedImages([]);
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
    setIsLoading(true);
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
        <>
          <SectionHeader
            heading={`Editing ${updatedPerson.firstName} ${updatedPerson.lastName}'s timeline`}
            backButton={true}
            button={
              <>
                {!isLoading ? (
                  <Button
                    style={{
                      backgroundColor: `${variables.lightOrange}`,
                      color: `${variables.white}`,
                    }}
                    onClick={(e: any) => handleSave(e)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: `${variables.lightOrange}`,
                      color: `${variables.white}`,
                    }}
                    disabled
                    isLoading
                  >
                    Saving
                  </Button>
                )}
              </>
            }
          />

          <MainContainer>
            <Form>
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
                <div className="row-span-2 flex gap-4 flex-col">
                  <h2>MAIN INFORMATION</h2>
                  <p className="italic text-xs">
                    Supply the personal information regarding the timeline
                  </p>
                  <p className="italic text-xs">
                    This information will be public
                  </p>
                </div>
                <MainImageUpload
                  updatedPerson={updatedPerson}
                  handleOnChange={handleOnChange}
                  handleSingleRemoveImage={handleSingleRemoveImage}
                />
                <MainFieldContainer>
                  <ThemeInfoContainer className="w-full">
                    <TextInput
                      type="color"
                      id="color"
                      name="color"
                      value={updatedPerson.color}
                      placeholder=" "
                      label="Theme Color"
                      style={{ borderRadius: 0 }}
                      onChange={(e: any) => {
                        handleInputChange(e, "color");
                      }}
                    />
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
                          {selectOption.label}
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

                  <Textarea
                    label={"Who are you today?"}
                    value={updatedPerson.mainText}
                    placeholder="Enter your description"
                    className="border-none"
                    labelPlacement={"outside"}
                    onChange={(e: any) => {
                      handleInputChange(e, "mainText");
                    }}
                  />
                </MainFieldContainer>
                <Divider className="my-4 col-span-2" />
                <div className="row-span-2 flex gap-4 flex-col">
                  <h2>SPECIFIC AGE INFORMATION</h2>
                  <p className="italic text-xs">
                    Supply the information regarding the specific age of your
                    life.
                  </p>
                  <p className="italic text-xs">
                    This information will be public.
                  </p>
                </div>
                <ImageUploadedContainer>
                  <Select
                    label={"Year/Age"}
                    placeholder={
                      ageOptions[selectedAge]?.label
                        ? ageOptions[selectedAge].label
                        : "Born"
                    }
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
                    label={`Description of   ${
                      ageOptions[selectedAge]?.label
                        ? ageOptions[selectedAge].label
                        : "Born"
                    }`}
                    placeholder="Enter your description"
                    className="border-none"
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
                <UploadModal
                  uploadDatas={updatedPerson?.uploadDatas}
                  selectedAge={selectedAge}
                  ageOptions={ageOptions}
                  setUploadedImages={setUploadedImages}
                >
                  <UploadFileInputEdit
                    setUploadedImages={setUploadedImages}
                    uploadedImages={uploadedImages}
                    selectedAge={selectedAge}
                    updatedPerson={updatedPerson}
                    onUpload={(selectedAge: number, newUploadDatas: string[]) =>
                      setUpdatedPerson((prevState) =>
                        handleUpload(selectedAge, newUploadDatas, prevState)
                      )
                    }
                  />
                </UploadModal>
                <FourImageGrid
                  uploadDatas={updatedPerson.uploadDatas}
                  selectedAge={selectedAge}
                  handleRemoveImage={handleRemoveImage}
                />
              </FormInnerContainer>
            </Form>
          </MainContainer>
        </>
      )}
    </>
  );
}

export default EditPeopleScreen;
