import React from "react";
import { motion } from "framer-motion";
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
  align-items: center;
  border: none;
  img {
    width: 30px;
  }
`;

export default function AddNewPersonButton({
  specificUserInfo,
}: {
  specificUserInfo: any;
}) {
  const remainingTimelines = specificUserInfo?.user?.remainingTimelines;
  return (
    <StyledLink
      href={remainingTimelines === 0 ? "/auth/timeline" : "/auth/new"}
      whileHover={{ scale: 1.1 }}
    >
      <img src="/add_icon.png" alt="icon" />
    </StyledLink>
  );
}
