import { variables } from "@/styles/Variables";
import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { uploadFilesToCloudinary } from "@/lib/uploadFilesToCloudinary";
import { MediaQueries } from "@/styles/Utilities";
import { pXSmall } from "@/styles/Type";

const Form = styled.div`
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
  @media ${MediaQueries.mobile} {
    min-height: 200px;
  }
  &:hover {
    transition: background-color ease-in 0.2s;
    background-color: #e4e4e7;
  }

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

function UploadFileInputEdit({
  onUpload,
  selectedAge,
  updatedPerson,
}: {
  onUpload: (selectedAge: number, uploadedUrls: string[]) => void;
  selectedAge: any;
  updatedPerson: any;
}) {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = async (changeEvent: any) => {
    changeEvent.preventDefault();
    const files = changeEvent.target.files;
    const newImageSrcs: string[] = [];

    const totalUploadedImages =
      updatedPerson.uploadDatas[selectedAge]?.images?.length;

    // Ensure that the number of uploaded images plus newly uploaded images does not exceed the maximum limit
    if (totalUploadedImages + files.length > 4) {
      alert(`You can only upload a maximum of 4 images.`);
      return;
    }

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
            // Once all files are uploaded, call the callback function to update the parent component's state
            onUpload(selectedAge, uploadedUrls); // Pass selectedAge along with uploadedUrls
            setIsLoading(false);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form>
      <label htmlFor="file">Drag and Drop images here</label>
      <input
        multiple
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => handleOnChange(e)}
      />
      {isLoading && (
        <ImageMainContainer>
          <AnimatePresence mode="wait">
            {imageSrcs?.map((src: string, index: number) => (
              <IndividualImageContainer key={index} {...motionProps}>
                <ImageContainer>
                  <img key={index} src={src} alt={`Uploaded image ${index}`} />
                </ImageContainer>

                <IsLoadingContainer>
                  <p style={{ color: "#2e2424" }}>Loading image(s)...</p>
                </IsLoadingContainer>
              </IndividualImageContainer>
            ))}
          </AnimatePresence>
        </ImageMainContainer>
      )}
    </Form>
  );
}

export default UploadFileInputEdit;
