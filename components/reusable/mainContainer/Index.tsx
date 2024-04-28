import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const OuterContainer = styled(motion.div)`
  background-color: ${variables.lightGrey};
  z-index: 1;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  height: calc(80dvh - 24px);
  overflow-y: auto;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 4px;
  margin: 4px;

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

const motionProps = {
  initial: {
    opacity: 0,
    // y: 100,
  },
  animate: {
    opacity: 1,
    // y: 0,
  },
  exit: {
    opacity: 0,
    // y: -100,
  },
  transition: {
    duration: 0.6,
  },
};

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <OuterContainer {...motionProps}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    </AnimatePresence>
  );
}

export default MainContainer;
