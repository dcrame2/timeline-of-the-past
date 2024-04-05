import React from "react";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import TextInput from "../reusable/formFields/TextInput";
import { Session } from "next-auth";

const ProfileContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 24px;
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  h3 {
    font-size: 20px;
    color: ${variables.black};
  }
  h6 {
    color: ${variables.black};
  }
`;

function ProfileComponent({ session }: any) {
  return (
    <ProfileContainer>
      {" "}
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
    </ProfileContainer>
  );
}

export default ProfileComponent;
