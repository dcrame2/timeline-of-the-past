import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import NewPersonForm from "@/components/newPersonForm/Index";

function NewTimeline() {
  return (
    <Layout>
      <NewPersonForm />
    </Layout>
  );
}

export default NewTimeline;

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
