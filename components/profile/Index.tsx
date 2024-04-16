import React from "react";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import TextInput from "../reusable/formFields/TextInput1";
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

const Form = styled.form`
  button {
    margin-bottom: 4px;
  }
`;

function ProfileComponent({ session }: any) {
  return (
    <ProfileContainer>
      <Form>
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
        <TextInput
          label="Username:"
          type="text"
          value={session?.user.username}
          // onChange={(e: any) => handleInputChange(e, "firstName")}
        />
        <TextInput
          label="Email:"
          type="email"
          value={session?.user.email}
          // onChange={(e: any) => handleInputChange(e, "firstName")}
        />
        <TextInput
          label="Password"
          type="password"
          value={session?.user.password}
          // onChange={(e: any) => handleInputChange(e, "firstName")}
        />
      </Form>
    </ProfileContainer>
  );
}

export default ProfileComponent;
