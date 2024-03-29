import { variables } from "@/styles/Variables";
import React, { useState, FormEvent, useContext } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { Context } from "@/pages/_app";
import { uploadFilesToCloudinary } from "@/lib/uploadFilesToCloudinary";
import { pXSmall } from "@/styles/Type";
import { AnimatePresence, motion } from "framer-motion";

const Form = styled.div`
  height: 100%;
  background-color: ${variables.lightGrey};
  border-radius: 12px;
  border: 2px dashed steelblue;
  position: relative;
  grid-column: 1 / span 2;
  padding: 30px 0;

  label {
    text-align: center;
    display: inline-block;
    width: 100%;
    padding: 1rem;
    z-index: 0;
  }
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    height: 100%;
  }
  button {
    position: relative;
    z-index: 1;
  }
  p {
    text-align: center;
    ${pXSmall}
  }
`;

const ImageMainContainer = styled(motion.div)`
  display: flex;
  gap: 8px;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 4px;
`;

const IsLoadingContainer = styled(motion.div)``;
const ImageUploadedContainer = styled(motion.div)``;

const ImageContainer = styled.div`
  max-height: 40px;
  max-width: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / span 2;
  gap: 10px;
`;

const ImageMediaContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: center;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const IndividualImageContainer = styled(motion.div)`
  display: flex;
  padding: 4px;
  background-color: ${variables.darkerLightGrey};
  border: 1px solid ${variables.darkBlue};
  border-radius: 8px;
  align-items: center;
  gap: 24px;
`;

const motionProps = {
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
    delay: 0.5,
  },
};
// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

function UploadFileInputNew({ selectedAge, uploadDatas, setUploadDatas }: any) {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = async (changeEvent: any) => {
    changeEvent.preventDefault();
    const files = changeEvent.target.files;
    const newImageSrcs: string[] = [];

    setIsLoading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (onLoadEvent: any) => {
        onLoadEvent.preventDefault();
        newImageSrcs.push(onLoadEvent.target.result);
        if (newImageSrcs.length === files.length) {
          setImageSrcs(newImageSrcs);

          // Upload files to cloudinary
          uploadFilesToCloudinary(files).then((uploadedUrls: string[]) => {
            // Once all files are uploaded, update the state with the accumulated URLs
            const updatedUploadDatas = {
              ...uploadDatas,
              [selectedAge]: [
                ...(uploadDatas[selectedAge] || []),
                ...uploadedUrls,
              ],
            };
            setUploadDatas(updatedUploadDatas);
            setIsLoading(false);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form>
        <label htmlFor="file">Drag and Drop images here</label>
        <input
          multiple
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => handleOnChange(e)}
        />
        <ImageMainContainer>
          <AnimatePresence mode="wait">
            {imageSrcs?.map((src: string, index: number) => (
              <IndividualImageContainer key={index} {...motionProps}>
                <ImageContainer>
                  <img key={index} src={src} alt={`Uploaded image ${index}`} />
                </ImageContainer>

                {isLoading ? (
                  <IsLoadingContainer>
                    <p style={{ color: "#2e2424" }}>Loading image(s)...</p>
                  </IsLoadingContainer>
                ) : (
                  <ImageUploadedContainer>
                    <p style={{ color: "#2e2424" }}>Image Uploaded</p>
                  </ImageUploadedContainer>
                )}
              </IndividualImageContainer>
            ))}
          </AnimatePresence>
        </ImageMainContainer>
      </Form>
      <MediaContainer>
        {imageSrcs?.map((src: string, index: number) => (
          <ImageMediaContainer>
            <img key={index} src={src} alt={`Uploaded image ${index}`} />
          </ImageMediaContainer>
        ))}
      </MediaContainer>
    </>
  );
}

export default UploadFileInputNew;
