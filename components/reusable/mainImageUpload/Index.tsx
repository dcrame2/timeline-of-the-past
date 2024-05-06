import { h2styles, pXSmall } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { Dialog, Transition } from "@headlessui/react";
import {
  PhotoIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Button, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CldUploadButton } from "next-cloudinary";
import React, { Fragment, useState } from "react";
import styled from "styled-components";

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  grid-column: 2;
  grid-row: 1;

  p {
    ${pXSmall}
  }
`;

const SingleImageContainer = styled.div`
  position: relative;
  button {
    position: absolute;
    top: -3px;
    right: 0px;
    background-color: ${variables.black};
    color: ${variables.white};
    border: none;
    width: 20px;
    height: 20px;
    font-size: 12px;
    z-index: 5;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SingleImage = styled.img`
  z-index: 2;
`;

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
  grid-column: 2;
  grid-column: 2;
  transition: background-color ease-in 0.2s;
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

const IndividualImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  padding: 4px;
  background-color: ${variables.darkerLightGrey};
  border: 1px solid ${variables.darkBlue};
  border-radius: 8px;
  align-items: center;
  gap: 24px;
  width: 100%;
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
  /* width: 50px;
  height: 50px; */
  @media ${MediaQueries.mobile} {
  }
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

function MainImageUpload({
  mainImage,
  handleSingleRemoveImage,
  handleOnChange,
}: any) {
  return (
    <>
      <MainContainerForImage>
        <div className="col-span-full">
          <label
            htmlFor="photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Main Photo
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            {!mainImage ? (
              <UserCircleIcon
                className="h-16 w-16 text-black"
                aria-hidden="true"
              />
            ) : (
              <SingleImageContainer>
                <button onClick={(e) => handleSingleRemoveImage(mainImage, e)}>
                  x
                </button>
                <SingleImage
                  className="rounded-full w-16 h-16"
                  src={mainImage}
                  alt="Uploaded image"
                ></SingleImage>
              </SingleImageContainer>
            )}

            <Button
              type="button"
              size="sm"
              className="text-white fit-content bg-lightOrange border-lightBlue inline px-4"
              isDisabled={mainImage ? true : false}
            >
              <CldUploadButton
                uploadPreset="my-uploads"
                onSuccess={handleOnChange}
              >
                Change
              </CldUploadButton>
            </Button>
          </div>
        </div>
      </MainContainerForImage>
    </>
  );
}

export default MainImageUpload;
