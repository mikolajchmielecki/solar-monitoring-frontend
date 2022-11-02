import Card from 'react-bootstrap/Card';
import { Button, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function (props) {
    return (
        <Card>
        <Card.Header>
            <Row xs={2} className='align-items-center'>
            <Col>Falownik</Col>
            <Col>
            <Button variant="primary" type="submit">
              Edytuj
            </Button>{' '}
            <Button variant="danger">
              Usuń
            </Button>
            </Col>
            </Row>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Status: <strong>ACITVE</strong></ListGroup.Item>
          <ListGroup.Item>Bierząca moc: <strong>128 W</strong></ListGroup.Item>
          <ListGroup.Item>Dzisiejsza produkcja: <strong>13 kWh</strong></ListGroup.Item>
          <ListGroup.Item>Całkowita produkcja: <strong>12343 kWh</strong></ListGroup.Item>
        </ListGroup>
      </Card>
    )}
