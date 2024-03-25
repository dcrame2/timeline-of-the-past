import { variables } from "@/styles/Variables";
import React, { useState, FormEvent, useContext } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { Context } from "@/pages/_app";

const Form = styled.form`
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

function UploadFileInput() {
  //   const [uploadDatas, setUploadDatas] = useState<any[]>([]);
  const [uploadDatas, setUploadDatas] =
    useContext<[UploadDataState, SetUploadDataState]>(Context);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  console.log(imageSrcs, "IMAGES SRCS CUH");
  console.log(uploadDatas, "UPLOAD DATA CUSD");

  const handleOnChange = (changeEvent: any) => {
    const files = changeEvent.target.files;
    const newImageSrcs: string[] = [];
    const newUploadDatas: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (onLoadEvent: any) => {
        newImageSrcs.push(onLoadEvent.target.result);
        if (newImageSrcs.length === files.length) {
          setImageSrcs(newImageSrcs);
          //   setUploadDatas([]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData();

    // Get the input element for file uploads
    const fileInput = form.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Check if files were selected
    if (fileInput && fileInput.files) {
      // Iterate over each selected file and append it to the FormData object
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("file", fileInput.files[i]);

        // Add the upload preset
        formData.append("upload_preset", "my-uploads");

        // Send the FormData to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dultp5szy/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log(data, "WGAT US TGUS");
        setUploadDatas((prevUploadDatas) => [...prevUploadDatas, data.url]);
      }
    }
  };

  return (
    <Form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <label htmlFor="file">Drag and Drop images here</label>
      <input multiple type="file" name="file" accept="image/*" />

      {imageSrcs?.map((src, index) => (
        <img key={index} src={src} alt={`Uploaded image ${index}`} />
      ))}

      {imageSrcs?.length > 0 && (
        <p>
          <button>Upload Files</button>
        </p>
      )}
    </Form>
  );
}

export default UploadFileInput;
