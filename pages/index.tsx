import { h2styles, pBase, buttonType, linkStyles } from "@/styles/Type";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Hero from "@/mainWebsite/hero/Index";
import { Container, MediaQueries } from "@/styles/Utilities";
import Examples from "@/mainWebsite/examples/Index";
import Video from "@/mainWebsite/video/Index";
import { variables } from "@/styles/Variables";
import Testimonials from "@/mainWebsite/testimonials/Index";

const LayoutContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  ${Container}
  /* padding-top: 20px; */
  align-items: center;
  position: absolute;
  width: 100%;
  z-index: 5;
  padding-bottom: 8px;
  padding-top: 8px;
  background-color: ${variables.white};
`;

const Logo = styled.img`
  width: 200px;
  @media ${MediaQueries.tablet} {
    width: 150px;
  }
  @media ${MediaQueries.mobile} {
    width: 120px;
  }
`;

const LinkStyled = styled(Link)`
  ${buttonType}
  width: unset;
  @media ${MediaQueries.mobile} {
    font-size: 14px;
  }
`;

const FooterContainer = styled.footer`
  background-color: ${variables.lightBlue};
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

const LinkStyledLink = styled(Link)`
  /* ${buttonType} */
  ${linkStyles}
  width: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Timeline That</title>
        <meta
          name="description"
          content="Timeline That allows users to create timelines for themselves, their child or anything related to time"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main>
        <LayoutContainer>
          <Logo src="/timeline_that_logo_blue.svg" alt="Timeline That Logo" />
          <LinkStyled href="/auth/authenticate">Login or Sign Up</LinkStyled>
        </LayoutContainer>
        <Hero />
        <Examples />
        <Video />
        <Testimonials />
        <FooterContainer>
          <FooterInnerContainer>
            <LinkStyledLink target="_blank" href="/">
              <Logo
                src="/timeline_that_logo_white.svg"
                alt="Timeline That Logo"
              />
              https://timelinethat.com
            </LinkStyledLink>
          </FooterInnerContainer>
        </FooterContainer>
      </main>
    </>
  );
}
