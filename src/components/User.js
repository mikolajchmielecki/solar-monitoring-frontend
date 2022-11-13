import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from "react"
import SpinnerCard from './SpinnerCard';
import * as Constants from '../constants/constants'
import Alert from './Alert';

export default function User ({token, setToken}) {
  const [isLoading, setIsLoading] = useState(true);
  const [savePass, setSavePass] = useState(false);
  const [saveFailed, setSaveFailed] = useState("");
  const [checkInputsAlert, setCheckInputsAlert] = useState(false);
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
      if (response.ok) {
        setIsLoading(false)
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
      if (response.ok) {
        setToken("")
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      console.log("error")
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
    fetchData();
  }, []);

  const onInputChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e)
  }

  function checkNoErrors() {
    return !error.firstName && !error.secondName && !error.email && !error.newPassword && !error.username
  }

  const handleDelete = async e => {
    await deleteUser();
    setShowConfirmation(false)
  }

  const handleSave = async e => {
    if (!user.username || !user.firstName || !user.secondName || !user.email || !checkNoErrors() || (user.newPassword && !user.confirmPassword)) {
      setCheckInputsAlert(true);
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
      const response = await saveUser(newUser)
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
  

    if (isLoading) {
      return (
        <SpinnerCard />
      )
    } else {
      return (
        <div>
        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} animation={true}>
          <Modal.Header closeButton />
          <Modal.Body>Czy na pewno chcesz usunąć konto?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowConfirmation(false)}>
              Nie
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Tak, usuń konto
            </Button>
          </Modal.Footer>
        </Modal>
        <Container fluid="md">
        {saveFailed && 
          <Alert text={saveFailed} variant="danger" onClose={() => setSaveFailed("")}/>
        }
        {checkInputsAlert===true && 
          <Alert text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlert(false)}/>
        }
        {savePass===true && 
          <Alert text="Zmiany zostały zapisane pomyślnie" variant="success" onClose={() => setSavePass(false)}/>
        }
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
                <Form.Control 
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
                <Form.Control 
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
                <Form.Control 
                  type="password" 
                  placeholder="Potwierdź hasło" 
                  name="confirmPassword"
                  value={user.confirmPassword || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                  {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              </Form.Group>
              <Button variant="primary" onClick={handleSave}>
                Zapisz
              </Button>{' '}
              <Button variant="danger" onClick={() => setShowConfirmation(true)}>
                Usuń konto
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </Container>
        </div>
    )}
}
