import React, { useState } from "react";
import styled from "styled-components";
import AddNewPersonButton from "../../../reusable/addNewPersonButton/Index";
import AuthSignOutButton from "../../../reusable/authSIgnOutButton/Index";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { MediaQueries } from "@/styles/Utilities";
import { useRouter } from "next/router";

const NavContainer = styled.div`
  padding: 100px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 102;
  @media ${MediaQueries.mobile} {
    top: unset;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    @media ${MediaQueries.tablet} {
      display: none;
    }
    li {
      color: ${variables.black};
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;

      a {
        padding: 12px;
        display: flex;
        gap: 12px;
        align-items: center;
      }

      img {
        width: 20px;
      }

      &.active {
        background-color: ${variables.white};
        transform: scale(1.05);
      }
    }
  }
`;

function TabNavigation() {
  const router = useRouter();
  const initialActiveTab = router.pathname;

  return (
    <NavContainer>
      <ul>
        <motion.li
          whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}
          className={initialActiveTab === "/auth/timeline" ? "active" : ""}
        >
          <Link href="/auth/timeline">
            <img src="/timeline_icon.png" alt="icon" />
            Timeline
          </Link>
        </motion.li>
        <motion.li
          className={initialActiveTab === "/auth/media-library" ? "active" : ""}
          whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}
        >
          <Link href="/auth/media-library">
            <img src="/media_icon.png" alt="icon" />
            Media Library
          </Link>
        </motion.li>

        <motion.li
          whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}
          className={initialActiveTab === "/auth/themes" ? "active" : ""}
        >
          <Link href="/auth/themes">
            <img src="/subscription_icon.png" alt="icon" />
            Themes
          </Link>
        </motion.li>
      </ul>
    </NavContainer>
  );
}

export default TabNavigation;
