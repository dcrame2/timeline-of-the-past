import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";
import { pBase, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";

const MediaLibraryContainer = styled.div`
  height: 100%;
`;

const MediaLibraryInnerContainer = styled.div``;

const TextContainer = styled.div`
  gap: 20px;
  @media ${MediaQueries.tablet} {
    gap: 12px;
  }
  @media ${MediaQueries.mobile} {
    gap: 8px;
  }
  h1 {
    ${pBase}
    margin: 24px;
  }
  p {
    ${pBase}
    max-width: 1000px;
  }
`;

const MediaContainer = styled.div`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  display: flex;
  max-height: 650px;
  overflow-y: auto;

  @media ${MediaQueries.mobile} {
    padding: 24px 24px;
  }
`;

const HourGlassContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AllMediaLibrary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    /* max-width: 200px; */
    width: 100%;
    object-fit: cover;
  }
  p {
    ${pXSmall}
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  display: flex;
`;

function MediaLibraryComponent() {
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const data = await fetchData();
        const { userData } = data;

        // Define a function to flatten uploadDatas arrays
        const flattenUploadDatas = (userData: any) => {
          return Object.values(userData?.uploadDatas).reduce(
            (acc: string[], arr: any) => acc.concat(arr),
            []
          );
        };

        // Concatenate all uploadDatas arrays into a single array
        const images = userData.reduce(
          (accumulator: any, user: any) =>
            accumulator.concat(flattenUploadDatas(user)),
          []
        );

        setMediaLibrary(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataAndProcess();
  }, []);

  return (
    <MediaLibraryContainer>
      <MediaLibraryInnerContainer>
        <TextContainer>
          <h1>Media Library ({mediaLibrary.length} Images)</h1>
        </TextContainer>
        <MediaContainer>
          {isLoading ? (
            <HourGlassContainer>
              <HourGlassLottieLoading />
            </HourGlassContainer>
          ) : (
            <AllMediaLibrary>
              {mediaLibrary.length !== 0 ? (
                <>
                  {mediaLibrary?.map((imageUrl, index) => (
                    <ImageContainer>
                      <img key={index} src={imageUrl} alt={`Image ${index}`} />
                    </ImageContainer>
                  ))}
                </>
              ) : (
                <p>No images found</p>
              )}
            </AllMediaLibrary>
          )}
        </MediaContainer>
      </MediaLibraryInnerContainer>
    </MediaLibraryContainer>
  );
}

export default MediaLibraryComponent;