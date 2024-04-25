import { h2styles, pBase } from "@/styles/Type";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { variables } from "@/styles/Variables";
import { Container, MediaQueries } from "@/styles/Utilities";
import { motion } from "framer-motion";
import { themeData } from "@/themes/themeData";

import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";

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

function Examples() {
  return (
    <ExamplesContainer>
      <ExamplesInnerContainer>
        <TextContainer>
          <h2>Check out examples</h2>
          <p>
            Build your own timelines, whether its your own, your childs, your
            pet(s) or a team
          </p>
        </TextContainer>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {themeData.slice(0, 4).map((example, index) => (
            <Link target="_blank" href={example.url}>
              <Card
                className="w-full"
                shadow="sm"
                key={index}
                isPressable
                isHoverable={true}
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
  );
}

export default Examples;
