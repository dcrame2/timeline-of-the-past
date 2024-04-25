// import { variables } from "@/styles/Variables";
// import React from "react";
// import styled from "styled-components";

// const OuterContainer = styled.div`
//   max-width: 1000px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   background-color: ${variables.lightGrey};
//   padding: 24px;
//   border-radius: 12px;
//   box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
// `;

// function MainContainer({ children }: { children: React.ReactNode }) {
//   return <OuterContainer>{children}</OuterContainer>;
// }

// export default MainContainer;

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
`;

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <OuterContainer>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}

export default MainContainer;
