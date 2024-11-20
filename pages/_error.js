import React from "react";
import { Button, Container, Row, Col, Alert, Image } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Alert variant="danger" style={styles.alert}>
            {/* Profile Icon */}
            <Image 
              src="/img/image.jpeg" 
              roundedCircle 
              alt="Profile Icon" 
              width="100" 
              height="100"
              className="mb-4" 
              style={styles.profileImage}
            />
            <h1 style={styles.title}>404</h1>
            <p style={styles.message}>Halaman yang Anda cari tidak ditemukan.</p>
            <Button variant="primary" href="/" size="lg" style={styles.button}>
              Kembali ke Beranda
            </Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  alert: {
    backgroundColor: "#ffdddd",
    color: "#900",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  profileImage: {
    border: "3px solid #900",
    borderRadius: "50%",
    objectFit: "cover",
  },
  title: {
    fontSize: "5rem",
    fontWeight: "bold",
    color: "#900",
  },
  message: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#0062cc",
    borderColor: "#0062cc",
    padding: "10px 30px",
    fontSize: "1.1rem",
    borderRadius: "50px",
    transition: "all 0.3s ease",
  },
};
