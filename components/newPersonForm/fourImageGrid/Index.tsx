import { h2styles } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";
import { Image } from "@nextui-org/react";
import EmptyImageCard from "@/components/reusable/emptyImageCard/Index";
const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-column: 1 / span 2; */
  gap: 10px;
  grid-column: 2;

  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageContainer = styled.div`
  background-color: ${variables.lightGrey};
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;
  ${h2styles};

  img {
    object-fit: contain;
  }
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: ${variables.white};
    color: black;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function FourImageGrid({
  uploadDatas,
  selectedAge,
  handleRemoveImage,
}: {
  uploadDatas: any;
  selectedAge: number;
  handleRemoveImage: any;
}) {
  return (
    <ImageGridContainer>
      {uploadDatas[selectedAge]?.images?.map((src: string, index: number) => (
        <ImageContainer>
          <Image width={300} src={src} alt={`Image ${index}`} />
          <button onClick={(e) => handleRemoveImage(src, index, e)}>x</button>
        </ImageContainer>
      ))}
      {[
        ...Array(
          Math.max(0, 4 - (uploadDatas[selectedAge]?.images?.length || 0))
        ),
      ].map((_, index) => (
        <EmptyImageCard />
      ))}
    </ImageGridContainer>
  );
}

export default FourImageGrid;
