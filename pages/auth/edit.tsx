import React, { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import NewPersonForm from "@/components/newPersonForm/Index";
import EditPeopleScreen from "@/components/peopleFeed/editPeopleScreen/Index";

import { useRouter } from "next/router";
function EditTimeline() {
  const router = useRouter();
  const { query } = router;
  const { person: personQuery, selectedIndex: selectedIndexQuery } = query;

  const [person, setPerson] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [receivedPersonData, setReceivedPersonData] = useState(false);

  useEffect(() => {
    if (personQuery) {
      try {
        const parsedPerson = JSON.parse(personQuery);
        setPerson(parsedPerson);
        setReceivedPersonData(true);
      } catch (error) {
        console.error("Error parsing person:", error);
      }
    }
    if (selectedIndexQuery) {
      setSelectedIndex(selectedIndexQuery);
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
        <p>Loading...</p>
      )}
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
      redirect: { destination: "/auth", permanent: false },
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
