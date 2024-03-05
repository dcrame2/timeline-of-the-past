import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AuthSignOutButton from "@/components/reusable/authSIgnOutButton/Index";
import AddNewPersonButton from "@/components/reusable/addNewPersonButton/Index";
import NewPersonForm from "@/components/newPersonForm/Index";
import PeopleFeed from "@/components/peopleFeed/Index";

export default function Protected({ session }: any) {
  const [showAddPersonFields, setShowAddPersonFields] =
    useState<boolean>(false);
  console.log(session, "session");

  interface UserData {
    enteredfirstName?: string;
    enteredLastName?: string;
  }

  interface PeopleDataProps {
    userData?: UserData[];
  }

  const [peopleData, setPeopleData] = useState<PeopleDataProps>({});

  console.log(peopleData, "PeopleData");
  const fetchData = async () => {
    try {
      const session = await getSession();
      if (!session) {
        return; // No session, no need to fetch data
      }
      const sessionUserEmail = session?.user?.email;
      console.log(sessionUserEmail, "sessionsss");

      const response = await fetch("/api/people/get-people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include the sessionUserEmail in the request body
        body: JSON.stringify({ sessionUserEmail }),
      });
      console.log(response, "Response");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      console.log(userData, "userData");
      setPeopleData(userData);
      // Process userData as needed
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <AddNewPersonButton
        setShowAddPersonFields={setShowAddPersonFields}
        showAddPersonFields={showAddPersonFields}
      />
      {!showAddPersonFields && <NewPersonForm fetchData={fetchData} />}
      <AuthSignOutButton />
      <PeopleFeed peopleData={peopleData} />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  console.log(session, "session");
  if (!session) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }

  return {
    props: { session },
  };
}
