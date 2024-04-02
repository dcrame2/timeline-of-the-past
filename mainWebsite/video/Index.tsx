import { Container } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import React from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  height: 100%;
  width: inherit;
`;

const VideoInnerContainer = styled.div`
  ${Container}
  max-width: 1200px;
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
