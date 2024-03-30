import { h2styles, pBase } from "@/styles/Type";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { variables } from "@/styles/Variables";
import { Container, MediaQueries } from "@/styles/Utilities";
import { motion } from "framer-motion";

const ExamplesContainer = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`;

const ExamplesInnerContainer = styled.div`
  ${Container}
`;

const TextContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media ${MediaQueries.tablet} {
    gap: 12px;
  }
  @media ${MediaQueries.mobile} {
    gap: 8px;
  }
  h2 {
    ${h2styles}
  }
  p {
    ${pBase}
    max-width: 1000px;
  }
`;

const data = [
  {
    url: "https://timelinethat.com/delilah-mae-davis",
    img: {
      src: "delilahmae.png",
      alt: "Delilah Mae Hero",
    },
    name: "Delilah Mae Davis",
  },
  {
    url: "https://timelinethat.com/delilah-mae-davis",
    img: {
      src: "delilahmae.png",
      alt: "Delilah Mae Hero",
    },
    name: "Delilah Mae Davis",
  },
  {
    url: "https://timelinethat.com/delilah-mae-davis",
    img: {
      src: "delilahmae.png",
      alt: "Delilah Mae Hero",
    },
    name: "Delilah Mae Davis",
  },
  {
    url: "https://timelinethat.com/delilah-mae-davis",
    img: {
      src: "delilahmae.png",
      alt: "Delilah Mae Hero",
    },
    name: "Delilah Mae Davis",
  },
];

const ExampleCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const IndividualCard = styled(Link)`
  border: 1px solid ${variables.lightBlue};
  border-radius: 8px;
  p {
    padding: 10px;
    color: ${variables.black};
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: ${variables.lightGrey};
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const MotionImage = styled(motion.img)`
  width: 100%;
  overflow: hidden;
  object-fit: cover;
`;

function Examples() {
  return (
    <ExamplesContainer>
      <ExamplesInnerContainer>
        <TextContainer>
          <h2>Check out examples</h2>
          <p>
            Build your own timelines, whether its your own, your childs, Elon
            Musk or the Chicago Cubs
          </p>
        </TextContainer>
        <ExampleCardsContainer>
          {data.map((example) => {
            const { url, img, name } = example;
            return (
              <IndividualCard target="_blank" href={url}>
                <ImageContainer>
                  <MotionImage
                    src={img.src}
                    alt={img.alt}
                    whileHover={{ scale: 1.1 }}
                  />
                </ImageContainer>
                <p>{name}</p>
              </IndividualCard>
            );
          })}
        </ExampleCardsContainer>
      </ExamplesInnerContainer>
    </ExamplesContainer>
  );
}

export default Examples;
