import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import UploadFileInput from "@/components/reusable/formFields/uploadFileInputNew/Index";

function MediaLibrary() {
  return (
    <Layout>
      <UploadFileInput />
    </Layout>
  );
}

export default MediaLibrary;

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
