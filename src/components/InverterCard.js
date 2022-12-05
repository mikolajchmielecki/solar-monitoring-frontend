/*
* SolarMonitoring
* Copyright (C) 2022 Mikołaj Chmielecki
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* LICENSE file in root directory contains a copy of the GNU General Public License.
*/

import { Button, Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import * as Constants from '../constants/constants'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export default function InverterCard ({id, inverter, handleDelete}) {

  function round(number) {
    return Math.round(number * 100) / 100
  }

  const valid = inverter.inverterParameters.status !== "COMMUNICATION_ERROR"

    return (
        <Card style={{minWidth: '20em'}}>
        <Card.Header>
            <Row className='align-items-center'>
            <Col>{inverter.name}</Col>
            <Col className=" text-nowrap" style={{ textAlign: "right" }} >
            
            <Link to={"/inverter/"+id} >
            <Button variant="primary" size="sm" >
              <AiFillEdit />
            </Button>
            </Link>
            <span> </span>
            <Button value={id} variant="danger" size="sm" onClick={handleDelete}>
              <AiFillDelete />
            </Button>
            </Col>
            </Row>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Status: <strong>{inverter.inverterParameters.status}</strong></ListGroup.Item>
          <ListGroup.Item>Marka: <strong>{inverter.type===Constants.InverterType.SolarEdge ? "SolarEdge" : "Solax"}</strong></ListGroup.Item>
          <ListGroup.Item>Bieżąca moc: {valid ? <strong>{round(inverter.inverterParameters.currentPower)} W</strong> : <strong>---</strong>}</ListGroup.Item>
          <ListGroup.Item>Dzisiejsza produkcja: {valid ? <strong>{round(inverter.inverterParameters.todayYield)} kWh</strong> : <strong>---</strong>}</ListGroup.Item>
          <ListGroup.Item>Całkowita produkcja: {valid ? <strong>{round(inverter.inverterParameters.totalYield)} kWh</strong> : <strong>---</strong>}</ListGroup.Item>
        </ListGroup>
      </Card>
    )}
