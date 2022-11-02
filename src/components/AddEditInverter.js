import { Form, Button, Card, Container } from 'react-bootstrap';
import { useState } from "react"
import * as Constants from '../constants/constants'

export default function (props) {

  
  const [type, setType] = useState("solax")

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  return (
    <Container>
    <Card className="center-card edit-card shadow">
      <Card.Header>Dodaj falownik</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nazwa:</Form.Label>
            <Form.Control type="text" placeholder="Wprowadź nazwę" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Marka:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleTypeChange}>
              <option value={Constants.InverterType.Solax}>Solax</option>
              <option value={Constants.InverterType.SolarEdge}>SolarEdge</option>
            </Form.Select>
          </Form.Group>
          {type === Constants.InverterType.Solax &&
            <div>
            <Form.Group className="mb-3" controlId="serialNumber">
              <Form.Label>Numer seryjny:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź numer seryjny" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tokenId">
              <Form.Label>Token id:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź token id" />
            </Form.Group>
            </div>
          }
          {type === Constants.InverterType.SolarEdge &&
            <div>
            <Form.Group className="mb-3" controlId="apiKey">
              <Form.Label>Api key:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź API key" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="siteId">
              <Form.Label>Site id:</Form.Label>
              <Form.Control type="text" placeholder="Wprowadź site id" />
            </Form.Group>
            </div>
          }
          <Button variant="primary" type="submit">
            Zapisz
          </Button>
        </Form>
      </Card.Body>
    </Card>
    </Container>
    )}
