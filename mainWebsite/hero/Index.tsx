import React from "react";
import styled from "styled-components";
import { Container, MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { buttonType, h1styles, pBase } from "@/styles/Type";
import Link from "next/link";

const HeroContainer = styled.div`
  width: 100%;
  background-color: ${variables.darkBlue};
  background-image: url("hourglass.svg");
  background-position: center center;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */

  background-size: 30%;

  @media ${MediaQueries.tablet} {
    background-size: 30%;
  }
  @media ${MediaQueries.mobile} {
    background-size: 50%;
  }
`;

const HeroInnerContainer = styled.div`
  ${Container}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-top: 200px;
  padding-bottom: 200px;
  text-align: center;
  @media ${MediaQueries.tablet} {
    padding-top: 180px;
    padding-bottom: 180px;
  }
  h1 {
    ${h1styles}
    color: ${variables.white};
  }
  p {
    ${pBase}
    color: ${variables.white};
  }
`;

const LinkStyled = styled(Link)`
  ${buttonType}
  width: unset;
  margin-top: 12px;
`;

function Hero() {
  return (
    <HeroContainer>
      <HeroInnerContainer>
        <h1>TIMELINE THAT</h1>
        <p>Make History Yours: Create Stunning Timelines</p>
        <LinkStyled href="/auth/authenticate">Login or sign up</LinkStyled>
      </HeroInnerContainer>
    </HeroContainer>
  );
}

export default Hero;
