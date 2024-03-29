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
