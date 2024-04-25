import { h1stylesdashboard } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import React from "react";
import styled from "styled-components";

const TitleHeader = styled.h1`
  ${h1stylesdashboard}
  padding-bottom: 8px;
  padding-left: 24px;
  /* text-transform: uppercase; */
  font-weight: 600;
  @media ${MediaQueries.tablet} {
    padding-left: 16px;
  }
  @media ${MediaQueries.mobile} {
    padding-left: 12px;
  }
`;

function Title({ name }: { name: string }) {
  return <TitleHeader>{name}</TitleHeader>;
}

export default Title;
