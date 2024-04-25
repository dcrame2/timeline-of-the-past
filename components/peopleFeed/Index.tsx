import React from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { linkStyles, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";
import { MediaQueries } from "@/styles/Utilities";
import MainContainer from "../reusable/mainContainer/Index";
import CreateButton from "../reusable/createButton/Index";
import { Button } from "@nextui-org/react";
import ExternalIcon from "../reusable/svg/externalIcon/Index";
import EditIcon from "../reusable/svg/editIcon/Index";
import { useRouter } from "next/router";
import TrashIcon from "../reusable/svg/trashIcon/Index";

interface UserData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  slug?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

const PeopleFeedInnerContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding-bottom: 12px;
  overflow-y: scroll;
`;

const HourGlassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const ExternalBtn = styled(motion(Link))`
  background-color: rgb(0, 0, 100, 0.4);
  opacity: 0.7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  img {
    width: 16px;
  }
`;

const EditBtn = styled(motion(Link))`
  background-color: rgb(100, 100, 0, 0.4);
  opacity: 0.7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  img {
    width: 16px;
  }
`;

const DeleteBtn = styled(motion.button)`
  background-color: rgb(255, 0, 0, 0.4);
  opacity: 0.7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  img {
    width: 16px;
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
      <PeopleFeedInnerContainer>
        {isLoading ? (
          <HourGlassContainer>
            <HourGlassLottieLoading />
          </HourGlassContainer>
        ) : (
          <>
            {peopleData && peopleData?.userData?.length !== undefined ? (
              <>
                {peopleData?.userData?.map((person, index) => {
                  const { firstName, middleName, lastName, slug } = person;

                  return (
                    <IndividualPeopleContainer
                      key={`${index}-person`}
                      {...motionPropsUp}
                    >
                      <MainInfo>
                        <p>
                          {firstName} {middleName} {lastName}
                        </p>
                      </MainInfo>
                      <CRUDBtns>
                        <Button
                          style={{
                            backgroundColor: `${variables.lightBlue}`,
                            color: `${variables.white}`,
                          }}
                          size="sm"
                          target="_blank"
                          as={Link}
                          isIconOnly
                          href={`https://timelinethat.com${slug}`}
                          startContent={
                            <ExternalIcon color={`${variables.white}`} />
                          }
                        />
                        <Button
                          style={{
                            color: `${variables.white}`,
                          }}
                          size="sm"
                          color="warning"
                          isIconOnly
                          startContent={
                            <EditIcon color={`${variables.white}`} />
                          }
                          onClick={() => handleEditClick(person, index)}
                        />

                        <Button
                          style={{
                            color: `${variables.white}`,
                          }}
                          size="sm"
                          target="_blank"
                          color="danger"
                          isIconOnly
                          onClick={() => deletePeopleHandler(person, index)}
                          startContent={
                            <TrashIcon color={`${variables.white}`} />
                          }
                        />
                      </CRUDBtns>
                    </IndividualPeopleContainer>
                  );
                })}
                <ButtonContainer>
                  <CreateButton />
                </ButtonContainer>
              </>
            ) : (
              <>{peopleData && <h6>No Timelines</h6>}</>
            )}
          </>
        )}
      </PeopleFeedInnerContainer>
    </MainContainer>
  );
}

export default PeopleFeed;
