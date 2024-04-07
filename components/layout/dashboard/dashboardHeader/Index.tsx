import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./profileMenu/Index";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / span 3;
  grid-row: 1 / span 3;
  padding: 24px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 1285px;
  z-index: 120;
  height: 75px;
  background-color: ${variables.darkerLightGrey};
`;

const Logo = styled.img`
  width: 200px;
  position: fixed;
`;

const ProfileBtn = styled(motion.button)`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  @media ${MediaQueries.tablet} {
    right: 20px;
  }
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
      <Logo src="/timeline_that_logo.png" alt="Timeline That Logo" />

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
