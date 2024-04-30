import React from "react";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import TextInput from "../reusable/formFields/TextInput";
import { Session } from "next-auth";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
import MainContainer from "../reusable/mainContainer/Index";
import { MediaQueries } from "@/styles/Utilities";
import { pXSmall } from "@/styles/Type";
import EmptyImageCard from "../reusable/emptyImageCard/Index";

const Form = styled.form`
  button {
    margin-bottom: 4px;
  }
`;

const NameInformation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const EmailUsernameInformation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    ${pXSmall}
  }
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
  display: flex;
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
    cursor: pointer;
  }

  img {
    width: 20px;
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

const SingleImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100%;
  object-fit: cover;
  z-index: 2;
`;

function ProfileComponent({ session }: any) {
  return (
    <MainContainer>
      <Form>
        <MainContainerForImage>
          <p>Profile Image</p>

          <MainImageUploadContainer>
            <label htmlFor="file">
              Add Profile Image
              <input
                id="file"
                type="file"
                name="file"
                accept="image/*"
                // onChange={(e) => handleOnChange(e)}
              />
            </label>
          </MainImageUploadContainer>
          {false ? (
            <EmptyImageCard />
          ) : (
            <SingleImageContainer>
              <button
              // onClick={(e) => handleSingleRemoveImage(mainImage, e)}
              >
                x
              </button>
              <SingleImage
                src="/time-clock-hero.jpg"
                alt="Uploaded image"
              ></SingleImage>
            </SingleImageContainer>
          )}
        </MainContainerForImage>
        <NameInformation>
          <TextInput
            label="First Name:"
            type="text"
            value={session?.user.firstName}
            // onChange={(e: any) => handleInputChange(e, "firstName")}
          />
          <TextInput
            label="Last Name:"
            type="text"
            value={session?.user.lastName}
            // onChange={(e: any) => handleInputChange(e, "firstName")}
          />
        </NameInformation>
        <EmailUsernameInformation>
          <TextInput
            label="Username:"
            type="text"
            value={session?.user.username}
            disabled
            // onChange={(e: any) => handleInputChange(e, "firstName")}
          />
          <TextInput
            label="Email:"
            type="email"
            value={session?.user.email}
            disabled
            // onChange={(e: any) => handleInputChange(e, "firstName")}
          />
        </EmailUsernameInformation>
        <TextInput
          label="Password"
          type="password"
          value={session?.user.password}
          // onChange={(e: any) => handleInputChange(e, "firstName")}
        />

        <Button color="primary">Edit</Button>

        <Button color="primary">Save</Button>
      </Form>
    </MainContainer>
  );
}

export default ProfileComponent;
