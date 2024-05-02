import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { h1styles } from "@/styles/Type";
import { SlimLayout } from "@/mainWebsite2/components/SlimLayout";
import Link from "next/link";
import { Logo } from "@/mainWebsite2/components/Logo";
import { Button } from "@nextui-org/react";

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
    <div className="h-lvh">
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <p className="mt-20 text-sm font-medium text-gray-700">404</p>
        <h1 className="mt-3 text-xl font-semibold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-gray-700">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button as={Link} className="text-white bg-lightOrange mt-10" href="/">
          Go back home
        </Button>
      </SlimLayout>
    </div>
  );
}

export default Custom404;
