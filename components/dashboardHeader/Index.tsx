import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./profileMenu/Index";

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
  /* margin-right: 24px; */
  img {
    width: 30px;
  }
`;

const ProfileMenuContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-right: 24px;
`;

function DashboardHeader() {
  const [openProfileManu, setOpenProfileMenu] = useState(false);

  const profileBtnHandler = () => {
    setOpenProfileMenu(!openProfileManu);
  };
  return (
    <Container>
      <BusinessName>Timeline It</BusinessName>

      <ProfileMenuContainer>
        <ProfileBtn onClick={profileBtnHandler} whileHover={{ scale: 1.05 }}>
          {" "}
          <img src="/profile_icon.png" alt="icon" />
        </ProfileBtn>
        <AnimatePresence mode="wait">
          {openProfileManu && <ProfileMenu />}
        </AnimatePresence>
      </ProfileMenuContainer>
    </Container>
  );
}

export default DashboardHeader;
