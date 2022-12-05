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

import ReactApexChart from "react-apexcharts"
import { Container, Card, Col, Row, Form } from "react-bootstrap"
import { useState, useEffect } from "react";
import LoadingModal from "./LoadingModal";
import * as Constants from '../constants/constants';
import AlertInCorner from "./AlertInCorner";

export default function Dashboard ({token}) {
  const [loading, setLoading, loadingModal] = LoadingModal()
  const [failed, setFailed] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [series, setSeries] = useState();

  const handleChangeYear = e => {
    setYear(e.target.value)
  }

  async function getSeries() {
    return fetch(Constants.SERVER_URL + `energy/get/${year}`, {
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
      return Promise.reject(response);
    })
    .catch((error) => {
      setFailed("Wystąpił błąd")
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        const series = await getSeries();
        setSeries(series);
      }
      setLoading(true)
      fetchData();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [year]); // eslint-disable-line react-hooks/exhaustive-deps

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    },
    yaxis: {
      title: {
        text: 'kWh'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " kWh"
        }
      }
    }
  }

    return (
      <div>
        {loadingModal}
        {!loading &&
      
        <Container fluid="lg">
          {failed && 
            <AlertInCorner text={failed} variant="danger" onClose={() => setFailed("")}/>
          }
          <Card >
          <Card.Header>
              <Row>
                <Form.Label column="lg" lg={10}>Pomiary historyczne</Form.Label>
                <Row>
                  <Form.Label column lg={1}>
                    Rok:
                  </Form.Label>
                  <Col lg={3}>
                  <Form.Control
                    className="w-50"
                    type="number"
                    value={year}
                    min="2000"
                    max="2030"ś
                    onChange={handleChangeYear}/>

                  </Col>
                </Row>
              </Row>
              
          </Card.Header>
            <Card.Body>
              {series && <ReactApexChart options={options} series={series} type="bar" height={350} />}
            </Card.Body>
          </Card>
        </Container>}
      </div>
    )}
