import React from "react";
import styled from "styled-components";
import { Container } from "../../styles/Type";
import { MediaQueries } from "../../styles/Utilities";
import Link from "next/link";

const Nav = styled.nav`
  background-color: ${({ color }) => color};
  position: absolute;
`;

const NavInnerContainer = styled.div`
  ${Container}

  padding-top: 12px;
  padding-bottom: 12px;
`;

const Logo = styled.img`
  width: 200px;
  @media ${MediaQueries.tablet} {
    width: 150px;
  }
`;

interface Person {
  data: [
    {
      slug?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      dob?: any;
      death?: string;
      facebookLink?: string;
      linkedinLink?: string;
      twitterLink?: string;
      uploadDatas?: {
        [key: string]: string[] | undefined;
      };
      color?: string;
    }
  ];
}

function Navigation({ data }: Person) {
  const { color } = data[0];
  return (
    <Nav color={color}>
      <NavInnerContainer>
        <Link target="_blank" href="/">
          <Logo src="/timeline_that_logo.png" alt="Timeline That Logo" />
        </Link>
      </NavInnerContainer>
    </Nav>
  );
}

export default Navigation;
