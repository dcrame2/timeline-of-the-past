import React from "react";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { buttonType } from "@/styles/Type";

const SignOutButton = styled.button`
  ${buttonType}
`;

export default function AuthSignOutButton() {
  function signOutHandler() {
    signOut({ callbackUrl: "/" });
  }
  return <SignOutButton onClick={signOutHandler}>Sign Out</SignOutButton>;
}
