import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Image } from "react-bootstrap";

export default function Endpoint() {
  const [endpoint, setEndpoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEndpoint() {
      try {
        const response = await fetch("/docs/openapi.json");

        if (!response.ok) {
          throw new Error("Failed to load the OpenAPI documentation");
        }

        const data = await response.json();
        setEndpoint(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchEndpoint();
  }, []);

  const renderPathsByTags = () => {
    if (!endpoint?.paths) return null;

    const tags = {};
    Object.entries(endpoint.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        details.tags?.forEach((tag) => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push({ path, method, details });
        });
      });
    });

    return Object.entries(tags).map(([tag, endpoints]) => (
      <Card key={tag} className="mb-4">
        <Card.Header as="h5">{tag}</Card.Header>
        <Card.Body>
          {endpoints.map(({ path, method, details }, idx) => (
            <div key={`${path}-${method}`} className="mb-3">
              <h6>
                {idx + 1}. {method.toUpperCase()} <code>{path}</code>
              </h6>
              <p><strong>Summary:</strong> {details.summary || "N/A"}</p>
              <p><strong>Description:</strong> {details.description || "N/A"}</p>
              <Button variant="primary" href={path} target="_blank">
                Go to {method.toUpperCase()} Endpoint
              </Button>
            </div>
          ))}
        </Card.Body>
      </Card>
    ));
  };

  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#f7f9fa" }}>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Image src="/img/image.jpeg" roundedCircle width={80} height={80} alt="Profile Icon" />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          {error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : endpoint ? (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{endpoint.info.title}</Card.Title>
                  <Card.Text>{endpoint.info.description}</Card.Text>
                  <Card.Text><strong>Version:</strong> {endpoint.info.version}</Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Servers</Card.Title>
                  {endpoint.servers.map((server, index) => (
                    <p key={index}>
                      <strong>{server.description}:</strong> {server.url}
                    </p>
                  ))}
                </Card.Body>
              </Card>

              {renderPathsByTags()}
            </>
          ) : (
            <Spinner animation="border" variant="primary" className="d-block mx-auto" />
          )}
        </Col>
      </Row>
    </Container>
  );
}
