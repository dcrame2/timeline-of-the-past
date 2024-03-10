import React from "react";
import styled from "styled-components";
import AddNewPersonButton from "../reusable/addNewPersonButton/Index";
import AuthSignOutButton from "../reusable/authSIgnOutButton/Index";
import { motion } from "framer-motion";

const NavContainer = styled.div`
  padding: 100px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  grid-area: navigation;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: linear-gradient(to right, #09203f 0%, #537895 100%); */

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    li {
      padding: 12px;
      color: #060606;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: center;

      img {
        width: 20px;
      }

      &.active {
        background-color: white;
        transform: scale(1.05);
        /* box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 4px; */
        /* border-radius: 12px; */
      }
    }
  }
`;

function TabNavigation({
  setShowAddPersonFields,
  showAddPersonFields,
  fetchData,
}: any) {
  return (
    <NavContainer>
      <ul>
        <motion.li
          whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}
          className="active"
        >
          <img src="/timeline_icon.png" alt="icon" />
          Timeline
        </motion.li>
        <motion.li whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}>
          {" "}
          <img src="/media_icon.png" alt="icon" />
          Media Library
        </motion.li>
        <motion.li whileHover={{ scale: 1.05, backgroundColor: "#dddddd" }}>
          {" "}
          <img src="/subscription_icon.png" alt="icon" />
          Subscription
        </motion.li>
      </ul>

      <AuthSignOutButton />
    </NavContainer>
  );
}

export default TabNavigation;
