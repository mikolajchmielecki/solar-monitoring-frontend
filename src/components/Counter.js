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



import { Form, Button, Card, Container } from 'react-bootstrap';
import LoadingModal from './LoadingModal';
import { useState, useEffect } from 'react'; 
import * as Constants from '../constants/constants';
import Password from './Password';
import AlertInCorner from './AlertInCorner';
import { AiOutlineSave } from 'react-icons/ai'

export default function Counter ({token}) {
  const [loading, setLoading, loadingModal] = LoadingModal()
  const [failed, setFailed] = useState("")
  const [success, setSuccess] = useState(false)
  const [counter, setCounter] = useState({
    login: "",
    password: "",
    confirmPassword: ""  
  })
  const [checkInputsAlertInCorner, setCheckInputsAlertInCorner] = useState(false)
  const [error, setError] = useState({
    login: "",
    password: "",
    confirmPassword: ""  
  })


  async function getCounter() {
    return fetch(Constants.SERVER_URL + 'counter/get', {
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

  async function saveCounter(body) {
    return fetch(Constants.SERVER_URL + 'counter/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      setLoading(false)
      if (response.ok) {
        setSuccess(true)
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
      const counter =  await getCounter();
      setCounter(counter);
    }
    setLoading(true)
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function checkNoErrors() {
    return !error.login && !error.password && !error.confirmPassword
  }

  const handleSave = async e => {
    if (!counter.login || !counter.password || !counter.confirmPassword || !checkNoErrors()) {
      setCheckInputsAlertInCorner(true);
    } else {
      const newCounter = {
        login: counter.login,
        password: counter.password
      }
      setLoading(true)
      await saveCounter(newCounter)
    }
  }

  const onInputChange = e => {
    const { name, value } = e.target;
    setCounter(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e)
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "login":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić login";
          }
          break;

        case "password":
          if (counter.confirmPassword && value !== counter.confirmPassword) {
            stateObj["confirmPassword"] = "Wprowadzone hasła nie są zgodne";
          } else {
            stateObj["confirmPassword"] = counter.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value && counter.password) {
            stateObj[name] = "Proszę potwierdzić nowe hasło";
          } else if (counter.password && value !== counter.password) {
            stateObj[name] = "Wprowadzone hasła nie są zgodne";
          }
          break;
 
        default:
          break;
      }
      return stateObj;
    });
  }

  return (
    <div>
      
      {loadingModal}
      {!loading &&
      <Container fluid="md">
        {failed && 
          <AlertInCorner text={failed} variant="danger" onClose={() => setError("")}/>
        }
        {success && 
          <AlertInCorner text="Zmiany zostały zapisane pomyślnie" variant="success" onClose={() => setSuccess(false)}/>
        }
        {checkInputsAlertInCorner && 
          <AlertInCorner text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlertInCorner(false)}/>
        }
        <Card className="edit-card shadow">
          <Card.Header>Licznik energii elektrycznej</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="login">
                <Form.Label>Login: *</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="Wprowadź login" 
                  name="login"
                  value={counter.login || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.login && <span className='err'>{error.login}</span>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Hasło: *</Form.Label>
                <Password
                  placeholder="Wprowadź hasło" 
                  name="password"
                  value={counter.password || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.password && <span className='err'>{error.password}</span>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Potwierdź hasło: *</Form.Label>
                <Password 
                  placeholder="Wprowadź hasło" 
                  name="confirmPassword"
                  value={counter.confirmPassword || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              </Form.Group>
              <Button variant="primary" onClick={handleSave}>
                Zapisz <AiOutlineSave/>
              </Button>
            </Form>
          </Card.Body>
        </Card>    
      </Container>
      }
    </div>  
  )}
