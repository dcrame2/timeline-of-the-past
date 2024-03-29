import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import EditPeopleScreen from "./editPeopleScreen/Index";
import { motion, AnimatePresence } from "framer-motion";
import AddNewPersonButton from "../reusable/addNewPersonButton/Index";
import { variables } from "@/styles/Variables";
import Link from "next/link";

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
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  h3 {
    font-size: 20px;
    color: ${variables.black};
  }
  h6 {
    color: ${variables.black};
  }
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
`;

const CRUDBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const EditBtn = styled(motion.button)`
  background-color: rgb(100, 100, 0, 0.4);
  opacity: 0.7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
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
  img {
    width: 16px;
  }
`;

interface PeopleProps {
  firstName?: string;
  lastName?: string;
  dob?: string;
}

function PeopleFeed({
  peopleData,
  fetchData,
  setShowAddPersonFields,
  showAddPersonFields,
  setPeopleData,
}: {
  peopleData: PeopleDataProps;
  setPeopleData: any;
  fetchData: () => void;
  setShowAddPersonFields: any;
  showAddPersonFields: any;
}) {
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PeopleProps | null>(
    null
  );

  console.log(selectedPerson, "selectedPerson");

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const showEditScreenHandler = (person: PeopleProps, index: number) => {
    setShowEditScreen(!showEditScreen);
    setSelectedPerson(person);
    setSelectedIndex(index);
  };

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
      <HeaderAddContainer>
        <h3>All Timelines</h3>
        <AddNewPersonButton
          setShowAddPersonFields={setShowAddPersonFields}
          showAddPersonFields={showAddPersonFields}
          fetchData={fetchData}
        />
      </HeaderAddContainer>

      {peopleData && peopleData?.userData?.length === 0 && (
        <h6>No Timelines</h6>
      )}

      {!showEditScreen ? (
        <>
          {peopleData &&
            peopleData?.userData?.length !== undefined &&
            peopleData?.userData?.map((person, index) => {
              const { firstName, lastName } = person;

              return (
                <AnimatePresence mode="wait">
                  <IndividualPeopleContainer
                    key={`${index}-person`}
                    {...motionPropsUp}
                  >
                    <p>
                      Name: {firstName} {lastName}
                    </p>
                    <CRUDBtns>
                      <EditBtn
                        whileHover={{ scale: 1.1 }}
                        onClick={() => showEditScreenHandler(person, index)}
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
                </AnimatePresence>
              );
            })}
        </>
      ) : (
        <EditPeopleScreen
          fetchData={fetchData}
          setShowEditScreen={setShowEditScreen}
          showEditScreenHandler={showEditScreenHandler}
          showEditScreen={showEditScreen}
          person={selectedPerson}
          selectedIndex={selectedIndex}
        />
      )}
    </PeopleFeedContainer>
  );
}

export default PeopleFeed;
