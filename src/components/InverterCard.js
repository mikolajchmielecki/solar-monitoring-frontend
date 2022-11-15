import { Button, Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'

export default function InverterCard ({id, inverter}) {

  function round(number) {
    return Math.round(number * 100) / 100
  } 

    return (
        <Card>
        <Card.Header>
            <Row xs={2} className='align-items-center'>
            <Col>{inverter.name}</Col>
            <Col className="justify-content-end">
            <Link to={"/inverter/"+id} >
            <Button variant="primary" size="sm" >
              Edytuj
            </Button>
            </Link>{' '}
            <Button variant="danger" size="sm">
              Usuń
            </Button>
            </Col>
            </Row>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Status: <strong>{inverter.inverterParameters.status}</strong></ListGroup.Item>
          <ListGroup.Item>Bierząca moc: <strong>{round(inverter.inverterParameters.currentPower)} W</strong></ListGroup.Item>
          <ListGroup.Item>Dzisiejsza produkcja: <strong>{round(inverter.inverterParameters.todayYield)} kWh</strong></ListGroup.Item>
          <ListGroup.Item>Całkowita produkcja: <strong>{round(inverter.inverterParameters.totalYield)} kWh</strong></ListGroup.Item>
        </ListGroup>
      </Card>
    )}
