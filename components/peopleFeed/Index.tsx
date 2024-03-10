import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import EditPeopleScreen from "./editPeopleScreen/Index";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  firstName?: string;
  lastName?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

const PeopleFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 24px;
`;

const IndividualPeopleContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding: 24px 12px;
  background-color: #fff;
  border-radius: 12px;
  justify-content: space-between;
  color: #000;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 8px 24px;
`;

const CRUDBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

interface PeopleProps {
  firstName?: string;
  lastName?: string;
  dob?: string;
}

function PeopleFeed({
  peopleData,
  fetchData,
  setPeopleData,
}: {
  peopleData: PeopleDataProps;
  setPeopleData: any;
  fetchData: () => void;
}) {
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PeopleProps | null>(
    null
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [selectedIndexDelete, setSelectedIndexDelete] = useState(-1);

  const showEditScreenHandler = (person: PeopleProps, index: number) => {
    setShowEditScreen(!showEditScreen);
    setSelectedPerson(person);
    setSelectedIndex(index);
  };

  const deletePeopleHandler = async (person: PeopleProps, index: number) => {
    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    // setSelectedIndexDelete(index);

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

    fetchData();

    console.log(response, "Response");
  };

  const motionPropsUp = {
    initial: {
      opacity: 0,
      y: "100%",
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: "100%",
      opacity: 0,
    },
    transition: {
      duration: 0.4,
    },
  };

  return (
    <PeopleFeedContainer>
      {peopleData &&
        peopleData?.userData?.map((person, index) => {
          const { firstName, lastName } = person;
          console.log(person, "PERSON");
          return (
            <AnimatePresence>
              <IndividualPeopleContainer
                key={`${index}-person`}
                {...motionPropsUp}
              >
                <p>
                  Name: {firstName} {lastName}
                </p>
                <CRUDBtns>
                  <button onClick={() => showEditScreenHandler(person, index)}>
                    Edit
                  </button>

                  <button onClick={() => deletePeopleHandler(person, index)}>
                    Delete
                  </button>
                </CRUDBtns>
              </IndividualPeopleContainer>
              {showEditScreen && (
                <EditPeopleScreen
                  fetchData={fetchData}
                  setShowEditScreen={setShowEditScreen}
                  showEditScreenHandler={showEditScreenHandler}
                  showEditScreen={showEditScreen}
                  person={selectedPerson}
                  selectedIndex={selectedIndex}
                />
              )}
            </AnimatePresence>
          );
        })}
    </PeopleFeedContainer>
  );
}

export default PeopleFeed;
