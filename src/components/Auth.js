import React, { useState } from "react"
import * as Constants from '../constants/constants'
import Alert from "./Alert"



export default function ({ setToken }) {
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
  const [checkInputsAlert, setCheckInputsAlert] = useState(false)

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
      setLoginFailed(true)
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
        });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.username || !input.password || !checkNoErrors()) {
      setCheckInputsAlert(true)
    } else {
      const response = await loginUser(input, setLoginFailed);
      setToken(response.token)
    }
  }

  const handleRegistrationSubmit = async e => {
    e.preventDefault();
    if (!input.username || !input.password || !input.firstName || !input.secondName || !input.email || !input.confirmPassword || !checkNoErrors()) {
      setCheckInputsAlert(true)
    } else {
      const response = await registerUser(input);
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

  function checkNoErrors() {
    return !error.firstName && !error.secondName && !error.email && !error.password && !error.username
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
        {loginFailed===true && 
          <Alert text="Niepoprawne logowanie" variant="danger" onClose={() => setLoginFailed(false)}/>
        }
        {checkInputsAlert===true && 
        <Alert text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlert(false)}/>
        }
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
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Wpisz hasło"
                  value={input.password}
                  name="password"
                  onChange={onInputChange}
                  onBlur={validateInput}>
                </input>
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
      </div>
    )
  }

  return (
    <div>
      {registerFailed===true && 
        <Alert text="Niepoprawna rejestracja" variant="danger" onClose={() => setRegisterFailed(false)}/>
      }
      {registerPass===true && 
        <Alert text="Rejstracja przebiegła pomyślnie" variant="success" onClose={() => setRegisterPass(false)}/>
      }
      {checkInputsAlert===true && 
        <Alert text="Sprawdź formularz" variant="warning" onClose={() => setCheckInputsAlert(false)}/>
      }
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
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Wpisz hasło"
                name="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
              {error.password && <span className='err'>{error.password}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Potwierdź hasło:</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Powierdź hasło"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}>
              </input>
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
    </div>
  )
}