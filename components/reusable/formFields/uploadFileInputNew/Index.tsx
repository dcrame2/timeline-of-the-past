import { variables } from "@/styles/Variables";
import React, { useState, FormEvent, useContext } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { Context } from "@/pages/_app";
import { uploadFilesToCloudinary } from "@/lib/uploadFilesToCloudinary";

const Form = styled.div`
  max-height: 300px;
  height: 100%;
  background-color: ${variables.lightGrey};
  margin: 24px;
  border-radius: 12px;
  border: 2px dashed steelblue;
  position: relative;
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

  P {
    text-align: center;
  }

  img {
    width: 100px;
  }
`;

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

function UploadFileInputNew({ setUploadDatas, uploadDatas }: any) {
  // const [uploadDatas, setUploadDatas] = useContext(Context);
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

            console.log(uploadedUrls, "YOOO");
            // console.log(uploadDatas, "HIII");
            setUploadDatas((prevUploadDatas: string[]) => [
              ...prevUploadDatas,
              ...uploadedUrls,
            ]);
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

      {isLoading && <p style={{ color: "#2e2424" }}>Loading...</p>}

      {uploadDatas?.map((src: string, index: number) => (
        <img key={index} src={src} alt={`Uploaded image ${index}`} />
      ))}
    </Form>
  );
}

export default UploadFileInputNew;
