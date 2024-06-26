import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import PeopleFeed from "@/components/peopleFeed/Index";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { fetchUserData } from "@/lib/fetchUserData";

import styled from "styled-components";
import CreateButton from "@/components/reusable/createButton/Index";
import { MediaQueries } from "@/styles/Utilities";
import { pXSmall } from "@/styles/Type";
import SectionHeader from "@/components/reusable/sectionHeader/Index";

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 1000px; */
  padding-bottom: 4px;
  @media ${MediaQueries.mobile} {
    gap: 16px;
  }
`;

const HeaderAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-bottom: 12px; */
  p {
    ${pXSmall}
  }
`;

const ButtonInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface UserData {
  firstName?: string;
  lastName?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

export default function Protected() {
  const [peopleData, setPeopleData] = useState<PeopleDataProps>({});
  const [isLoading, setIsLoading] = useState(true);
  const [specificUserInfo, setSpecificUserInfo] = useState<any>();
  const session = useSession();
  console.log(session);
  const fetchData = async () => {
    try {
      const session = await getSession();
      if (!session) {
        return;
      }
      const sessionUserEmail = session?.user?.email;

      const response = await fetch("/api/people/get-people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

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
  console.log(session);

  return (
    <Layout>
      <SectionHeader
        button={<CreateButton />}
        heading={`Hello, ${session?.data?.user.firstName} ${session?.data?.user.lastName}!`}
      />

      <PeopleFeed
        fetchData={fetchData}
        peopleData={peopleData}
        isLoading={isLoading}
        getUserInfo={getUserInfo}
      />
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
