import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  /* padding: 20px; */
  display: flex;
  justify-content: space-between;
`;

const BusinessName = styled.p`
  color: steelblue;
  font-weight: 600;
  font-size: 20px;
`;

const ProfileBtn = styled(motion.button)`
  background-color: transparent;
  border: none;
  margin-right: 24px;
  img {
    width: 30px;
  }
`;

function DashboardHeader() {
  return (
    <Container>
      <BusinessName>Timeline It</BusinessName>
      <ProfileBtn whileHover={{ scale: 1.05 }}>
        {" "}
        <img src="/profile_icon.png" alt="icon" />
      </ProfileBtn>
    </Container>
  );
}

export default DashboardHeader;
