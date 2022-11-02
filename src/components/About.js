import { Card, Container } from 'react-bootstrap';

export default function About (props) {
    return (
      <Container fluid="lg">
          <Card className="about-content shadow">
          <Card.Header>O aplikacji</Card.Header>
          <Card.Body>
            <Card.Title>Solar Monitoring<br/>
            <p className='grey-text'>Aplikacja do monitorowania systemów fotowoltaicznych</p>
            </Card.Title>
            <Card.Text>
              Aplikacja pozwala na agregowanie danych z wielu systemów fotowoltaicznych.<br/>
              System komunikuje się z dwiema markami falowników: <strong>Solax</strong> i <strong>SolarEdge</strong>.<br/>
              System pobiera dane z licznika energetycznego. Licznik obsługiwany przez system to licznik dostarczany przez operatora <strong>Energa</strong>.<br/>
            </Card.Text>
          </Card.Body>
        </Card>
    </Container>
    )}
