import { Button, Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import * as Constants from '../constants/constants'

export default function InverterCard ({id, inverter, handleDelete}) {

  function round(number) {
    return Math.round(number * 100) / 100
  }

  const valid = inverter.inverterParameters.status !== "COMMUNICATION_ERROR"

    return (
        <Card style={{minWidth: '20em'}}>
        <Card.Header>
            <Row xs={2} className='align-items-center'>
            <Col>{inverter.name}</Col>
            <Col className="justify-content-end">
            <Link to={"/inverter/"+id} >
            <Button variant="primary" size="sm" >
              Edytuj
            </Button>
            </Link>{' '}
            <Button value={id} variant="danger" size="sm" onClick={handleDelete}>
              Usuń
            </Button>
            </Col>
            </Row>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Status: <strong>{inverter.inverterParameters.status}</strong></ListGroup.Item>
          <ListGroup.Item>Marka: <strong>{inverter.type===Constants.InverterType.SolarEdge ? "SolarEdge" : "Solax"}</strong></ListGroup.Item>
          <ListGroup.Item>Bierząca moc: {valid ? <strong>{round(inverter.inverterParameters.currentPower)} W</strong> : <strong>---</strong>}</ListGroup.Item>
          <ListGroup.Item>Dzisiejsza produkcja: {valid ? <strong>{round(inverter.inverterParameters.todayYield)} kWh</strong> : <strong>---</strong>}</ListGroup.Item>
          <ListGroup.Item>Całkowita produkcja: {valid ? <strong>{round(inverter.inverterParameters.totalYield)} kWh</strong> : <strong>---</strong>}</ListGroup.Item>
        </ListGroup>
      </Card>
    )}
