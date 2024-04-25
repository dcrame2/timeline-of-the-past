import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AuthSignOutButton from "@/components/reusable/authSIgnOutButton/Index";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { MediaQueries } from "@/styles/Utilities";
import TimelineIcon from "@/components/reusable/svg/timelineIcon/Index";
import MediaIcon from "@/components/reusable/svg/mediaIcon/Index";
import ThemeIcon from "@/components/reusable/svg/themeIcon/Index";
import PurchaseIcon from "@/components/reusable/svg/purchaseIcon/Index";

const ProfileContainer = styled(motion.div)`
  padding: 12px;
  border-radius: 12px;
  background-color: ${variables.lightGrey};
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  position: absolute;
  right: unset;
  top: 66px;
  z-index: 1000;
  left: 1140px;

  @media (max-width: 1310px) {
    right: 20px;
    left: unset;
  }
  @media ${MediaQueries.tablet} {
    right: 20px;
    left: unset;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* align-items: flex-end; */

    li {
      padding: 12px;
      color: ${variables.black};
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: center;
      a {
        /* padding: 12px; */
        display: flex;
        gap: 12px;
        align-items: center;
      }
      &.hide-on-desktop {
        display: none;
        @media ${MediaQueries.tablet} {
          display: block;
        }
      }
    }
  }
`;

function ProfileMenu() {
  const motionPropsIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };
  return (
    <ProfileContainer {...motionPropsIn}>
      <ul>
        <li className="hide-on-desktop">
          <Link href="/auth/timeline">
            <TimelineIcon color={`${variables.black}`} />
            Timeline
          </Link>
        </li>
        <li className="hide-on-desktop">
          <Link href="/auth/media-library">
            <MediaIcon color={`${variables.black}`} />
            Media Library
          </Link>
        </li>
        <li className="hide-on-desktop">
          <Link href="/auth/themes">
            <ThemeIcon color={`${variables.black}`} />
            Themes
          </Link>
        </li>
        <li>
          <Link href="/auth/profile">
            {" "}
            <img src="/profile_icon.png" alt="icon" />
            Profile
          </Link>
        </li>
        <li>
          <Link href="/auth/subscription">
            {" "}
            <PurchaseIcon color={`${variables.black}`} />
            Purchase
          </Link>
        </li>

        <AuthSignOutButton />
      </ul>
    </ProfileContainer>
  );
}

export default ProfileMenu;
