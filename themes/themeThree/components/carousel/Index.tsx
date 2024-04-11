import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Container, MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { h2styles, h3styles, pBase, pLarge, pXSmall } from "@/styles/Type";
// import Arrow from "../sub_components/svg/Arrow";
import { useInView } from "framer-motion";
import formatDate from "@/lib/formatDate";
import { motion } from "framer-motion";

interface ModuleContainer {
  backgroundImage?: string;
}

const ModuleContainer = styled.section<ModuleContainer>`
  position: relative;
  background-color: ${variables.white};
  z-index: 2;
  background-size: cover; /* Ensure the background image covers the container */
  background-image: url(${(props) => props.backgroundImage});
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75); /* Adjust opacity as needed */
    z-index: 1; /* Ensure it's above the background image */
  }
`;

const InnerContainer = styled.div`
  ${Container}
  height: 100dvh;
  /* padding-top: 80px;
  padding-bottom: 80px; */
  position: relative;
  z-index: 10; /* Increase the z-index */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  color: ${variables.white};

  @media ${MediaQueries.tablet} {
    flex-direction: column;
    gap: 42px;
    height: fit-content;
  }

  @media ${MediaQueries.mobile} {
    padding-top: 110px;
    padding-bottom: 110px;
  }

  .heading-container {
    text-align: center;
    width: 30%;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 20px;
    @media ${MediaQueries.tablet} {
      width: 100%;
    }

    h2 {
      color: inherit !important;
      ${h2styles}
      /* text-transform: uppercase; */
      margin-bottom: 10px;
    }
    h3 {
      /* color: ${({ color }) => color} !important; */
      ${pLarge}
    }
    p {
      ${pXSmall}
    }
  }

  .carousel-wrapper {
    display: flex;
    justify-content: center;
    gap: 50px;
    position: relative;

    @media ${MediaQueries.tablet} {
      gap: 30px;
    }

    @media ${MediaQueries.mobile} {
      gap: 12px;
    }
    .content-wrapper {
      display: grid;
      justify-items: center;

      .tile {
        grid-row: 1;
        grid-column: 1;
        text-align: center;
        opacity: 0;
        transform: translateY(120px);
        transition: opacity ease 0.4s, transform ease 0.35s;

        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: ${variables.white};
        max-width: 660px;
        border: 3px solid ${variables.lightOrange};
        padding: 26px 32px 28px;
        border-radius: 24px;

        @media ${MediaQueries.tablet} {
          padding: 20px 26px 24px;
        }

        &.active {
          opacity: 1;
          transform: translateY(0px);
          transition: opacity ease 0.4s, transform ease 0.35s;
        }

        h4 {
          ${pLarge}
          margin-bottom: 12px;

          @media ${MediaQueries.mobile} {
            margin-bottom: 4px;
          }
        }

        p.content {
          ${pBase}
        }
      }
    }
    button {
      background-color: unset;
      border: unset;

      &.prev {
        transform: rotate(180deg);
      }

      svg {
        transition: transform ease 0.3s;
      }

      &:hover {
        svg {
          transform: scale(1.15);
          transition: transform ease 0.2s;
        }
      }
    }
  }
  ul.indicators {
    display: flex;
    list-style: none;
    gap: 20px;
    flex-direction: column;
    /* justify-content: center; */
    left: 20px;
    z-index: 1;
    position: absolute;

    @media ${MediaQueries.mobile} {
      gap: 16px;
    }

    li {
      position: relative;
      button {
        padding: 3px;
        position: relative;
        border: none;
        ${pXSmall}
        background-color: ${variables.white};
        transition: transform ease 0.2s, color ease 0.2s;
        z-index: 1;
        &:hover {
          transition: transform ease 0.2s;
        }

        &:after {
          content: "";
          background-color: ${({ color }) => color} !important;
          position: absolute;
          z-index: -1;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          margin: auto;
          /* border-radius: 50%; */
          width: 0%;
          height: 0%;
          transition: width ease 0.3s, height ease 0.3s;
        }
      }

      &.active {
        transform: scale(1.3);
        button {
          /* transform: scale(1.3); */
          &:after {
            width: 100%;
            height: 100%;
            transition: width ease 0.3s, height ease 0.3s;
          }
        }
      }
    }
  }
`;

const MainPhotoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface ImagesContainerProps {
  children: React.ReactNode;
}

const ImagesContainer = styled(motion.div)<ImagesContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center; /* Center items horizontally */
  align-content: center;

  gap: 10px;
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }

  img {
    max-width: 200px;
    width: 100%;
  }
`;

const ArrowSvg = styled.svg`
  max-width: 45px;
  max-height: 45px;
  background-color: ${variables.lightOrange};
  border-radius: 50%;
  padding: 10px;
  @media ${MediaQueries.mobile} {
    padding: 2px;
  }

  polyline {
    stroke: ${variables.white};
    stroke-width: 9;
    fill: none;
    stroke-linecap: round;
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
        [key: string]: string[] | undefined;
      };
      color?: string;
      theme?: string;
    }
  ];
}

export default function Carousel({ data }: Person) {
  const { uploadDatas, color, dob }: any = data[0];
  const keys = Object.keys(uploadDatas);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleKeyHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {keys.map((key, index) => (
        <ModuleContainer
          key={`module-${index}`}
          backgroundImage={uploadDatas[key].images[0]}
        >
          <InnerContainer color={color}>
            <div ref={ref} className="heading-container">
              <h3>{key === "0" ? `Born: ${formatDate(dob)}` : `Age ${key}`}</h3>
              <p>{uploadDatas[key].ageText}</p>
            </div>

            <div className="carousel-wrapper">
              <ImagesContainer>
                {uploadDatas[key].images
                  .slice(1)
                  .map((src: string, imgIndex: number) => (
                    <img
                      key={`img-${imgIndex}`}
                      src={src}
                      alt={`Image ${imgIndex}`}
                    />
                  ))}
              </ImagesContainer>
            </div>
          </InnerContainer>
        </ModuleContainer>
      ))}
    </>
  );
}
