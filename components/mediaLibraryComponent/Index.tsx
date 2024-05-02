import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";
import { pSmall, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";
import { Image } from "@nextui-org/react";
import MainContainer from "../reusable/mainContainer/Index";
import CreateButton from "../reusable/createButton/Index";
import SectionHeader from "../reusable/sectionHeader/Index";

const MediaLibraryContainer = styled.div`
  height: 100%;
`;

const MediaLibraryInnerContainer = styled.div`
  height: 100%;
`;

const HourGlassContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AllMediaLibrary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-auto-flow: dense;

  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  p {
    ${pXSmall}
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  display: flex;
`;

const NoMediaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  p {
    ${pSmall}
  }
`;

function MediaLibraryComponent() {
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const data = await fetchData();
        const { userData } = data;

        // Extract and flatten images from uploadDatas arrays
        const images = userData.reduce((accumulator: any, user: any) => {
          // Check if user.uploadDatas exists and is an object
          if (user.uploadDatas && typeof user.uploadDatas === "object") {
            // Extract and concatenate all images arrays from uploadDatas
            const userImages = Object.values(user.uploadDatas).flatMap(
              (data: any) => data.images || []
            );
            return accumulator.concat(userImages);
          } else {
            // Log a warning if uploadDatas is missing or not an object
            console.warn("User object does not contain uploadDatas:", user);
            return accumulator;
          }
        }, []);

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
        <SectionHeader
          heading={`Media Library (${mediaLibrary.length} Images)`}
          backButton={true}
          button={<CreateButton />}
        />
        <>
          {isLoading ? (
            <HourGlassContainer>
              <HourGlassLottieLoading />
            </HourGlassContainer>
          ) : (
            <>
              {mediaLibrary.length !== 0 ? (
                <AllMediaLibrary>
                  <>
                    {mediaLibrary?.map((imageUrl, index) => (
                      <ImageContainer key={`${imageUrl}-${index}`}>
                        <Image
                          width={300}
                          height={200}
                          src={imageUrl}
                          alt={`Image ${index}`}
                        />
                      </ImageContainer>
                    ))}
                  </>
                </AllMediaLibrary>
              ) : (
                <NoMediaContainer>
                  <p>No Media</p>
                  <CreateButton />
                </NoMediaContainer>
              )}
            </>
          )}
        </>
      </MediaLibraryInnerContainer>
    </MediaLibraryContainer>
  );
}

export default MediaLibraryComponent;
