import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@/styles/global.css";
import * as React from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { useState, createContext } from "react";
import { NextUIProvider } from "@nextui-org/react";
// import { createContext } from "vm";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Define the type for uploadDatas state
type UploadDataState = string[]; // Assuming uploadDatas stores an array of string URLs

// Define the type for setUploadDatas function
type SetUploadDataState = React.Dispatch<React.SetStateAction<UploadDataState>>;

// Create a context with an initial empty array
export const Context = createContext<[UploadDataState, SetUploadDataState]>([
  [],
  () => {},
]);

// export const Context = createContext([]);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // const [uploadDatas, setUploadDatas] = useState<UploadDataState>([]);

  // console.log(uploadDatas, "UPLOAD DATA ON APP");
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        {/* <Context.Provider value={[uploadDatas, setUploadDatas]}> */}
        {getLayout(<Component {...pageProps} />)}
        {/* </Context.Provider> */}
      </SessionProvider>
    </NextUIProvider>
  );
}
