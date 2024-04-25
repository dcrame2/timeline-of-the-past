import React from "react";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { buttonType } from "@/styles/Type";
import { Button } from "@nextui-org/react";
import { variables } from "@/styles/Variables";
import Link from "next/link";

const SignOutButton = styled.button`
  ${buttonType}
`;

export default function AuthSignOutButton() {
  function signOutHandler() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <Button
      style={{
        backgroundColor: `${variables.lightOrange}`,
        color: `${variables.white}`,
      }}
      onClick={signOutHandler}
    >
      Sign Out
    </Button>
  );
}
