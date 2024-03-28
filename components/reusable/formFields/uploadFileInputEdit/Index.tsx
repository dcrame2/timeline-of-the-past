import { variables } from "@/styles/Variables";
import React, { useState, FormEvent, useContext } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";

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

function UploadFileInputEdit({
  onUpload,
  selectedAge,
}: {
  onUpload: (selectedAge: number, uploadedUrls: string[]) => void;
  selectedAge: any;
}) {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const handleOnChange = async (changeEvent: any) => {
    changeEvent.preventDefault();
    const files = changeEvent.target.files;
    const newImageSrcs: string[] = [];

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
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <div>
    <Form>
      <label htmlFor="file">Drag and Drop images here</label>
      <input
        multiple
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => handleOnChange(e)}
      />

      {imageSrcs?.map((src, index) => (
        <img key={index} src={src} alt={`Uploaded image ${index}`} />
      ))}
    </Form>
    // </div>
  );
}

export default UploadFileInputEdit;
