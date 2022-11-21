import React, { useEffect, useState } from "react"
import * as Constants from '../constants/constants'
import AlertInCorner from "./AlertInCorner"
import { Container } from "react-bootstrap"
import LoadingModal from "./LoadingModal"
import Password from "./Password"
import CookieConsent from "react-cookie-consent";



export default function Auth ({ setToken }) {
  const [, setLoading, loadingModal] = LoadingModal()
  
  useEffect(e => {
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [authMode, setAuthMode] = useState("signin")
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    secondName: ''
  });

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    secondName: ''
  })

  const [loginFailed, setLoginFailed] = useState(false)
  const [registerFailed, setRegisterFailed] = useState(false)
  const [registerPass, setRegisterPass] = useState(false)
  const [checkInputsAlertInCorner, setCheckInputsAlertInCorner] = useState(false)

  function loginUser(credentials) {
    return fetch(Constants.SERVER_URL + 'user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      console.log(response)
      setLoginFailed(true)
      setLoading(false)
    });
  }
  
  function registerUser(userProps) {
    return fetch(Constants.SERVER_URL + 'user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProps)
        })
        .then((response) => {
          if (response.ok) {
            setRegisterPass(true)
            return response.json();
          }
          return Promise.reject(response);
        })
        .catch((response) => {
          setRegisterFailed(true)
          setLoading(false)
        });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.username || !input.password || !checkNoErrorsLogin()) {
      setCheckInputsAlertInCorner(true)
    } else {
      setLoading(true)
      const response = await loginUser(input, setLoginFailed);
      setToken(response.token)
      setLoading(false)
    }
  }

  const handleRegistrationSubmit = async e => {
    e.preventDefault();
    if (!input.username || !input.password || !input.firstName || !input.secondName || !input.email || !input.confirmPassword || !checkNoErrorsRegistration()) {
      setCheckInputsAlertInCorner(true)
    } else {
      setLoading(true)
      await registerUser(input);
      setLoading(false)
    }
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setInput(prev => ({
        ...prev,
        username: "",
        password: ""
      }));
  }

  function checkNoErrorsRegistration() {
    return !error.firstName && !error.secondName && !error.email && !error.password && !error.username && !error.confirmPassword
  }

  function checkNoErrorsLogin() {
    return !error.password && !error.username
  }

  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
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
        case "password":
          if (!value) {
            stateObj[name] = "Proszę wprowadzić hasło";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Wprowadzone hasła nie są zgodne";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Proszę potwierdzić hasło";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Wprowadzone hasła nie są zgodne";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

  if (authMode === "signin") {
    return (
      <div className="login-page">
        {loadingModal}
        <CookieConsent
          location="bottom"
          buttonText="Zgadzam się"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#fff", color: "#000" }}
          buttonStyle={{ background: "#0d6efd", color: "#fff", "border-radius": "0.375rem", fontSize: "13px" }}
          expires={150}
        >Ta strona używa plików cookies.</CookieConsent>
        {loginFailed===true && 
          <AlertInCorner text="Niepoprawne logowanie" variant="danger" onClose={() => setLoginFailed(false)}/>
        }
        {checkInputsAlertInCorner===true && 
        <AlertInCorner text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlertInCorner(false)}/>
        }
        <Container>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Zaloguj się</h3>
              <div className="text-center">
                Nie posiadasz konta?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Zarejestruj się
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Login:</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Wpisz login"
                  value={input.username}
                  name="username"
                  onChange={onInputChange}
                  onBlur={validateInput}>
                </input>
                {error.username && <span className='err'>{error.username}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Hasło:</label>
                <Password
                  placeholder="Wpisz hasło"
                  value={input.password}
                  name="password"
                  onChange={onInputChange}
                  onBlur={validateInput} />
                {error.password && <span className='err'>{error.password}</span>}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Zaloguj się
                </button>
              </div>
            </div>
          </form>
        </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="login-page">
      {loadingModal}
      {registerFailed===true && 
        <AlertInCorner text="Niepoprawna rejestracja" variant="danger" onClose={() => setRegisterFailed(false)}/>
      }
      {registerPass===true && 
        <AlertInCorner text="Rejstracja przebiegła pomyślnie" variant="success" onClose={() => setRegisterPass(false)}/>
      }
      {checkInputsAlertInCorner===true && 
        <AlertInCorner text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlertInCorner(false)}/>
      }
      <Container>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleRegistrationSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Zarejestruj się</h3>
            <div className="text-center">
              Posiadasz już konto?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Zaloguj się
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Imię:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpisz imię"
                name="firstName"
                value={input.firstName}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
              {error.firstName && <span className='err'>{error.firstName}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Nazwisko:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpisz nazwisko"
                name="secondName"
                value={input.secondName}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
              {error.secondName && <span className='err'>{error.secondName}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Wpisz email"
                name="email"
                value={input.email}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
              {error.email && <span className='err'>{error.email}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Login:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpisz login"
                name="username"
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
              {error.username && <span className='err'>{error.username}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Hasło:</label>
              <Password
                placeholder="Wpisz hasło"
                name="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput} />
              {error.password && <span className='err'>{error.password}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Potwierdź hasło:</label>
              <Password
                placeholder="Powierdź hasło"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput} />
              {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Zarejestruj się
              </button>
            </div>
          </div>
        </form>
      </div>
      </Container>
    </div>
  )
}