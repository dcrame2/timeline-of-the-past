import React from "react";
import styled from "styled-components";
import { pBase } from "../../styles/Type";

const IndividualAgeContainer = styled.div`
  margin: 88px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  h3 {
    ${pBase}
    color:  ${({ color }) => color};
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  img {
    width: 20%;
  }
`;

interface Person {
  data: [
    {
      slug?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      dob?: string;
      death?: string;
      facebookLink?: string;
      linkedinLink?: string;
      twitterLink?: string;
      uploadDatas?: {
        [key: string]: string[] | undefined; // Assuming the keys are numbers and values are string arrays
      };
      color?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color }: any = data[0];
  console.log(uploadDatas, "uploadDatas");

  return (
    <>
      {Object.keys(uploadDatas).map((key) => (
        <IndividualAgeContainer color={color} key={key}>
          <h3>Age {key}</h3>
          <ImagesContainer>
            {uploadDatas[key].map((src: string, index: number) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index}`}
                // style={{ maxWidth: "100px", margin: "5px" }}
              />
            ))}
          </ImagesContainer>
        </IndividualAgeContainer>
      ))}
    </>
  );
}

export default ImagesWithTitles;
