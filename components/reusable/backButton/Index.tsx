import { variables } from "@/styles/Variables";
import Link from "next/link";
import React from "react";
import ReturnIcon from "../svg/returnIcon/Index";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${variables.black};
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: transparent;
  transition: background-color 0.3s ease-in;
  padding-right: 4px;
  padding-left: 4px;
  border-radius: 12px;
  &:hover {
    transition: background-color 0.3s ease-in;
    background-color: rgba(204, 109, 61, 0.5);
    border-radius: 12px;
  }
`;

function BackButton() {
  return (
    <StyledLink
      href="/auth/timeline"
      //   style={{
      //     color: `${variables.black}`,
      //     display: "flex",
      //     alignItems: "center",
      //     gap: "4px",
      //   }}
    >
      <ReturnIcon color={`${variables.black}`} />
      Back
    </StyledLink>
  );
}

export default BackButton;
