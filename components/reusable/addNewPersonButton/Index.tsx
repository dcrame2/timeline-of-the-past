import React from "react";
import { signOut } from "next-auth/react";
import NewPersonForm from "@/components/newPersonForm/Index";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(motion(Link))`
  padding: 12px;
  background-color: #7bb1dd;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 4px 8px;
  cursor: pointer;
  display: flex;
  /* gap: 12px; */
  align-items: center;
  border: none;
  img {
    width: 30px;
  }
`;

export default function AddNewPersonButton() {
  return (
    <StyledLink href="/auth/new" whileHover={{ scale: 1.1 }}>
      <img src="/add_icon.png" alt="icon" />
    </StyledLink>
  );
}
