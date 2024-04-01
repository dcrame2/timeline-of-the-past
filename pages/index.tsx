import { h2styles, pBase, buttonType } from "@/styles/Type";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Hero from "@/mainWebsite/hero/Index";
import { Container, MediaQueries } from "@/styles/Utilities";
import Examples from "@/mainWebsite/examples/Index";

const LayoutContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  ${Container}
  /* padding-top: 20px; */
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  @media ${MediaQueries.tablet} {
    width: 150px;
  }
`;

const LinkStyled = styled(Link)`
  ${buttonType}
  width: unset;
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
          <Logo src="/timeline_that_logo.png" alt="Timeline That Logo" />
          <LinkStyled href="/auth/authenticate">Login or sign up</LinkStyled>
        </LayoutContainer>
        <Hero />
        <Examples />
      </main>
    </>
  );
}
