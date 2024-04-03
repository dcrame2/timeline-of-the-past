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
  height: 100dvh;
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
    }
  ];
}

function MainHero({ data }: Person) {
  const { firstName, middleName, lastName, color, dob } = data[0];
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
      <MainHeroInnerContainer
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: `0.8` }}
        viewport={{ once: true }}
      >
        <p>The Life of</p>
        <h1>
          {firstName} {middleName} {lastName}
        </h1>
        <p>Born: {formatDate(dob)}</p>
        {countdownTimer && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: `0.8` }}
            viewport={{ once: true }}
            className="countdown"
          >
            Birthday in: {countdownTimer}
          </motion.p>
        )}
      </MainHeroInnerContainer>
    </MainHeroContainer>
  );
}

export default MainHero;
