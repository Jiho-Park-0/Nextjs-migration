import Script from "next/script";

export const GoogleAnalytics = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SZT3Y0FH40"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SZT3Y0FH40');
        `}
      </Script>
    </>
  );
};
