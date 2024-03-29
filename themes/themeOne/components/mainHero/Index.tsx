import { h1styles, pLarge } from "../../styles/Type";
import React from "react";
import styled from "styled-components";

const MainHeroContainer = styled.div`
  background-color: ${({ color }) => color};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    ${h1styles}
    text-align: center;
  }
  p {
    ${pLarge}
  }
`;

interface Person {
  data: [
    {
      slug?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      dob?: string;
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

function MainHero({ data }: Person) {
  const { firstName, middleName, lastName, color } = data[0];
  return (
    <MainHeroContainer color={color}>
      <p>The Life of</p>
      <h1>
        {firstName} {middleName} {lastName}
      </h1>
    </MainHeroContainer>
  );
}

export default MainHero;
