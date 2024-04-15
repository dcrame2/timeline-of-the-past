import React from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AddNewPersonButton from "../reusable/addNewPersonButton/Index";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { linkStyles, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";
import { MediaQueries } from "@/styles/Utilities";

interface UserData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  slug?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

const PeopleFeedContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 24px;
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.mobile} {
    padding: 12px;
  }
  h3 {
    font-size: 20px;
    color: ${variables.black};
  }
  h6 {
    color: ${variables.black};
  }
`;

const PeopleFeedInnerContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding-bottom: 12px;
  max-height: 550px;
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

const HeaderAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  return (
    <PeopleFeedContainer>
      <HeaderAddContainer>
        <h3>All Timelines</h3>
        <AddNewPersonButton specificUserInfo={specificUserInfo} />
      </HeaderAddContainer>
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
                        <ExternalBtn
                          target="_blank"
                          href={`https://timelinethat.com${slug}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <img src="/external-link.svg" alt="" />
                        </ExternalBtn>

                        <EditBtn
                          href={{
                            pathname: "/auth/edit",
                            query: {
                              person: JSON.stringify(person),
                              selectedIndex: index,
                            },
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <img src="/edit_icon.png" alt="icon" />
                        </EditBtn>
                        <DeleteBtn
                          whileHover={{ scale: 1.1 }}
                          onClick={() => deletePeopleHandler(person, index)}
                        >
                          <img src="/trash_icon.png" alt="icon" />
                        </DeleteBtn>
                      </CRUDBtns>
                    </IndividualPeopleContainer>
                  );
                })}
              </>
            ) : (
              <>{peopleData && <h6>No Timelines</h6>}</>
            )}
          </>
        )}
      </PeopleFeedInnerContainer>
    </PeopleFeedContainer>
  );
}

export default PeopleFeed;
