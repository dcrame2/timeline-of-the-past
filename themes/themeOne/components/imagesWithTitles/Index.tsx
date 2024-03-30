import React from "react";
import styled from "styled-components";
import { pLarge } from "../../styles/Type";
import { Container, MediaQueries } from "@/styles/Utilities";
import formatDate from "@/lib/formatDate";

const ImagesWithTitlesContainer = styled.div`
  margin-top: 88px;
  margin-bottom: 88px;
  display: flex;
  flex-direction: column-reverse;
  gap: 80px;
`;

const IndividualAgeContainer = styled.div`
  h3 {
    ${pLarge}
    color:  ${({ color }) => color};
  }
`;

const IndividualInnerContainer = styled.div`
  ${Container}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }

  img {
    max-width: 300px;
    width: 100%;
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
        [key: string]: string[] | undefined; // Assuming the keys are numbers and values are string arrays
      };
      color?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];
  console.log(uploadDatas, "uploadDatas");

  return (
    <ImagesWithTitlesContainer>
      {Object.keys(uploadDatas).map((key) => (
        <IndividualAgeContainer color={color} key={key}>
          <IndividualInnerContainer>
            <h3>{key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}</h3>
            <ImagesContainer>
              {uploadDatas[key].map((src: string, index: number) => (
                <img
                  key={index}
                  src={src}
                  alt={`Image ${index}`}
                  // style={{ maxWidth: "100px", margin: "5px" }}
                />
              ))}
            </ImagesContainer>
          </IndividualInnerContainer>
        </IndividualAgeContainer>
      ))}
    </ImagesWithTitlesContainer>
  );
}

export default ImagesWithTitles;
