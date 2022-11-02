import Card from 'react-bootstrap/Card';
import { Button, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function InverterCard (props) {
    return (
        <Card>
        <Card.Header>
            <Row xs={2} className='align-items-center'>
            <Col>Falownik</Col>
            <Col className="justify-content-end">
            <Button variant="primary" size="sm">
              Edytuj
            </Button>{' '}
            <Button variant="danger" size="sm">
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
