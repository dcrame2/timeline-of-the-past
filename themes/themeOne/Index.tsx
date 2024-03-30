import React from "react";
import MainHero from "./components/mainHero/Index";
import ImagesWithTitles from "./components/imagesWithTitles/Index";
import Footer from "./components/footer/Index";
import Navigation from "./components/navigation/Index";

type DataProps = [];

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
type PersonType = Person[];

function ThemeOne({ data }: Person) {
  return (
    <>
      <Navigation data={data} />
      <MainHero data={data} />
      <ImagesWithTitles data={data} />
      <Footer data={data} />
    </>
  );
}

export default ThemeOne;
