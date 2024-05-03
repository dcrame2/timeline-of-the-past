import { variables } from "@/styles/Variables";
import React, { useState } from "react";
import styled from "styled-components";
import { uploadFilesToCloudinary } from "@/lib/uploadFilesToCloudinary";
import { pXSmall } from "@/styles/Type";
import { motion } from "framer-motion";
import { MediaQueries } from "@/styles/Utilities";
import { Progress } from "@nextui-org/react";
import { PhotoIcon } from "@heroicons/react/20/solid";

const Form = styled.div`
  height: 100%;
  background-color: #f4f4f5;
  border-radius: 12px;
  border: 1px dashed ${variables.darkBlue};
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
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
  flex-direction: column;
  margin: 4px;
`;

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

interface UploadedImage {
  src: string;
  progress: number;
}

function UploadFileInputNew({
  selectedAge,
  uploadDatas,
  setUploadDatas,
  setImageSrcs,
  imageSrcs,
  uploadedImages,
  setUploadedImages,
}: {
  selectedAge: number;
  uploadDatas: any;
  setUploadDatas: any;
  setImageSrcs: any;
  imageSrcs: any;
  handleRemoveImage: any;
  uploadedImages: any;
  setUploadedImages: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (uploadProgress <= 100) {
        setUploadProgress((prevProgress) => prevProgress + 0.5);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [uploadProgress]);

  const handleOnChange = async (changeEvent: any) => {
    changeEvent.preventDefault();
    const files = changeEvent.target.files;
    const newImageSrcs: string[] = [];
    const totalUploadedImages = (uploadDatas[selectedAge]?.images ?? []).length;

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
        setUploadedImages((prevImages: any) => [
          ...prevImages,
          { src: onLoadEvent.target.result, progress: 100 },
        ]);
        newImageSrcs.push(onLoadEvent.target.result);
        if (newImageSrcs.length === files.length) {
          setImageSrcs(newImageSrcs);
          console.log(imageSrcs, "imageSrcs");
          // Upload files to cloudinary
          uploadFilesToCloudinary(files).then((uploadedUrls: string[]) => {
            // Once all files are uploaded, update the state with the accumulated URLs
            const updatedUploadDatas = {
              ...uploadDatas,
              [selectedAge]: {
                ...uploadDatas[selectedAge],
                images: [
                  ...(uploadDatas[selectedAge]?.images || []),
                  ...uploadedUrls,
                ],
              },
            };
            setUploadProgress(100);
            setUploadDatas(updatedUploadDatas);
            setIsLoading(false);
            // Update the progress of each uploaded image to 100
            setUploadedImages((prevImages: any) =>
              prevImages.map((image: any, index: number) => ({
                ...image,
                progress: index < prevImages.length ? image.progress : 100,
              }))
            );
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form>
        <PhotoIcon
          className="mx-auto h-12 w-12 text-black"
          aria-hidden="true"
        />
        <label htmlFor="file">Add Specific Age Image(s) </label>
        <input
          multiple
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => handleOnChange(e)}
        />
      </Form>

      <ImageMainContainer>
        {uploadedImages?.map((image: UploadedImage, index: number) => (
          <IndividualImageContainer key={index}>
            <ImageContainer>
              <img src={image.src} alt={`Uploaded image ${index}`} />
              {/* <button
                onClick={(e) =>
                  handleRemoveImage(
                    uploadDatas[selectedAge].images[index],
                    index,
                    e
                  )
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
        ))}
      </ImageMainContainer>
    </>
  );
}

export default UploadFileInputNew;
