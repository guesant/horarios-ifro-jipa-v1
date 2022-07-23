import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as gtag from "../features/gtag";
import Analytics from "../components/Analytics/Analytics";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  const router = useRouter();

  useEffect(() => {
    if (!gtag.GA_TRACKING_ID) {
      return;
    }

    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Analytics />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
