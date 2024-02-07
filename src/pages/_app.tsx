import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // <SessionProvider > untuk setup next-auth
    <SessionProvider session={session}>
      <AppShell>
        <Component {...pageProps} />   
      </AppShell>
    </SessionProvider>
  )
}
