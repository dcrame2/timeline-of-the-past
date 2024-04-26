import React from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { linkStyles, pLarge, pSmall, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";
import { MediaQueries } from "@/styles/Utilities";
import MainContainer from "../reusable/mainContainer/Index";
import CreateButton from "../reusable/createButton/Index";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import ExternalIcon from "../reusable/svg/externalIcon/Index";
import EditIcon from "../reusable/svg/editIcon/Index";
import { useRouter } from "next/router";
import TrashIcon from "../reusable/svg/trashIcon/Index";
import formatDate from "@/lib/formatDate";

interface UserData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  slug?: string;
  dob?: any;
  mainImage?: string;
  theme?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

const PeopleFeedInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  flex-direction: column;
  padding: 8px;
  overflow-y: scroll;
  /* height: 100%; */
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HourGlassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const MainInfo = styled.div`
  gap: 4px;
`;

const IndividualPeopleContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  background-color: ${variables.white};
  border-radius: 12px;
  justify-content: space-between;
  color: ${variables.black};
  align-items: center;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  gap: 12px;
  a {
    ${linkStyles}
  }
`;

const CRUDBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  z-index: 1;
  position: relative;
  align-items: center;
`;

const NoTimelineContainer = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;

interface PeopleProps {
  firstName?: string;
  lastName?: string;
  dob?: string;
}

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

function PeopleFeed({
  peopleData,
  fetchData,
  isLoading,
  getUserInfo,
  specificUserInfo,
}: {
  peopleData: PeopleDataProps;
  getUserInfo: () => void;
  fetchData: () => void;
  isLoading: boolean;
  specificUserInfo: any;
}) {
  const deletePeopleHandler = async (person: PeopleProps, index: number) => {
    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    const response = await fetch("/api/people/delete-people", {
      method: "POST",
      body: JSON.stringify({
        sessionUserEmail,
        person,
        index,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch("/api/auth/user/increase-timelines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include the sessionUserEmail in the request body
      body: JSON.stringify({ sessionUserEmail }),
    });

    fetchData();
    getUserInfo();

    console.log(response, "Response");
  };

  const motionPropsUp = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };

  const router = useRouter();

  const handleEditClick = (person: any, index: number) => {
    // Navigate to the edit page with query parameters
    router.push({
      pathname: "/auth/edit",
      query: {
        person: JSON.stringify(person),
        selectedIndex: index,
      },
    });
  };
  return (
    <MainContainer>
      {isLoading ? (
        <HourGlassContainer>
          <HourGlassLottieLoading />
        </HourGlassContainer>
      ) : (
        <>
          <PeopleFeedInnerContainer>
            {peopleData &&
            peopleData.userData &&
            peopleData.userData.length > 0 ? (
              peopleData.userData.map((person, index) => {
                const { firstName, lastName, slug, dob, mainImage, theme } =
                  person;

                return (
                  <Card key={index} className="py-4 h-auto w-full">
                    <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
                      {/* <p className="text-tiny uppercase font-bold">
                        Theme: {theme}
                      </p> */}

                      <h4 className="font-bold">
                        {firstName} {lastName}
                      </h4>
                      <small className="text-default-500">
                        Birthday: {formatDate(dob)}
                      </small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 w-full">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl h-40 w-full"
                        src={mainImage}
                        width={500}
                      />
                    </CardBody>
                    <CRUDBtns className="mt-2   justify-center">
                      <Button
                        style={{
                          backgroundColor: "rgba(13, 51, 80, 0.8)",
                          color: variables.white,
                        }}
                        size="sm"
                        target="_blank"
                        as={Link}
                        isIconOnly
                        href={`https://timelinethat.com${slug}`}
                        startContent={<ExternalIcon color={variables.white} />}
                      />
                      <Button
                        style={{
                          color: variables.white,
                          backgroundColor: "rgba(255, 180, 0, 0.8)",
                        }}
                        size="sm"
                        isIconOnly
                        startContent={<EditIcon color={variables.white} />}
                        onClick={() => handleEditClick(person, index)}
                      />
                      <Button
                        style={{
                          color: variables.white,
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                        }}
                        size="sm"
                        target="_blank"
                        color="danger"
                        isIconOnly
                        onClick={() => deletePeopleHandler(person, index)}
                        startContent={<TrashIcon color={variables.white} />}
                      />
                    </CRUDBtns>
                  </Card>
                );
              })
            ) : (
              <NoTimelineContainer>
                <p>No Timelines</p>
                <CreateButton />
              </NoTimelineContainer>
            )}
          </PeopleFeedInnerContainer>
        </>
      )}
    </MainContainer>
  );
}

export default PeopleFeed;
