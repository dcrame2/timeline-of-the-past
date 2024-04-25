import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  background-color: ${variables.lightGrey};
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  height: calc(80dvh - 24px);
  overflow-y: auto;

  h2 {
    color: ${variables.black};
    grid-column: 1 / span 2;
    letter-spacing: 1.5px;
  }
`;

const InnerContainer = styled.div`
  padding: 24px;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @media ${MediaQueries.tablet} {
    padding: 16px;
  }
  @media ${MediaQueries.mobile} {
    padding: 12px;
  }
`;

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <OuterContainer>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}

export default MainContainer;
