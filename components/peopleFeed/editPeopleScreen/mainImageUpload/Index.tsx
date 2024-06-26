import { h2styles, pXSmall } from "@/styles/Type";
import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Button, Image, Progress } from "@nextui-org/react";
import {
  PhotoIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { CldUploadButton } from "next-cloudinary";

const MainContainerForImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    ${pXSmall}
  }
`;

const MainImageUploadContainer = styled.div`
  height: 100%;
  background-color: ${variables.lightGrey};
  border-radius: 12px;
  border: 1px dashed ${variables.darkBlue};
  position: relative;
  transition: background-color ease-in 0.3s;
  display: flex;
  align-items: center;
  padding: 30px 30px;
  overflow: hidden;
  justify-content: center;
  @media ${MediaQueries.mobile} {
    min-height: 200px;
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
  &:hover {
    transition: background-color ease-in 0.3s;
    background-color: ${variables.veryLightBlue};
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
    top: -5px;
    right: 0px;
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

const SingleImage = styled(Image)`
  top: 0;
  left: 0;

  z-index: 2;
`;

function MainImageUpload({
  updatedPerson,
  handleOnChange,
  handleSingleRemoveImage,
  singleImageSrc,
  uploadProgress,
  setSingleImageSrc,
}: any) {
  const [open, setOpen] = useState(false);
  const openCoverModal = () => {
    setOpen(true);
    setSingleImageSrc(undefined);
  };
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
            {!updatedPerson.mainImage ? (
              <UserCircleIcon
                className="w-16 h-16 text-black"
                aria-hidden="true"
              />
            ) : (
              <SingleImageContainer>
                <button
                  onClick={(e) =>
                    handleSingleRemoveImage(updatedPerson.mainImage ?? "", e)
                  }
                >
                  x
                </button>
                <SingleImage
                  className="rounded-full w-16 h-16"
                  src={updatedPerson.mainImage}
                  alt="Uploaded image"
                ></SingleImage>
              </SingleImageContainer>
            )}

            <Button
              type="button"
              size="sm"
              className="text-white fit-content bg-lightOrange border-lightBlue inline px-4"
              isDisabled={updatedPerson.mainImage ? true : false}
            >
              <CldUploadButton
                uploadPreset="my-uploads"
                onSuccess={handleOnChange}
              >
                Change
              </CldUploadButton>
            </Button>
            {/* <Button
              onPress={openCoverModal}
              type="button"
              size="sm"
              className=" text-white bg-lightOrange border-lightBlue"
              isDisabled={updatedPerson.mainImage ? true : false}
            >
              Change
            </Button> */}
          </div>
        </div>
      </MainContainerForImage>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="  w-full">
                    <div className="mt-3 text-center  sm:mt-0 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-black"
                      >
                        Update Main Photo
                      </Dialog.Title>
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
                              onChange={(e) => handleOnChange(e)}
                            />
                          </label>
                        </MainImageUploadContainer>
                      </div>
                      {singleImageSrc && (
                        <IndividualImageContainer>
                          <ImageContainer>
                            <img
                              src={singleImageSrc}
                              alt={`Uploaded image`}
                              className="w-20"
                            />
                            {/* <button
                              onClick={(e) =>
                                handleSingleRemoveImage(mainImage, e)
                              }
                            >
                              x
                            </button> */}
                          </ImageContainer>
                          <Progress
                            aria-label="Downloading..."
                            size="md"
                            value={uploadProgress}
                            color="success"
                            showValueLabel={true}
                            className="max-w-md"
                          />
                        </IndividualImageContainer>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-lightBlue  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default MainImageUpload;
