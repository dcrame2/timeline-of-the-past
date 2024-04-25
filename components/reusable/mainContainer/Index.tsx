import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${variables.lightGrey};
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
`;

function MainContainer({ children }: { children: React.ReactNode }) {
  return <OuterContainer>{children}</OuterContainer>;
}

export default MainContainer;
