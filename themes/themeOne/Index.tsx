import React from "react";
import MainHero from "./components/mainHero/Index";
import ImagesWithTitles from "./components/imagesWithTitles/Index";

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
      <MainHero data={data} />
      <ImagesWithTitles data={data} />
    </>
  );
}

export default ThemeOne;
