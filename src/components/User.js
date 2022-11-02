import { Form, Button, Card, Container } from 'react-bootstrap';

export default function (props) {
    return (
      <Container fluid="md">
      <Card className="edit-card shadow">
        <Card.Header>Użytkownik</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Imię:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź imię" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="secondName">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź nazwisko" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Wprowadź email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>Login:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź login" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Hasło:</Form.Label>
              <Form.Control type="password" placeholder="Wprowadź hasło" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Potwierdź hasło:</Form.Label>
              <Form.Control type="password" placeholder="Potwierdź hasło" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Zapisz
            </Button>{' '}
            <Button variant="danger">
              Usuń konto
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Container>
    )}
