import { pLarge, pBase } from "@/styles/Type";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { variables } from "@/styles/Variables";
import { Container, MediaQueries } from "@/styles/Utilities";
import { motion } from "framer-motion";
import { themeData } from "@/themes/themeData";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import MainContainer from "../reusable/mainContainer/Index";
import Title from "../reusable/title/Index";

const ExamplesContainer = styled.div``;

const ExamplesInnerContainer = styled.div``;

function AllThemes() {
  return (
    <>
      <ExamplesContainer>
        <ExamplesInnerContainer>
          <Title name={`Theme examples (${themeData.length} themes)`} />
          <MainContainer>
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
          </MainContainer>
        </ExamplesInnerContainer>
      </ExamplesContainer>
    </>
  );
}

export default AllThemes;
