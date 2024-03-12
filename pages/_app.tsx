import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@/styles/global.css";
import { FileUploadProvider } from "@/context/FileUploadContext";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      <FileUploadProvider>
        {getLayout(<Component {...pageProps} />)}
      </FileUploadProvider>
    </SessionProvider>
  );
}
