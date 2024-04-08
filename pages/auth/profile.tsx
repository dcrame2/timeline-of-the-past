import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react"; // Import useSession
import { Session } from "next-auth";
import styled from "styled-components";
import ProfileComponent from "@/components/profile/Index";

interface ProfileProps {
  session: Session | null;
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

const InfoContainer = styled.div`
  grid-area: dashboard;
  h1 {
    font-size: 30px;
    margin: 24px;
    color: #060606;
  }
`;

function Profile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout>
      <TimelineView>
        <InfoContainer>
          {session && (
            <h1>
              {session?.user.firstName} {session?.user.lastName}'s Profile
            </h1>
          )}
          <ProfileComponent session={session} />
        </InfoContainer>
      </TimelineView>
    </Layout>
  );
}

export default Profile;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  console.log(session, "session");
  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { session },
  };
}
