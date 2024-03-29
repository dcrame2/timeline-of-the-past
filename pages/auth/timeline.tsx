import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AuthSignOutButton from "@/components/reusable/authSIgnOutButton/Index";
import AddNewPersonButton from "@/components/reusable/addNewPersonButton/Index";
import NewPersonForm from "@/components/newPersonForm/Index";
import PeopleFeed from "@/components/peopleFeed/Index";
import styled from "styled-components";
import TabNavigation from "@/components/layout/dashboard/tabNavigation/Index";
import DashboardHeader from "@/components/layout/dashboard/dashboardHeader/Index";
// import { fetchData } from "@/lib/fetchData";

import Layout from "@/components/layout/dashboard/Index";

export default function Protected() {
  const [showAddPersonFields, setShowAddPersonFields] =
    useState<boolean>(false);

  interface UserData {
    firstName?: string;
    lastName?: string;
  }

  interface PeopleDataProps {
    userData?: UserData[];
  }

  const TimelineView = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "dashboard dashboard dashboard"
      "dashboard dashboard dashboard"
      "dashboard dashboard dashboard";
  `;

  const DashboardHeaderContainer = styled.div`
    grid-area: header;
    /* background-color: white; */
    /* border-bottom: 5px solid steelblue; */
    z-index: 101;
    padding: 20px;
    position: fixed;
    width: 100%;
  `;

  const NavContainer = styled.div`
    margin: 24px;
    display: flex;
    justify-content: space-between;
  `;

  const InfoContainer = styled.div`
    grid-area: dashboard;
    h1 {
      font-size: 30px;
      margin: 24px;
      color: #060606;
    }
  `;

  const [peopleData, setPeopleData] = useState<PeopleDataProps>({});

  const fetchData = async () => {
    try {
      const session = await getSession();
      if (!session) {
        return; // No session, no need to fetch data
      }
      const sessionUserEmail = session?.user?.email;
      console.log(session, "sessionsss BETTTT");

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

      setPeopleData(userData);

      return userData;
      // Process userData as needed
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <TimelineView>
        <InfoContainer>
          <h1>Hi, Dylan!</h1>
          <PeopleFeed
            setShowAddPersonFields={setShowAddPersonFields}
            showAddPersonFields={showAddPersonFields}
            fetchData={fetchData}
            setPeopleData={setPeopleData}
            peopleData={peopleData}
          />
        </InfoContainer>
      </TimelineView>
    </Layout>
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
