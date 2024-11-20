import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultSeo } from 'next-seo';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wudysoft - AI API</title>
        <meta name="description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="keywords" content="Wudysoft, AI, API, Machine Learning, Next.js" />
        <meta name="author" content="Wudysoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Wudysoft - AI API" />
        <meta property="og:description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Wudysoft" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wudysoft - AI API" />
        <meta name="twitter:description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:site" content="@Wudysoft" />
        <meta name="twitter:creator" content="@Wudysoft" />

        {/* Google Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="/" />
      </Head>

      <DefaultSeo
        title="Wudysoft - AI API"
        description="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi."
        openGraph={{
          url: '/',
          title: 'Wudysoft - AI API',
          description: 'Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi.',
          images: [
            {
              url: '/favicon.png',
              width: 800,
              height: 600,
              alt: 'Wudysoft AI API',
            },
          ],
          site_name: 'Wudysoft',
        }}
        twitter={{
          handle: '@Wudysoft',
          site: '@Wudysoft',
          cardType: 'summary_large_image',
        }}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
