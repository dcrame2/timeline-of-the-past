import { Card, Skeleton } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";

const ImageIcon = styled.img`
  width: 20px !important;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function EmptyImageCard() {
  return (
    <Card
      disableAnimation={true}
      className="w-[100%] relative shadow-none h-full bg-customGray"
      radius="md"
    >
      <Skeleton isLoaded={true} className="rounded-lg">
        <div className="h-48 rounded-lg bg-customGray"></div>
      </Skeleton>
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon src="/main_image_icon.svg" alt="Upload icon"></ImageIcon>
      </div>
    </Card>
  );
}

export default EmptyImageCard;
