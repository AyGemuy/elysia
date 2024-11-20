import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Stats() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/general/system-stats");
        const data = await response.json();
        response.ok ? setStats(data.Statistik) : setError(data.Pesan);
      } catch {
        setError("Gagal memuat statistik.");
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="stats py-5 bg-light" style={styles.section}>
      <div className="d-flex justify-content-center mb-3">
        <img src="/img/image.jpeg" alt="Profile Icon" className="rounded-circle" style={styles.profileImage} />
      </div>
      <Container fluid className="py-5">
        <Row xs={1} md={2} lg={3} className="g-4 text-center">
          {error ? (
            <Col>
              <Card className="glass-card shadow-sm" style={styles.card}>
                <Card.Body>
                  <Card.Title style={styles.cardTitle}>Error</Card.Title>
                  <Card.Text style={styles.cardText}>{error}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            Object.entries(stats).map(([key, value]) => (
              <Col key={key}>
                <Card className="glass-card shadow-sm" style={styles.card}>
                  <Card.Body>
                    <Card.Title style={styles.cardTitle}>{key}</Card.Title>
                    <Card.Text style={styles.cardText}>
                      {typeof value === "object"
                        ? Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey}>
                              <strong>{subKey}:</strong> {subValue}
                            </div>
                          ))
                        : value}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#f7f9fa",
    paddingTop: "5rem",
    paddingBottom: "5rem",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#0062cc",
  },
  cardText: {
    color: "#555",
  },
};
