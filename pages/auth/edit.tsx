import React, { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import EditPeopleScreen from "@/components/peopleFeed/editPeopleScreen/Index";
import HourGlassLottieLoading from "@/components/reusable/hourglassLottieLoading/Index";
import { motion } from "framer-motion";
import { variables } from "@/styles/Variables";
import { MediaQueries } from "@/styles/Utilities";
import { useRouter } from "next/router";
import styled from "styled-components";
import MainContainer from "@/components/reusable/mainContainer/Index";
import SectionHeader from "@/components/reusable/sectionHeader/Index";
import BackButton from "@/components/reusable/backButton/Index";

const HourGlassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PeopleScreen = styled(motion.div)`
  background-color: ${variables.lightGrey};
  margin: 0px 24px 24px;
  padding: 88px 24px 24px;
  z-index: 105;
  border-radius: 12px;
  /* max-width: 1000px; */
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  h2 {
    color: ${variables.black};
    grid-column: 1 / span 2;
    letter-spacing: 1.5px;
  }
  @media ${MediaQueries.mobile} {
    padding: 88px 24px 24px;
    height: 80dvh;
  }
`;

function EditTimeline() {
  const router = useRouter();
  const { query } = router;
  const { person: personQuery, selectedIndex: selectedIndexQuery } = query;

  const [person, setPerson] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [receivedPersonData, setReceivedPersonData] = useState(false);

  useEffect(() => {
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
      {receivedPersonData ? (
        <EditPeopleScreen
          setReceivedPersonData={setReceivedPersonData}
          person={person}
          selectedIndex={selectedIndex}
        />
      ) : (
        <>
          <SectionHeader
            heading={`Editing ${person?.firstName} ${person?.lastName}'s timeline`}
            button={<BackButton />}
          />
          {/* <MainContainer> */}
          <HourGlassContainer>
            <HourGlassLottieLoading />
          </HourGlassContainer>
          {/* </MainContainer> */}
        </>
      )}
    </Layout>
  );
}

export default EditTimeline;

export async function getServerSideProps(context: NextPageContext) {
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
    },
  };
}
