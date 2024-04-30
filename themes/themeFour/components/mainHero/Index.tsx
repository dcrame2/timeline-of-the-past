import { Container, h1styles, pLarge } from "../../styles/Type";
import { useState, useEffect } from "react";
import styled from "styled-components";
import formatDate from "@/lib/formatDate";
import { pXSmall } from "@/styles/Type";
import { variables } from "../../styles/Variables";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/react";
import { MediaQueries } from "@/styles/Utilities";

const MainHeroContainer = styled.div`
  background-color: ${({ color }) => color};
  .oval-item {
    border: 1px solid ${({ color }) => color};
  }

  hr {
    height: 3px;
    margin-top: 20px;
    max-width: 500px;
    background-color: ${({ color }) => color};
  }
`;

interface Person {
  data: [
    {
      slug?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      dob?: any;
      death?: string;
      facebookLink?: string;
      linkedinLink?: string;
      twitterLink?: string;
      uploadDatas?: {
        [key: string]: string[] | undefined;
      };
      color?: string;
      theme?: string;
      mainImage?: string;
      mainText?: string;
    }
  ];
}

function MainHero({ data }: Person) {
  const { firstName, middleName, lastName, color, dob, mainImage, mainText } =
    data[0];
  const [countdownTimer, setCountdownTimer] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const targetDate = new Date(dob);
      targetDate.setFullYear(currentDate.getFullYear()); // Set the target year to the current year

      const timeDifference = targetDate.getTime() - currentDate.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      setCountdownTimer(countdown);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dob]);

  return (
    <MainHeroContainer color={color}>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              {/* <img
              className="h-11"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
              <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500  hover:ring-gray-900/20 oval-item">
                  Birthday in: {countdownTimer}
                </div>
              </div>
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                {firstName} {middleName} {lastName}
              </h1>
              <Divider />
              <p className="mt-6 text-lg leading-8 text-gray-600">{mainText}</p>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src={mainImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </MainHeroContainer>
  );
}

export default MainHero;
