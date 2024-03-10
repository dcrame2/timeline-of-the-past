import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AuthSignOutButton from "@/components/reusable/authSIgnOutButton/Index";
import { variables } from "@/styles/Variables";
import Link from "next/link";

const ProfileContainer = styled(motion.div)`
  padding: 12px 12px 12px 48px;
  border-radius: 12px;
  background-color: ${variables.lightGrey};
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    li {
      padding: 12px;
      color: ${variables.black};
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
        <li>
          <Link href="/auth/profile">Profile</Link>
        </li>
        <li>
          <Link href="/auth/subscription">Subscription</Link>
        </li>
        <li>
          <Link href="/auth/settings">Settings</Link>
        </li>
        <AuthSignOutButton />
      </ul>
    </ProfileContainer>
  );
}

export default ProfileMenu;
