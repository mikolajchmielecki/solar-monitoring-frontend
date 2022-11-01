import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function (props) {
    return (
        <Card className="center-card edit-card shadow">
          <Card.Header>Licznik energii elektrycznej</Card.Header>
          <Card.Body>
            <Form>
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
              </Button>
            </Form>
          </Card.Body>
        </Card>    
        )}
