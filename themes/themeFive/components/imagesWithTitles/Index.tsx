import React from "react";
import styled from "styled-components";
import formatDate from "@/lib/formatDate";

const H2tag = styled.h2`
  color: ${({ color }) => color};
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
        [key: string]: string[] | undefined;
      };
      color?: string;
      theme?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];
  return (
    <>
      {Object.keys(uploadDatas).map((key, index) => (
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8 "
        >
          <H2tag
            color={color}
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            {key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}
          </H2tag>
          <p className="mt-4 text-base text-gray-500">
            {uploadDatas[key].ageText}
          </p>

          <div className="mt-5 mb-5 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
            {uploadDatas[key].images?.map((src: string, index: number) => (
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
              >
                <img
                  src={src}
                  alt="Product screenshot"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default ImagesWithTitles;
