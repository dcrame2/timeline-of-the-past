import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import AllThemes from "@/components/allThemes/Index";
import { themeData } from "@/themes/themeData";
import CreateButton from "@/components/reusable/createButton/Index";
import SectionHeader from "@/components/reusable/sectionHeader/Index";

function Themes() {
  return (
    <Layout>
      <SectionHeader
        backButton={true}
        button={<CreateButton />}
        heading={`Theme examples (${themeData.length} themes)`}
      />
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
