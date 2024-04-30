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
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={mainImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {firstName} {middleName} {lastName}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white">{mainText}</p>
          </div>
        </div>
      </div>
    </MainHeroContainer>
  );
}

export default MainHero;
