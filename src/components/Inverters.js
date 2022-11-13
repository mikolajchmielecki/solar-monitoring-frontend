import InverterCard from './InverterCard';
import { Container, Col, Row } from 'react-bootstrap';
import SpinnerCard from './SpinnerCard';
import React, { useState, useEffect } from "react";
import * as Constants from '../constants/constants';


export default function Inverters ({token}) {

  const [isLoading, setIsLoading] = useState(true);
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
      if (response.ok) {
        setIsLoading(false)
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
    fetchData();
  }, []);

  const inverter = {
    "id": 1,
    "name": "Solax",
    "beforeEnergy": 1561,
    "inverterParameters": {
      "todayYield": 1.3,
      "totalYield": 1649.5,
      "currentPower": 0,
      "status": "ACTIVE"
    }
  }
  if (isLoading) {
    return (
      <SpinnerCard />
    )
  } else if (inverters) {
    return (
      <Container>
      <Row xs={1} md={2} className='justify-content-md-center'>
        {inverters.map(inverter => 
          <Col>
            <InverterCard inverter={inverter}/>
          </Col>
          )}
        
    </Row>
    </Container>
    )
  } else {
    return (
      <Container />
    )
  }
}
