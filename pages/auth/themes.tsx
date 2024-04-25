import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import AllThemes from "@/components/allThemes/Index";
import Title from "@/components/reusable/title/Index";
import { themeData } from "@/themes/themeData";
import styled from "styled-components";
import BackButton from "@/components/reusable/backButton/Index";
import CreateButton from "@/components/reusable/createButton/Index";

const ButtonInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  padding-bottom: 4px;
`;

function Themes() {
  return (
    <Layout>
      <HeadingContainer>
        <Title name={`Theme examples (${themeData.length} themes)`} />
        <ButtonInfo>
          <BackButton />
          <CreateButton />
        </ButtonInfo>
      </HeadingContainer>

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
