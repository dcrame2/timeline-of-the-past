import React, { useRef } from "react";
import styled from "styled-components";
import { pLarge } from "../../styles/Type";
import { Container, MediaQueries } from "@/styles/Utilities";
import formatDate from "@/lib/formatDate";
import { AnimatePresence, motion, useInView } from "framer-motion";

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
      theme?: string;
    }
  ];
}

function ImagesWithTitles({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];
  console.log(uploadDatas, "uploadDatas");

  return (
    <div>
      {Object.keys(uploadDatas).map((key, index) => (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl">
              {key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}
            </h2>
            <p className="font-extralight">{uploadDatas[key].ageText}</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {uploadDatas[key].images?.map((src: string, index: number) => (
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={src}
                    alt={`Image ${index}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImagesWithTitles;
