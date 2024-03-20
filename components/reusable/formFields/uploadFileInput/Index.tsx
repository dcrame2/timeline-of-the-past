import { variables } from "@/styles/Variables";
import React, { useState, FormEvent } from "react";
import styled from "styled-components";

const Form = styled.form`
  /* width: 100%; */
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

// function UploadFileInput() {
//   const [imageSrc, setImageSrc] = useState();
//   const [uploadData, setUploadData] = useState();
//   /**
//    * handleOnChange
//    * @description Triggers when the file input changes (ex: when a file is selected)
//    */

//   function handleOnChange(changeEvent: any) {
//     const reader = new FileReader();

//     reader.onload = function (onLoadEvent: any) {
//       setImageSrc(onLoadEvent.target.result);
//       setUploadData(undefined);
//     };

//     reader.readAsDataURL(changeEvent.target.files[0]);
//   }

//   const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     console.log(form, "FORM");
//     const fileInput: any = Array.from(form.elements).find(
//       ({ name }: any) => name === "file"
//     );

//     const formData = new FormData();

//     for (const file of fileInput.files) {
//       formData.append("file", file);
//     }

//     formData.append("upload_preset", "my-uploads");

//     const data = await fetch(
//       "https://api.cloudinary.com/v1_1/dultp5szy/image/upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     ).then((r) => r.json());

//     setImageSrc(data.secure_url);
//     setUploadData(data);
//   };
//   return (
//     <Form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
//       <label htmlFor="file">Drag and Drop images here</label>
//       <input multiple type="file" name="file" accept="image/*" />

//       <img src={imageSrc} />

//       {imageSrc && !uploadData && (
//         <p>
//           <button>Upload Files</button>
//         </p>
//       )}

//       {/* {uploadData && (
//         <code>
//           <pre>{JSON.stringify(uploadData, null, 2)}</pre>
//         </code>
//       )} */}
//     </Form>
//   );
// }

// export default UploadFileInput;

// function UploadFileInput({
//     imageSrcs,
//     setImageSrcs,
//   }: {
//     imageSrcs: string[];
//     setImageSrcs: any;
//   }) {
function UploadFileInput() {
  const [uploadDatas, setUploadDatas] = useState<any[]>([]);

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
          setUploadDatas([]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  //   const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const form = event.currentTarget;
  //     const formData = new FormData(form);

  //     formData.append("upload_preset", "my-uploads");

  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/dultp5szy/image/upload",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const data = await response.json();

  //     setUploadDatas(data.resources);
  //   };

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

    // await fetch("/api/people/people", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     imageSrcs,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // Parse the response

    // Update the state with the uploaded resources
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
