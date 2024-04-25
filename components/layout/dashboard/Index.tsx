import React from "react";
import styled from "styled-components";
import TabNavigation from "./tabNavigation/Index";
import DashboardHeader from "./dashboardHeader/Index";
import { MediaQueries } from "@/styles/Utilities";

const Container = styled.div`
  display: grid;
  grid-template-columns: 224px 1fr 1fr;
  grid-template-rows: 1fr;

  @media ${MediaQueries.tablet} {
    grid-template-columns: 1fr;
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

const StyledHeader = styled(DashboardHeader)``;

const ContentSection = styled.div`
  grid-column: 2 / span 3;
  grid-row: 2;
  margin: 48px 24px;
  overflow-y: hidden;
  @media ${MediaQueries.tablet} {
    margin: 72px 12px 0;
    grid-column: unset;
  }
  @media ${MediaQueries.mobile} {
    margin: 24px 12px 0;
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
