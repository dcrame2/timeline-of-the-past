import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./profileMenu/Index";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";
import { Avatar } from "@nextui-org/react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  top: 0;
  right: 0;
  left: 0;
  max-width: 1285px;
`;

const ProfileBtn = styled(motion.button)`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 20px;
  left: 1285px;

  @media (max-width: 1310px) {
    right: 20px;
    left: unset;
  }
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
    <>
      {" "}
      <Container>
        {/* <Logo src="/timeline_that_logo_blue.svg" alt="Timeline That Logo" /> */}

        <ProfileMenuContainer>
          <ProfileBtn
            onClick={profileBtnHandler}
            whileHover={{ scale: 1.05 }}
            className="flex gap-4 items-center"
          >
            <Avatar
              size="sm"
              isBordered
              // color="warning"
              src="/profile_icon.png"
            />
          </ProfileBtn>
        </ProfileMenuContainer>
      </Container>
      <AnimatePresence mode="wait">
        {openProfileManu && <ProfileMenu />}
      </AnimatePresence>
    </>
  );
}

export default DashboardHeader;
