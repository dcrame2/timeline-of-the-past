import React from "react";
import styled from "styled-components";
import { Image } from "@nextui-org/react";
import { pXSmall } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";

import { Button } from "@nextui-org/react";
import { variables } from "@/styles/Variables";
import { PhotoIcon } from "@heroicons/react/16/solid";

const MainImageUploadContainer = styled.div`
  height: 100%;
  background-color: #f4f4f5;
  border-radius: 12px;
  border: 1px dashed ${variables.darkBlue};
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  display: flex;
  transition: background-color ease-in 0.2s;
  display: flex;
  @media ${MediaQueries.mobile} {
    min-height: 200px;
  }
  &:hover {
    transition: background-color ease-in 0.2s;
    background-color: #e4e4e7;
  }
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    width: 20px;
  }
`;

const SingleImageContainer = styled.div`
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: ${variables.white};
    color: black;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 12px;
    z-index: 5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function UploadModal() {
  return (
    <>
      <div className="mt-2 w-full">
        <MainImageUploadContainer className=" min-h-16 w-full">
          <label htmlFor="file">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            Click or Drag and Drop Images
            <input
              id="file"
              type="file"
              name="file"
              accept="image/*"
              // onChange={(e) => handleOnChange(e)}
            />
          </label>
        </MainImageUploadContainer>
      </div>

      {/* {singleImageSrc && (
          <IndividualImageContainer>
            <ImageContainer>
              <img src={singleImageSrc} alt={`Uploaded image`} className="w-20" />
              <button onClick={(e) => handleSingleRemoveImage(mainImage, e)}>
                x
              </button>
            </ImageContainer>
            <Progress
              aria-label="Downloading..."
              size="md"
              // value={uploadProgress}
              color="success"
              showValueLabel={true}
              className="max-w-md"
            />
          </IndividualImageContainer>
        );
      } */}
    </>
  );
}

export default UploadModal;
