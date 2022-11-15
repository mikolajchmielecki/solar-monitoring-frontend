import InverterCard from './InverterCard';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import * as Constants from '../constants/constants';
import LoadingModal from './LoadingModal';


export default function Inverters ({token}) {

  const [loading, setLoading, loadingModal] = LoadingModal()
  const [failed, setFailed] = useState("");
  const [inverters, setInverters] = useState();
  async function getInverters() {
    return fetch(Constants.SERVER_URL + 'inverter/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setLoading(false)
      if (response.ok) {
        return response.json();
      }
      return response.json().then((errorObj) => setFailed(errorObj.response));
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const inverters =  await getInverters();
      setInverters(inverters);
    }
    setLoading(true)
    fetchData();
  }, []);


  return (
    <div>
      {failed && 
        <Alert text={failed} variant="danger" onClose={() => setFailed("")}/>
      }

      {loadingModal}
      {!loading &&
      <Container show={inverters}>
        <Row xs={1} md={2} className='justify-content-md-center'>
          {inverters!==undefined  && inverters.map(inverter => 
            <Col key={inverter.id}>
              <InverterCard id={inverter.id} inverter={inverter}/>
            </Col>
            )}
          
        </Row>
      </Container>
      }
    </div>
  )

}
