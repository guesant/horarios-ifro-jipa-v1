import Script from "next/script";
import { GA_TRACKING_ID } from "../../features/gtag";

const Analytics = () => {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="ga-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
    </>
  );
};

export default Analytics;
