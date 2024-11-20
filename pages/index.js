import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";

const Home = () => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <div className="d-flex justify-content-center mb-2">
          <img
            src="/favicon.png"
            alt="Profile Icon"
            className="rounded-circle"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        </div>
        <Navbar.Brand href="/">Wudysoft Docs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {["Stats", "Docs", "Mikasa", "Swagger", "Stoplight"].map((link, index) => (
              <Nav.Link href={`/${link.toLowerCase()}`} key={index}>
                {link}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div
      className="hero-section d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: "url('/img/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        color: "#fff",
      }}
    >
      <Container>
        <h1>Selamat Datang di Wudysoft Docs</h1>
        <p>Dokumentasi dan Panduan Wudysoft untuk Pengembang Modern.</p>
        <Button variant="primary" size="lg" href="/docs">
          Lihat Dokumentasi
        </Button>
      </Container>
    </div>

    <Container className="my-5">
      <h2 id="features" className="text-center mb-4 text-primary">
        Fitur Utama
      </h2>
      <Row>
        {["Deploy Cepat", "Serverless Functions", "Integrasi Mudah"].map((feature, idx) => (
          <Col md={4} key={idx}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{feature}</Card.Title>
                <Card.Text>
                  {feature === "Deploy Cepat" &&
                    "Publikasikan situs Anda dalam hitungan detik dengan otomatisasi CI/CD yang terintegrasi."}
                  {feature === "Serverless Functions" &&
                    "Tambahkan logika backend tanpa harus mengelola server."}
                  {feature === "Integrasi Mudah" &&
                    "Terhubung dengan alat-alat pengembang seperti GitHub, GitLab, atau Bitbucket."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    <Container className="my-5">
      <h2 id="docs" className="text-center mb-4 text-primary">
        Dokumentasi
      </h2>
      <p className="text-center" style={{ fontSize: "1.2rem", color: "#555" }}>
        Kunjungi dokumentasi lengkap kami untuk belajar lebih lanjut.
      </p>
      <div className="text-center">
        <Button variant="success" href="/docs">
          Baca Dokumentasi
        </Button>
      </div>
    </Container>

    <footer className="bg-dark text-white py-4 text-center">
      <Container>
        <p>
          &copy; {new Date().getFullYear()} Wudysoft. Dibangun dengan{" "}
          <a href="https://react-bootstrap.github.io/" className="text-info">
            React-Bootstrap
          </a>.
        </p>
      </Container>
    </footer>
  </>
);

export default Home;
