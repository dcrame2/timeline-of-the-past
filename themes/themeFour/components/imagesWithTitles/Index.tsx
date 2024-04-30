import React from "react";
import styled from "styled-components";

import { MediaQueries } from "@/styles/Utilities";
import formatDate from "@/lib/formatDate";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/react";

const Ptag = styled.p`
  border-bottom: 3px solid ${({ color }) => color};
  width: fit-content;
  padding-bottom: 20px;
`;

interface ImagesContainerProps {
  children: React.ReactNode;
}

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
        [key: string]: string[] | undefined;
      };
      color?: string;
      theme?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];

  console.log(uploadDatas, "UPLOAD DATA");

  return (
    <>
      {Object.keys(uploadDatas).map((key, index) => (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                <div className="lg:max-w-lg">
                  {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">
                    Deploy faster
                  </h2> */}
                  <Ptag
                    color={color}
                    className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                  >
                    {key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}
                  </Ptag>
                  {/* <Divider /> */}
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {uploadDatas[key].ageText}
                  </p>
                </div>
              </div>

              <div
                className={`grid gap-4  lg:order-first ${
                  uploadDatas[key].images.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2"
                }`}
              >
                {uploadDatas[key].images?.map((src: string, index: number) => (
                  <img
                    key={index}
                    src={src}
                    alt="Product screenshot"
                    className="w-full max-w-none rounded-xl shadow-xl"
                    width={432}
                    height={442}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>

    // <ImagesWithTitlesContainer>
    //   {Object.keys(uploadDatas).map((key, index) => (
    //     <IndividualAgeContainer color={color} key={key}>
    //       <IndividualInnerContainer>
    //         <h3>{key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}</h3>
    //         <p>{uploadDatas[key].ageText}</p>
    //         <ImagesContainer
    //           key={`key-${index}`}
    //           initial={{ opacity: 0 }}
    //           whileInView={{ opacity: 1 }}
    //           transition={{ duration: `0.6` }}
    //           viewport={{ once: true }}
    //         >
    //           {uploadDatas[key].images?.map((src: string, index: number) => (
    //             <img
    //               key={`key-${index + 1}`}
    //               src={src}
    //               alt={`Image ${index}`}
    //             />
    //           ))}
    //         </ImagesContainer>
    //       </IndividualInnerContainer>
    //     </IndividualAgeContainer>
    //   ))}
    // </ImagesWithTitlesContainer>
  );
}

export default ImagesWithTitles;
