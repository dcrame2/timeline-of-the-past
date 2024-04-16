import { pLarge, pBase } from "@/styles/Type";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { variables } from "@/styles/Variables";
import { Container, MediaQueries } from "@/styles/Utilities";
import { motion } from "framer-motion";
import { themeData } from "@/themes/themeData";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const ExamplesContainer = styled.div``;

const ExamplesInnerContainer = styled.div``;

const TextContainer = styled.div`
  gap: 20px;
  @media ${MediaQueries.tablet} {
    gap: 12px;
  }
  @media ${MediaQueries.mobile} {
    gap: 8px;
  }
  h1 {
    ${pBase}
    margin: 24px;
  }
  p {
    ${pBase}
    max-width: 1000px;
  }
`;

const ExampleCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.mobile} {
    padding: 24px 24px;
  }
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

function AllThemes() {
  return (
    <>
      {/* <ExamplesContainer>
        <ExamplesInnerContainer>
          <TextContainer>
            <h1>Theme examples you can use</h1>
          </TextContainer>
          <ExampleCardsContainer>
            {themeData.map((example) => {
              const { url, img, name } = example;
              return (
                <IndividualCard key={name} target="_blank" href={url}>
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
      </ExamplesContainer> */}
      <ExamplesContainer>
        <ExamplesInnerContainer>
          <TextContainer>
            <h1>Theme examples you can use</h1>
          </TextContainer>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {themeData.map((example, index) => (
              <Link target="_blank" href={example.url}>
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  isHoverable={true}
                  onPress={() => console.log("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={example.img.alt}
                      className="w-full object-cover h-[140px]"
                      src={example.img.src}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{example.name}</b>
                    <p className="text-default-500">{example.name}</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </ExamplesInnerContainer>
      </ExamplesContainer>
    </>
  );
}

export default AllThemes;
