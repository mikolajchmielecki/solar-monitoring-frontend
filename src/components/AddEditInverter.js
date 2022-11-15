import { Form, Button, Card, Container } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as Constants from '../constants/constants'
import LoadingModal from './LoadingModal';
import Alert from './Alert';
import { useNavigate } from "react-router-dom";

export default function AddEditInverter ({token}) {
  const [loading, setLoading, loadingModal] = LoadingModal()
  const navigate = useNavigate();
  let { id } = useParams();
  const [inverter, setInverter] = useState({
    id: '',
    name: '',
    type: 'solax',
    credentials: ''
  })
  const [error, setError] = useState({
    name: '',
    credentials: {
      serialNumber: '',
      tokenId: '',
      apiKey: '',
      siteId: ''
    }
  })
  const [failed, setFailed] = useState("")
  const [checkInputsAlert, setCheckInputsAlert] = useState(false)
  const [success, setSuccess] = useState(false)

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  async function getInverter() {
    return fetch(Constants.SERVER_URL + `inverter/get/${id}`, {
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

  async function updateInverter(body) {
    return fetch(Constants.SERVER_URL + `inverter/${inverter.type}/update`, {
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
      return response.json().then((errorObj) => setFailed(errorObj.response));
    })
  }

  async function addInverter(body) {
    return fetch(Constants.SERVER_URL + `inverter/${inverter.type}/add`, {
      method: 'POST',
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
      return response.json().then((errorObj) => setFailed(errorObj.response));
    })
  }

  useEffect(() => {
    if (id) {
    const fetchData = async () => {
      const inverter =  await getInverter();
      setInverter(inverter)
    }
    setLoading(true)
    fetchData();
  } else {
    setLoading(false)
  }
  }, []);


  const onInputChange = e => {
    const { name, value } = e.target;
    setInverter(prev => {
      if (name.includes("credentials.")) {
        const stateObj = { ...prev, 
          credentials: { ...prev.credentials, [name.split('.')[1]]: value}
        };
        return stateObj;
      }
      const stateObj = { ...prev, [name]: value };
      return stateObj;
    });
    validateInput(e)
  }

  const handleSave = async e => {
    if (!inverter.name || 
        (inverter.type==Constants.InverterType.SolarEdge && (!inverter.credentials.apiKey || !inverter.credentials.siteId)) || 
        (inverter.type==Constants.InverterType.Solax && (!inverter.credentials.tokenId || !inverter.credentials.serialNumber))) {
      setCheckInputsAlert(true);
    } else {
      const result = {
        id: id,
        name: inverter.name,
      }
      if (inverter.type==Constants.InverterType.SolarEdge) {
        result.apiKey = inverter.credentials.apiKey
        result.siteId = inverter.credentials.siteId
      } if (inverter.type==Constants.InverterType.Solax) {
        result.tokenId = inverter.credentials.tokenId
        result.serialNumber = inverter.credentials.serialNumber
      }
      if (id) {
        setLoading(true)
        const response = await updateInverter(result)
      } else {
        setLoading(true)
        const response = await addInverter(result)
      }
      await sleep(1000);
      navigate("/inverters");
    }
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      let stateObj;
      if (name.includes("credentials.")) {
        stateObj = { ...prev, 
          credentials: { ...prev.credentials, [name.split('.')[1]]: ""}
        };
      } else {
        stateObj = { ...prev, [name]: "" };
      }
    
      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić nazwę";
          }
          break;

        case "credentials.apiKey":
          if (!value) {
            stateObj[name.split(".")[0]][name.split(".")[1]] = "Proszę wprowadzić api key";
          }
          break;

        case "credentials.serialNumber":
          if (!value) {
            stateObj[name.split(".")[0]][name.split(".")[1]] = "Proszę wprowadzić number seryjny";
          }
        break;

        case "credentials.siteId":
          if (!value) {
            stateObj[name.split(".")[0]][name.split(".")[1]] = "Proszę wprowadzić site id";
          }
        break;

        case "credentials.tokenId":
          if (!value) {
            stateObj[name.split(".")[0]][name.split(".")[1]] = "Proszę wprowadzić token id";
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
      <Container fluid="md">
      {failed && 
        <Alert text={failed} variant="danger" onClose={() => setFailed("")}/>
      }
      {checkInputsAlert && 
          <Alert text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlert(false)}/>
      }
      {success===true && 
        <Alert text="Zmiany zostały zapisane pomyślnie" variant="success" onClose={() => setSuccess(false)}/>
      }
      {!loading &&
      <Card className="edit-card shadow">
        <Card.Header>{id ? "Zmień parametry falownika" : "Dodaj falownik"}</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nazwa:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Wprowadź nazwę" 
                name="name"
                value={inverter.name || ""}
                onChange={onInputChange}
                onBlur={validateInput}/>
              {error.name && <span className='err'>{error.name}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Marka:</Form.Label>
              <Form.Select 
              aria-label="Default select example" 
              name="type"
              value={inverter.type || ""}
              onChange={onInputChange}>
                <option value={Constants.InverterType.Solax}>Solax</option>
                <option value={Constants.InverterType.SolarEdge}>SolarEdge</option>
              </Form.Select>
            </Form.Group>
            {inverter.type === Constants.InverterType.Solax &&
              <div>
              <Form.Group className="mb-3" controlId="serialNumber">
                <Form.Label>Numer seryjny:</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="Wprowadź numer seryjny" 
                  name="credentials.serialNumber"
                  value={inverter.credentials.serialNumber || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.credentials.serialNumber && <span className='err'>{error.credentials.serialNumber}</span>}

              </Form.Group>
              <Form.Group className="mb-3" controlId="tokenId">
                <Form.Label>Token id:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Wprowadź token id" 
                  name="credentials.tokenId"
                  value={inverter.credentials.tokenId || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.credentials.tokenId && <span className='err'>{error.credentials.tokenId}</span>}
              </Form.Group>
              </div>
            }
            {inverter.type === Constants.InverterType.SolarEdge &&
              <div>
              <Form.Group className="mb-3" controlId="apiKey">
                <Form.Label>Api key:</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="Wprowadź API key" 
                  name="credentials.apiKey"
                  value={inverter.credentials.apiKey || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.credentials.apiKey && <span className='err'>{error.credentials.apiKey}</span>}

              </Form.Group>
              <Form.Group className="mb-3" controlId="siteId">
                <Form.Label>Site id:</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="Wprowadź site id" 
                  name="credentials.siteId"
                  value={inverter.credentials.siteId || ""}
                  onChange={onInputChange}
                  onBlur={validateInput}/>
                {error.credentials.siteId && <span className='err'>{error.credentials.siteId}</span>}
              </Form.Group>
              </div>
            }
            <Button variant="primary" onClick={handleSave}>
              {id ? "Zapisz" : "Dodaj"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      }
      </Container>
    </div>
    )}
