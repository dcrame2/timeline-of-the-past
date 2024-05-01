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
import Profile from "@/pages/auth/profile";
import ProfileImageUpload from "./profileImageUpload/Index";

const Form = styled.form`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 24px;
  @media ${MediaQueries.tablet} {
    display: flex;
    flex-direction: column;
  }
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

const MainFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  grid-column: 2;
  grid-row: 2;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  grid-column: 2;
`;

function ProfileComponent({ session }: any) {
  return (
    <MainContainer>
      <Form>
        <div className="row-span-2 flex gap-4 flex-col">
          <h2>PROFILE INFORMATION</h2>
          <p className="italic text-xs">
            This is your personal information regarding your user account with
            Timeline That
          </p>
          <p className="italic text-xs">Update your profile</p>
        </div>

        <ProfileImageUpload />
        <MainFieldContainer>
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
              // disabled
              // onChange={(e: any) => handleInputChange(e, "firstName")}
            />
            <TextInput
              label="Email:"
              type="email"
              value={session?.user.email}
              // disabled
              // onChange={(e: any) => handleInputChange(e, "firstName")}
            />
          </EmailUsernameInformation>
          <TextInput
            label="Password"
            type="password"
            value={session?.user.password}
            // onChange={(e: any) => handleInputChange(e, "firstName")}
          />
        </MainFieldContainer>
        <ButtonContainer>
          <Button color="primary">Edit</Button>

          <Button color="primary">Save</Button>
        </ButtonContainer>
      </Form>
    </MainContainer>
  );
}

export default ProfileComponent;
