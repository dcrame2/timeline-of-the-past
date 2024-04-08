import React, { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import NewPersonForm from "@/components/newPersonForm/Index";
import EditPeopleScreen from "@/components/peopleFeed/editPeopleScreen/Index";
import HourGlassLottieLoading from "@/components/reusable/hourglassLottieLoading/Index";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";

import { useRouter } from "next/router";
import styled from "styled-components";

const HourGlassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PeopleScreen = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 88px;
  z-index: 105;
  border-radius: 12px;
  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.tablet} {
    padding: 88px 24px 24px;
  }
  @media ${MediaQueries.mobile} {
    padding: 88px 24px;
  }
`;
function EditTimeline() {
  const router = useRouter();
  const { query } = router;
  const { person: personQuery, selectedIndex: selectedIndexQuery } = query;

  const [person, setPerson] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [receivedPersonData, setReceivedPersonData] = useState(false);

  useEffect(() => {
    // if (personQuery) {
    //   try {
    //     const parsedPerson = JSON.parse(personQuery);
    //     setPerson(parsedPerson);
    //     setReceivedPersonData(true);
    //   } catch (error) {
    //     console.error("Error parsing person:", error);
    //   }
    // }
    // if (selectedIndexQuery) {
    //   setSelectedIndex(selectedIndexQuery);
    // }
    if (personQuery) {
      try {
        // Ensure personQuery is always a string
        const queryString = Array.isArray(personQuery)
          ? personQuery[0]
          : personQuery;
        const parsedPerson = JSON.parse(queryString);
        setPerson(parsedPerson);
        setReceivedPersonData(true);
      } catch (error) {
        console.error("Error parsing person:", error);
      }
    }

    if (selectedIndexQuery) {
      try {
        // Ensure selectedIndexQuery is always a number before setting it to the state
        const indexValue = Array.isArray(selectedIndexQuery)
          ? parseInt(selectedIndexQuery[0])
          : parseInt(selectedIndexQuery);
        setSelectedIndex(indexValue);
      } catch (error) {
        console.error("Error parsing selectedIndex:", error);
      }
    }
  }, [personQuery, selectedIndexQuery]);

  return (
    <Layout>
      <PeopleScreen>
        {receivedPersonData ? (
          <EditPeopleScreen
            setReceivedPersonData={setReceivedPersonData}
            person={person}
            selectedIndex={selectedIndex}
          />
        ) : (
          <HourGlassContainer>
            <HourGlassLottieLoading />
          </HourGlassContainer>
        )}
      </PeopleScreen>
    </Layout>
  );
}

export default EditTimeline;

export async function getServerSideProps(context: NextPageContext) {
  //   const { fetchData, showEditScreen, person, selectedIndex, setUploadDatas } =

  // console.log(context, "Contexttttt");
  //     context.query;
  const session = await getSession({ req: context.req });
  console.log(session, "session");
  if (!session) {
    return {
      redirect: { destination: "/auth/authenticate", permanent: false },
    };
  }

  return {
    props: {
      session,
      //   fetchData,
      //   showEditScreen,
      //   person,
      //   selectedIndex,
      //   setUploadDatas,
    },
  };
}
