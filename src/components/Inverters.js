import InverterCard from './InverterCard';
import { Container, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import * as Constants from '../constants/constants';
import LoadingModal from './LoadingModal';
import AlertInCorner from './AlertInCorner';
import ConfirmDelete from './ConfirmDelete';

export default function Inverters ({token}) {

  const [loading, setLoading, loadingModal] = LoadingModal()
  const [failed, setFailed] = useState("");
  const [inverters, setInverters] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] = useState();
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


  async function deleteInverter(id) {
    return fetch(Constants.SERVER_URL + `inverter/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch((error) => {
      setFailed("Wystąpił błąd")
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const inverters =  await getInverters();
      setInverters(inverters);
    }
    setLoading(true)
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const handleDelete = async e => {
    setShowConfirmation(false)
    setLoading(true)
    await deleteInverter(id)
    const fetchData = async () => {
      const inverters =  await getInverters();
      setInverters(inverters);
      setDeleteSuccess(true)
    }
    setLoading(true)
    fetchData();
    
  }

  return (
    <div>
      {failed && 
        <AlertInCorner text={failed} variant="danger" onClose={() => setFailed("")}/>
      }
      {deleteSuccess && 
        <AlertInCorner text="Falownik został usunięty pomyślnie" variant="success" onClose={() => setDeleteSuccess("")}/>
      }

      {loadingModal}
      <ConfirmDelete showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} handleDelete={handleDelete} name="falownik"/>
      {!loading &&
      <Container  show={inverters}>
        <Row xs={1} md={2} className='justify-content-md-center'>
          {inverters!==undefined  && inverters.map(inverter => 
            <Col key={inverter.id}>
              <InverterCard id={inverter.id} inverter={inverter} handleDelete={e => {setShowConfirmation(true); setId(inverter.id)}}/>
            </Col>
            )}
          
        </Row>
      </Container>
      }
    </div>
  )

}
