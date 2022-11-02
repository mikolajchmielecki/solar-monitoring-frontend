import InverterCard from './InverterCard';
import { Container, Col, Row } from 'react-bootstrap';


export default function Inverters (props) {
    return (
      <Container>
      <Row xs={1} md={2} className='justify-content-md-center'>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <InverterCard/>
        </Col>
      ))}
    </Row>
    </Container>
    )}
