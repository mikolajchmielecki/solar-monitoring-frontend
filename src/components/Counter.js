import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import LoadingModal from './LoadingModal';
import { useState, useEffect } from 'react'; 
import * as Constants from '../constants/constants';

export default function Counter ({token}) {
  
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState("")
  const [counter, setCounter] = useState({
    login: "",
    password: "",
    confirmPassword: ""  
  })

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

  useEffect(() => {
    const fetchData = async () => {
      const counter =  await getCounter();
      setCounter(counter);
    }
    setLoading(true)
    fetchData();
  }, []);

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
            stateObj[name] = "Proszę login";
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
      {failed && 
        <Alert text={failed} variant="danger" onClose={() => setError("")}/>
      }
      <LoadingModal loading={loading} />
      {!loading &&
      <Container fluid="md">
        <Card className="edit-card shadow">
          <Card.Header>Licznik energii elektrycznej</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="login">
                <Form.Label>Login:</Form.Label>
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
                <Form.Label>Hasło:</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Wprowadź hasło" 
                  name="password"
                  value={counter.password || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.password && <span className='err'>{error.password}</span>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Potwierdź hasło:</Form.Label>
                <Form.Control type="password" placeholder="Potwierdź hasło" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Zapisz
              </Button>
            </Form>
          </Card.Body>
        </Card>    
      </Container>
      }
    </div>  
  )}
