import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { store } from "@/stores/store";

import { SignInModal } from "@/components/SignInModal";
import { Header } from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {router.pathname !== "/survey/edit" && <Header />}
          <Component {...pageProps} />
          <SignInModal />
        </Provider>
      </SessionProvider>
    </>
  );
}
