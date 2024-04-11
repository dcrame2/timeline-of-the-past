import { Container, MediaQueries } from "@/styles/Utilities";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { buttonType } from "../../styles/Type";
import { linkStyles } from "@/styles/Type";

const FooterContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`;

const FooterInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  ${Container}
`;

const Logo = styled.img`
  width: 200px;
  @media ${MediaQueries.tablet} {
    width: 150px;
  }
`;

const LinkStyled = styled(Link)`
  /* ${buttonType} */
  ${linkStyles}
  width: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      theme?: string;
    }
  ];
}

function Footer({ data }: Person) {
  const { color } = data[0];
  return (
    <FooterContainer color={color}>
      <FooterInnerContainer>
        <LinkStyled target="_blank" href="/">
          <Logo src="/timeline_that_logo_white.svg" alt="Timeline That Logo" />
          https://timelinethat.com
        </LinkStyled>
      </FooterInnerContainer>
    </FooterContainer>
  );
}

export default Footer;
