import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { MediaQueries } from "@/styles/Utilities";
import { useRouter } from "next/router";
import TimelineIcon from "@/components/reusable/svg/timelineIcon/Index";
import MediaIcon from "@/components/reusable/svg/mediaIcon/Index";
import ThemeIcon from "@/components/reusable/svg/themeIcon/Index";
import PurchaseIcon from "@/components/reusable/svg/purchaseIcon/Index";

const NavContainer = styled.div`
  padding: 20px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 224px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 102;
  background-color: ${variables.lightBlue};
  justify-content: space-between;
  @media ${MediaQueries.tablet} {
    display: none;
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
      color: ${variables.white};
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
        background-color: ${variables.lightOrange};
        transform: scale(1.05);
        a {
        }
      }
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Logo = styled.img`
  width: 150px;
  @media ${MediaQueries.mobile} {
    width: 140px;
  }
`;

const Clock = styled.img`
  min-width: 200px;
  width: 100%;
  overflow: hidden;
  margin-left: -90px;
  @media ${MediaQueries.mobile} {
    width: 140px;
  }
`;

function TabNavigation() {
  const router = useRouter();
  const initialActiveTab = router.pathname;

  return (
    <NavContainer>
      <TabContainer>
        <Logo src="/timeline_that_logo_white.svg" alt="Timeline That Logo" />
        <ul>
          <motion.li
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(204, 109, 61, 0.5)",
            }}
            className={
              initialActiveTab === "/auth/timeline" ||
              initialActiveTab === "/auth/new" ||
              initialActiveTab === "/auth/edit"
                ? "active"
                : ""
            }
          >
            <Link href="/auth/timeline">
              <TimelineIcon color={`${variables.white}`} />
              Timeline
            </Link>
          </motion.li>
          <motion.li
            className={
              initialActiveTab === "/auth/media-library" ? "active" : ""
            }
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(204, 109, 61, 0.5)",
            }}
          >
            <Link href="/auth/media-library">
              <MediaIcon color={`${variables.white}`} />
              Media Library
            </Link>
          </motion.li>

          <motion.li
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(204, 109, 61, 0.5)",
            }}
            className={initialActiveTab === "/auth/themes" ? "active" : ""}
          >
            <Link href="/auth/themes">
              <ThemeIcon color={`${variables.white}`} />
              Themes
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(204, 109, 61, 0.5)",
            }}
            className={
              initialActiveTab === "/auth/subscription" ? "active" : ""
            }
          >
            <Link href="/auth/subscription">
              <PurchaseIcon color={`${variables.white}`} />
              Purchase
            </Link>
          </motion.li>
        </ul>
      </TabContainer>
      <Clock src="/clock-bg.svg" alt="Timeline That Logo" />
    </NavContainer>
  );
}

export default TabNavigation;
