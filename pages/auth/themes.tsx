import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import AllThemes from "@/components/allThemes/Index";

function Themes() {
  return (
    <Layout>
      <AllThemes />
    </Layout>
  );
}

export default Themes;

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
