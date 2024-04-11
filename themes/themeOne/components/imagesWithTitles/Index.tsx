import React from "react";
import styled from "styled-components";
import { pLarge } from "../../styles/Type";
import { Container, MediaQueries } from "@/styles/Utilities";
import formatDate from "@/lib/formatDate";
import { motion } from "framer-motion";
import { pXSmall } from "@/styles/Type";

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
  text-align: center;
  p {
    max-width: 650px;
    ${pXSmall}
    text-align: center;
  }
`;

interface ImagesContainerProps {
  children: React.ReactNode;
}

const ImagesContainer = styled(motion.div)<ImagesContainerProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-content: center;
  ${(props) => {
    const itemCount = React.Children.count(props.children);
    if (itemCount <= 4) {
      return `
        grid-template-columns: repeat(${itemCount}, 1fr);
      `;
    }
  }}

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
        [key: string]: string[] | undefined;
      };
      color?: string;
      theme?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];

  return (
    <ImagesWithTitlesContainer>
      {Object.keys(uploadDatas).map((key, index) => (
        <IndividualAgeContainer color={color} key={key}>
          <IndividualInnerContainer>
            <h3>{key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}</h3>
            <p>{uploadDatas[key].ageText}</p>
            <ImagesContainer
              key={`key-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: `0.6` }}
              viewport={{ once: true }}
            >
              {uploadDatas[key].images?.map((src: string, index: number) => (
                <img
                  key={`key-${index + 1}`}
                  src={src}
                  alt={`Image ${index}`}
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
