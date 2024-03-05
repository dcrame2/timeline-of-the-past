import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormContainer = styled(motion.div)`
  width: 60vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`;

const motionPropsRight = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "100%",
    opacity: 0,
  },
  transition: {
    duration: 0.4,
  },
};

function EditPeopleScreen({ showEditScreen }: { showEditScreen: boolean }) {
  return (
    <FormContainer {...motionPropsRight}>
      <p>hi</p>
    </FormContainer>
  );
}

export default EditPeopleScreen;
