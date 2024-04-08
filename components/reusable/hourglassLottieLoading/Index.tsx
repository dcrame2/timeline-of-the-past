import React from "react";
import Lottie, { LottieOptions } from "lottie-react";
import hourGlassLoadingSpinner from "../../../lib/hourglass-lottie.json";

import styled from "styled-components";

const LottieContainer = styled.div`
  width: 200px;
`;

const HourGlassLottieLoading = () => {
  // Define Lottie options
  const defaultOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: hourGlassLoadingSpinner, // Lottie animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LottieContainer>
      <Lottie
        animationData={hourGlassLoadingSpinner}
        // options={defaultOptions}
        height={100}
        width={100}
      />
    </LottieContainer>
  );
};

export default HourGlassLottieLoading;
