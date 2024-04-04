import { h2styles } from "@/styles/Type";
import { Container } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  height: 100%;
  width: inherit;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const VideoInnerContainer = styled.div`
  ${Container}
  max-width: 1200px;
  h2 {
    ${h2styles}
    text-align: center;
  }
`;

const IFrame = styled.iframe`
  height: auto;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

function Video() {
  return (
    <VideoContainer>
      <VideoInnerContainer>
        <h2>Its this simple</h2>
        <IFrame
          className="youtube-frame"
          src="https://www.youtube.com/embed/DsPANIIifLk?si=gFG9mAwmma2HEuK7"
          allowFullScreen
        />
      </VideoInnerContainer>
    </VideoContainer>
  );
}

export default Video;
