import { h1stylesdashboard } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TitleHeader = styled(motion.h1)`
  ${h1stylesdashboard}
  padding-bottom: 8px;
  padding-left: 24px;
  /* text-transform: uppercase; */
  font-weight: 600;
  @media ${MediaQueries.tablet} {
    padding-left: 16px;
  }
  @media ${MediaQueries.mobile} {
    padding-left: 12px;
  }
`;

const motionProps = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -50,
  },
  transition: {
    duration: 0.4,
  },
};

function Title({ name }: { name: string }) {
  return (
    <AnimatePresence mode="wait">
      <TitleHeader {...motionProps}>{name}</TitleHeader>
    </AnimatePresence>
  );
}

export default Title;
