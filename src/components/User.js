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
import React, { useState, useEffect } from "react";
import * as Constants from '../constants/constants';
import AlertInCorner from './AlertInCorner';
import LoadingModal from './LoadingModal';
import Password from './Password';
import ConfirmDelete from './ConfirmDelete';
import { AiOutlineSave, AiFillDelete } from 'react-icons/ai';

export default function User ({token, setToken}) {
  const [loading, setLoading, loadingModal] = LoadingModal()
  const [savePass, setSavePass] = useState(false);
  const [saveFailed, setSaveFailed] = useState("");
  const [checkInputsAlertInCorner, setCheckInputsAlertInCorner] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    firstName: '',
    secondName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    firstName: '',
    secondName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  async function getUser() {
    return fetch(Constants.SERVER_URL + 'user', {
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
      return response.json().then((errorObj) => setSaveFailed(errorObj.response));
    })
  }


  async function deleteUser() {
    return fetch(Constants.SERVER_URL + 'user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setLoading(false)
      if (response.ok) {
        setToken("")
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      setLoading(false)
    });
  }

  async function saveUser(body) {
    return fetch(Constants.SERVER_URL + 'user/update', {
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
        setSavePass(true)
        return
      }
      return response.json().then((errorObj) => setSaveFailed(errorObj.response));
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      const newUser =  await getUser();
      setUser(newUser);
    }
    setLoading(true)
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onInputChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e)
  }

  const handleDelete = async e => {
    setLoading(true)
    await deleteUser();
    setShowConfirmation(false)
  }

  const handleSave = async e => {
    if (!user.username || !user.firstName || !user.secondName || !user.email || !checkNoErrors() || (user.newPassword && !user.confirmPassword)) {
      setCheckInputsAlertInCorner(true);
    } else {
      const newUser = {
        username: user.username,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email
      }
      if (user.newPassword && user.oldPassword) {
        newUser['newPassword'] = user.newPassword
        newUser['oldPassword'] = user.oldPassword
      }
      setLoading(true)
      await saveUser(newUser)
    }
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "firstName":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić imię";
          }
          break;
        case "secondName":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić nazwisko";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić email";
          }
          break;
        case "username":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić login";
          }
          break;

        case "oldPassword":
          if (!user.newPassword) {
            stateObj["newPassword"] = "Proszę wprowadzić nowe hasło";
          } else {
            stateObj["newPassword"] = "";
          }
          break;
        
        case "newPassword":

          if (!user.oldPassword) {
            stateObj["oldPassword"] = "Proszę wprowadzić stare hasło";
          } else {
            stateObj["oldPassword"] = "";
          }

          if (user.confirmPassword && value !== user.confirmPassword) {
            stateObj["confirmPassword"] = "Wprowadzone hasła nie są zgodne";
          } else {
            stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value && user.newPassword) {
            stateObj[name] = "Proszę potwierdzić nowe hasło";
          } else if (user.newPassword && value !== user.newPassword) {
            stateObj[name] = "Wprowadzone hasła nie są zgodne";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

  function checkNoErrors() {
    return !error.firstName && !error.secondName && !error.email && !error.newPassword && !error.username && !error.confirmPassword
  }
  
    return (
      <div>
      {loadingModal}
      <ConfirmDelete showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} handleDelete={handleDelete} name="konto"/>
      <Container fluid="md">
      {saveFailed && 
        <AlertInCorner text={saveFailed} variant="danger" onClose={() => setSaveFailed("")}/>
      }
      {checkInputsAlertInCorner===true && 
        <AlertInCorner text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlertInCorner(false)}/>
      }
      {savePass===true && 
        <AlertInCorner text="Zmiany zostały zapisane pomyślnie" variant="success" onClose={() => setSavePass(false)}/>
      }
      {!loading===true && 
      <Card className="edit-card shadow">
        <Card.Header>Użytkownik</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Imię:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Wprowadź imię"
                name="firstName"
                value={user.firstName || ""}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.firstName && <span className='err'>{error.firstName}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="secondName">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Wprowadź nazwisko" 
                name="secondName"
                value={user.secondName || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.secondName && <span className='err'>{error.secondName}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Wprowadź email" 
                name="email"
                value={user.email || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.email && <span className='err'>{error.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>Login:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Wprowadź login" 
                name="username"
                value={user.username || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.username && <span className='err'>{error.username}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Stare hasło:</Form.Label>
              <Password
                type="password" 
                placeholder="Wprowadź stare hasło" 
                name="oldPassword"
                value={user.oldPassword || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.oldPassword && <span className='err'>{error.oldPassword}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Nowe hasło:</Form.Label>
              <Password
                type="password" 
                placeholder="Wprowadź nowe hasło" 
                name="newPassword"
                value={user.newPassword || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.newPassword && <span className='err'>{error.newPassword}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Potwierdź hasło:</Form.Label>
              <Password
                type="password" 
                placeholder="Potwierdź hasło" 
                name="confirmPassword"
                value={user.confirmPassword || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              Zapisz <AiOutlineSave/>
            </Button>{' '}
            <Button variant="danger" onClick={() => setShowConfirmation(true)}>
              Usuń konto <AiFillDelete/>
            </Button>
          </Form>
        </Card.Body>
      </Card>
      }
      </Container>
      </div>
  )
}
