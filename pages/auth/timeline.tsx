import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import PeopleFeed from "@/components/peopleFeed/Index";
import styled from "styled-components";
import { pBase, pXSmall } from "@/styles/Type";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
// import { fetchData } from "@/lib/fetchData";

import Layout from "@/components/layout/dashboard/Index";
import { fetchUserData } from "@/lib/fetchUserData";
import { Button } from "@nextui-org/react";

const TimelineViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "dashboard dashboard dashboard"
    "dashboard dashboard dashboard"
    "dashboard dashboard dashboard";
`;

const InfoContainer = styled.div`
  grid-area: dashboard;
  h1 {
    font-size: 30px;
    margin: 24px;
    color: #060606;
  }
  .remaining-timelines {
    ${pXSmall};
    margin: 24px;
  }
`;

interface UserData {
  firstName?: string;
  lastName?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

export default function Protected() {
  const [showAddPersonFields, setShowAddPersonFields] =
    useState<boolean>(false);

  const [peopleData, setPeopleData] = useState<PeopleDataProps>({});
  const [isLoading, setIsLoading] = useState(true);
  const [specificUserInfo, setSpecificUserInfo] = useState<any>();
  const session = useSession();
  console.log(session);
  const fetchData = async () => {
    try {
      const session = await getSession();
      if (!session) {
        return; // No session, no need to fetch data
      }
      const sessionUserEmail = session?.user?.email;
      // console.log(session, "sessionsss BETTTT");

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
      setIsLoading(false);
      return userData;
      // Process userData as needed
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  async function getUserInfo() {
    try {
      const userInfo = await fetchUserData();
      setSpecificUserInfo(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // You can handle the error here, such as throwing it or returning a default value
      return null;
    }
  }

  useEffect(() => {
    fetchData();
    getUserInfo();
  }, []);

  console.log(specificUserInfo, "specificUserInfo");

  // const { user } = specificUserInfo;

  console.log(session);

  return (
    <Layout>
      <TimelineViewContainer>
        <InfoContainer>
          <h1>
            Hello, {session?.data?.user.firstName}{" "}
            {session?.data?.user.lastName}!
          </h1>

          {specificUserInfo && (
            <p className="remaining-timelines">
              {specificUserInfo?.user?.remainingTimelines} remaining Timelines
            </p>
          )}
          <PeopleFeed
            fetchData={fetchData}
            peopleData={peopleData}
            isLoading={isLoading}
            getUserInfo={getUserInfo}
            specificUserInfo={specificUserInfo}
          />
        </InfoContainer>
      </TimelineViewContainer>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  console.log(session, "session");
  if (!session) {
    return {
      redirect: { destination: "/auth/authenticate", permanent: false },
    };
  }

  return {
    props: { session },
  };
}
