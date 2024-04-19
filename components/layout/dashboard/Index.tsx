import React from "react";
import styled from "styled-components";
import TabNavigation from "./tabNavigation/Index";
import DashboardHeader from "./dashboardHeader/Index";
import { MediaQueries } from "@/styles/Utilities";

const Container = styled.div`
  display: grid;
  grid-template-columns: 224px 1fr 1fr;
  grid-template-rows: 75px 1fr;
  /* height: 100dvh; */

  @media ${MediaQueries.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: 75px 1fr 75px;
  }
`;

const StyledNavigation = styled(TabNavigation)`
  grid-column: 1;
  width: 254px;
  position: relative;
  @media ${MediaQueries.mobile} {
    grid-row: 3;
    grid-column: unset;
  }
`;

const StyledHeader = styled(DashboardHeader)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 3;
`;

const ContentSection = styled.div`
  grid-column: 2 / span 3;
  grid-row: 2;

  @media ${MediaQueries.tablet} {
    grid-column: unset;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <Container className={className}>
      <StyledHeader />
      <StyledNavigation />

      <ContentSection>{children}</ContentSection>
    </Container>
  );
}
