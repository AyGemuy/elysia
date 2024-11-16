import dynamic from 'next/dynamic';

const RedocStandalone = dynamic(() => import('redoc').then((mod) => mod.RedocStandalone), { ssr: false });

export default function ApiDocs() {
  return (
    <RedocStandalone
      specUrl="/openapi.json"
      options={{
        theme: {
          colors: {
            primary: { main: '#0066cc' },
          },
          typography: {
            fontSize: '16px',
          },
        },
        hideDownloadButton: false,
      }}
    />
  );
}
