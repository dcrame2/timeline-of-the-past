import React, { useRef } from "react";
import styled from "styled-components";
import { pLarge } from "../../styles/Type";
import { Container, MediaQueries } from "@/styles/Utilities";
import formatDate from "@/lib/formatDate";
import { AnimatePresence, motion, useInView } from "framer-motion";

const ImagesWithTitlesContainer = styled.div`
  margin-top: 88px;
  margin-bottom: 88px;
  display: flex;
  flex-direction: column-reverse;
  gap: 80px;
`;

interface IndividualAgeContainerProps {
  reverseRow?: boolean;
  color?: string;
}

const IndividualAgeContainer = styled.div<IndividualAgeContainerProps>`
  h3 {
    ${pLarge}
    color:  ${({ color }) => color};
  }

  ${({ reverseRow }) =>
    reverseRow &&
    `
    ${IndividualInnerContainer} {
      flex-direction: row-reverse;
      @media ${MediaQueries.tablet} {
    flex-direction: column;
  }
    }
  `}
`;

const IndividualInnerContainer = styled.div`
  ${Container}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media ${MediaQueries.tablet} {
    flex-direction: column;
  }
`;

interface ImagesContainerProps {
  children: React.ReactNode;
}

const ImagesContainer = styled(motion.div)<ImagesContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center; /* Center items horizontally */
  align-content: center;

  gap: 10px;
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  /* @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  } */
`;

const ImageWrapper = styled.div`
  display: flex;

  img {
    max-width: 200px;
    width: 100%;
    object-fit: cover;
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
      theme?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];
  console.log(uploadDatas, "uploadDatas");

  const motionPropsFadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };

  return (
    <ImagesWithTitlesContainer>
      {/* <AnimatePresence> */}
      {Object.keys(uploadDatas).map((key, index) => (
        <IndividualAgeContainer
          color={color}
          key={key}
          reverseRow={index % 2 !== 0}
        >
          <IndividualInnerContainer>
            <h3>{key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}</h3>

            <ImagesContainer
              key={`key-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: `0.6` }}
              viewport={{ once: true }}
            >
              {uploadDatas[key].images?.map((src: string, index: number) => (
                <ImageWrapper key={index}>
                  <img
                    key={`key-${index + 1}`}
                    src={src}
                    alt={`Image ${index}`}
                  />
                </ImageWrapper>
              ))}
            </ImagesContainer>
          </IndividualInnerContainer>
        </IndividualAgeContainer>
      ))}
      {/* </AnimatePresence> */}
    </ImagesWithTitlesContainer>
  );
}

export default ImagesWithTitles;
