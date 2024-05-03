import Image from "next/image";

import { Button } from "@nextui-org/react";
import { Container } from "./Container";
// import logoLaravel from "./images/logos/laravel.svg";

import logoLaravel from "../images/logos/laravel.svg";
import logoMirage from "../images/logos/mirage.svg";
import logoStatamic from "../images/logos/statamic.svg";
import logoStaticKit from "../images/logos/laravel.svg";
import logoTransistor from "../images/logos/transistor.svg";
import logoTuple from "../images/logos/tuple.svg";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import Link from "next/link";

const MainContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${variables.darkBlue};
  background-image: url("time-clock-hero.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 2;
  background-size: cover;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 51, 80, 0.75); /* Adjust opacity as needed */
    z-index: 1; /* Ensure it's above the background image */
  }
`;

export function Hero() {
  return (
    <MainContainer
      className="w-full bg-cover bg-center"
      // style={{ backgroundImage: 'url("time-clock-hero.jpg")' }}
    >
      {/* <div className="absolute inset-0 bg-darkBlue bg-opacity-75 z-10"></div> */}
      <Container className="pb-16 pt-20 text-center lg:pt-32 z-20 relative">
        <h1 className="mx-auto max-w-4xl font-display text-5xl text-white font-medium tracking-tight text-slate-900 sm:text-7xl">
          Create{" "}
          <span className="relative whitespace-nowrap text-lightOrange">
            <span className="relative">your own</span>
          </span>{" "}
          timelines
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white tracking-tight text-slate-700">
          Share your life's journey with the world
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button as={Link} href="/auth/authenticate">
            Create Timelines
          </Button>
          <Button
            as={Link}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            // variant="outline"
            className=" bg-lightOrange text-white"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-lightBlue group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
            </svg>
            <span className="ml-3 ">Watch video</span>
          </Button>
        </div>
      </Container>
    </MainContainer>
  );
}
