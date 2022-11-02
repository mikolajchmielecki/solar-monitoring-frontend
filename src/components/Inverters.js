import Button from 'react-bootstrap/Button';
import InverterCard from './InverterCard';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';


export default function (props) {
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
