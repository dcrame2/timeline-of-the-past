import { Container, h1styles, pLarge } from "../../styles/Type";
import { useState, useEffect } from "react";
import styled from "styled-components";
import formatDate from "@/lib/formatDate";
import { pXSmall } from "@/styles/Type";
import { variables } from "../../styles/Variables";
import { motion } from "framer-motion";

const MainHeroContainer = styled.div`
  background-color: ${({ color }) => color};
`;

const MainHeroInnerContainer = styled(motion.div)`
  height: 50dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${Container}
  h1 {
    ${h1styles}
    text-align: center;
  }
  p {
    ${pLarge}

    &.countdown {
      text-align: center;
      ${pXSmall};
      color: ${variables.white};
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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
    <div className="relative isolate overflow-hidden pt-14">
      <img
        src={mainImage}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative z-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10 hover:ring-white/20">
            Birthday in: {countdownTimer}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {firstName} {middleName} {lastName}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">{mainText}</p>
        </div>
      </div>
    </div>

    // <MainHeroContainer color={color}>
    //   <MainHeroInnerContainer
    //     initial={{ opacity: 0, scale: 0 }}
    //     whileInView={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: `0.8` }}
    //     viewport={{ once: true }}
    //   >
    //     <p>The Life of</p>
    //     <h1>
    //       {firstName} {middleName} {lastName}
    //     </h1>
    //     <p>Born: {formatDate(dob)}</p>
    //     {countdownTimer && (
    //       <motion.p
    //         initial={{ opacity: 0 }}
    //         whileInView={{ opacity: 1 }}
    //         transition={{ duration: `0.8` }}
    //         viewport={{ once: true }}
    //         className="countdown"
    //       >
    //         Birthday in: {countdownTimer}
    //       </motion.p>
    //     )}
    //   </MainHeroInnerContainer>
    // </MainHeroContainer>
  );
}

export default MainHero;
