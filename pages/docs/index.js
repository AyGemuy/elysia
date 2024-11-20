import { Container, Alert } from 'react-bootstrap';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

export default function Docs() {
  return (
    <section className="features py-5 bg-light fade-in-section">
      <Container fluid className="py-5 position-relative">
        <div className="background-static"></div>
        <Alert variant="primary" className="text-center mb-4">
          <h1>Welcome to the Documentation</h1>
          <p>Explore our API reference and get started quickly!</p>
        </Alert>
        <ApiReferenceReact
          configuration={{
            spec: { url: '/docs/openapi.json' },
            darkMode: true,
          }}
        />
      </Container>
    </section>
  );
}
