import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react"; // Import useSession
import { Session } from "next-auth";
import styled from "styled-components";
import ProfileComponent from "@/components/profile/Index";
import Title from "@/components/reusable/title/Index";

interface ProfileProps {
  session: Session | null;
}

function Profile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout>
      {session && (
        <Title
          name={`${session?.user.firstName} ${session?.user.lastName}'s Profile`}
        />
      )}
      <ProfileComponent session={session} />
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
