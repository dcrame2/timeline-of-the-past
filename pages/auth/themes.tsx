import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import AllThemes from "@/components/allThemes/Index";
import Title from "@/components/reusable/title/Index";
import { themeData } from "@/themes/themeData";

function Themes() {
  return (
    <Layout>
      <Title name={`Theme examples (${themeData.length} themes)`} />
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
      redirect: { destination: "/auth/authenticate", permanent: false },
    };
  }

  return {
    props: { session },
  };
}
