import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { h1styles } from "@/styles/Type";

const Cutom404Container = styled.div`
  width: 100vw;
  height: 100dvh;
`;
const Cutom404InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  h1 {
    text-align: center;
    ${h1styles}
  }
`;

function Custom404() {
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to custom 404 page
  //   router.replace("/404");
  // }, []);

  return (
    <Cutom404Container>
      <Cutom404InnerContainer>
        <h1>Custom 404 page coming soon!</h1>
      </Cutom404InnerContainer>
    </Cutom404Container>
  );
}

export default Custom404;
