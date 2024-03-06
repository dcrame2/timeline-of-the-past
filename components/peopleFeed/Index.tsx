import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import EditPeopleScreen from "./editPeopleScreen/Index";

interface UserData {
  enteredfirstName?: string;
  enteredLastName?: string;
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

const IndividualPeopleContainer = styled.div`
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
  enteredfirstName?: string;
  enteredLastName?: string;
}

function PeopleFeed({ peopleData }: { peopleData: PeopleDataProps }) {
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PeopleProps | null>(
    null
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const showEditScreenHandler = (person: PeopleProps, index: number) => {
    setShowEditScreen(!showEditScreen);
    setSelectedPerson(person);
    setSelectedIndex(index);
  };

  return (
    <PeopleFeedContainer>
      {peopleData &&
        peopleData?.userData?.map((person, index) => {
          const { enteredfirstName, enteredLastName } = person;
          return (
            <IndividualPeopleContainer>
              <p>
                Name: {enteredfirstName} {enteredLastName}
              </p>
              <CRUDBtns>
                <button onClick={() => showEditScreenHandler(person, index)}>
                  Edit
                </button>
                {showEditScreen && (
                  <EditPeopleScreen
                    setShowEditScreen={setShowEditScreen}
                    showEditScreenHandler={showEditScreenHandler}
                    showEditScreen={showEditScreen}
                    person={selectedPerson}
                    selectedIndex={selectedIndex}
                  />
                )}
                <button>Delete</button>
              </CRUDBtns>
            </IndividualPeopleContainer>
          );
        })}
    </PeopleFeedContainer>
  );
}

export default PeopleFeed;
