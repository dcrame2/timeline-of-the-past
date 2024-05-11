import React from "react";
import MainHero from "./components/mainHero/Index";
import ImagesWithTitles from "./components/imagesWithTitles/Index";
import Footer from "./components/footer/Index";
import Navigation from "./components/navigation/Index";
import Carousel from "./components/carousel/Index";

import { createGlobalStyle } from "styled-components";

type DataProps = [];

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) =>
      theme.fontFamily}; /* Example: Applying fontFamily */
    /* Other global styles */
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
      font?: string;
      theme?: string;
    }
  ];
}
type PersonType = Person[];

function ThemeTwo({ data }: Person) {
  const { font } = data[0];
  console.log(data, "DATA");
  return (
    <>
      <div style={{ fontFamily: `${font} !important` }}>
        <Navigation data={data} />
        <MainHero data={data} />
        <Carousel data={data} />
        {/* <ImagesWithTitles data={data} /> */}
        <Footer data={data} />
      </div>
    </>
  );
}

export default ThemeTwo;
