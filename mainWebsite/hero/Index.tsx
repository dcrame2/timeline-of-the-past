import React from "react";
import styled from "styled-components";
import { Container, MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { buttonType, h1styles, pBase } from "@/styles/Type";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const HeroContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${variables.darkBlue};
  background-image: url("time-clock-hero.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 2;
  background-size: cover;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 51, 80, 0.75); /* Adjust opacity as needed */
    z-index: 1; /* Ensure it's above the background image */
  }
`;

const HeroInnerContainer = styled.div`
  ${Container}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  /* padding-top: 200px;
  padding-bottom: 200px; */
  text-align: center;
  position: relative;
  z-index: 2;
  @media ${MediaQueries.tablet} {
    padding-top: 180px;
    padding-bottom: 180px;
  }
  @media ${MediaQueries.tablet} {
    padding-top: 120px;
    padding-bottom: 120px;
  }
  h1 {
    ${h1styles}
    color: ${variables.white};
    display: flex;
    align-items: cener;
    justify-content: center;
    span {
      margin-left: 30px;
      @media ${MediaQueries.tablet} {
        margin-left: 20px;
      }
      @media ${MediaQueries.mobile} {
        margin-left: 10px;
      }
    }
  }
  p {
    ${pBase}
    color: ${variables.white};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: cener;
  justify-content: center;
  max-width: 130px;
  @media ${MediaQueries.tablet} {
    max-width: 100px;
  }
  @media ${MediaQueries.tablet} {
    max-width: 30px;
  }
  img {
    width: 100%;
  }
`;

const HrImage = styled.img`
  width: 100%;
  max-width: 130px;
  margin: 0 -10px;
  @media ${MediaQueries.tablet} {
    max-width: 70px;
  }
  @media ${MediaQueries.mobile} {
    max-width: 30px;
    margin: 0 0;
  }
`;

const LinkStyled = styled(motion(Link))`
  ${buttonType}
  width: unset;
  margin-top: 12px;
`;

function Hero() {
  return (
    <HeroContainer>
      <HeroInnerContainer>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: `0.5` }}
          viewport={{ once: true }}
        >
          T
          <HrImage src="hourglass.svg" />
          MELINE
          <span>THAT</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: `0.5`, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Make History Yours:  */}
          Create Your Own Stunning Timelines
        </motion.p>
        <Button
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ duration: `0.5`, delay: 0.8 }}
          // viewport={{ once: true }}
          as={Link}
          href="/auth/authenticate"
          style={{
            backgroundColor: `${variables.lightOrange}`,
            color: `${variables.white}`,
          }}
        >
          Login or Sign Up
        </Button>
      </HeroInnerContainer>
    </HeroContainer>
  );
}

export default Hero;
