import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert, Image } from "react-bootstrap";

const Mikasa = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/ai/mikasa?prompt=${encodeURIComponent(message)}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const newResponse = await res.json();
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          user: message,
          ai: newResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada respon.",
        },
      ]);
      setMessage("");
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pesan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [responses]);

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3" style={{ backgroundColor: "#f5f5f5" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <Image src="/img/image.jpeg" roundedCircle width={70} height={70} alt="Profile" />
              <h5 className="mt-2">Mikasa AI</h5>
            </Card.Header>
            <Card.Body className="d-flex flex-column" style={{ height: "65vh", overflowY: "auto" }}>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="chat-box">
                {responses.map((response, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="text-end">
                      <Card.Text
                        className="p-2 bg-primary text-white rounded-pill d-inline-block"
                        style={{ maxWidth: "75%" }}
                      >
                        {response.user}
                      </Card.Text>
                    </div>
                    <div className="text-start">
                      <Card.Text
                        className="p-2 bg-light text-dark rounded-pill d-inline-block"
                        style={{ maxWidth: "75%" }}
                      >
                        {response.ai}
                      </Card.Text>
                    </div>
                  </div>
                ))}
                {loading && <Spinner animation="border" variant="primary" className="mt-3 mx-auto d-block" />}
              </div>
            </Card.Body>
            <Card.Footer>
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="text"
                  placeholder="Ketik sesuatu..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                  className="me-2"
                />
                <Button variant="primary" onClick={handleSendMessage} disabled={loading}>
                  Kirim
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Mikasa;
