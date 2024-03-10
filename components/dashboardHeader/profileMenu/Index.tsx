import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProfileContainer = styled(motion.div)`
  padding: 12px;
  border-radius: 12px;
  background-color: red;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    li {
      padding: 12px;
      color: #060606;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
`;

function ProfileMenu() {
  const motionPropsIn = {
    initial: {
      opacity: 0,
      //   y: "100%",
    },
    animate: {
      //   y: 0,
      opacity: 1,
    },
    exit: {
      //   y: "100%",
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };
  return (
    <ProfileContainer {...motionPropsIn}>
      <ul>
        <li>Profile</li>
        <li>Settings</li>
        <li>Log out</li>
      </ul>
    </ProfileContainer>
  );
}

export default ProfileMenu;
