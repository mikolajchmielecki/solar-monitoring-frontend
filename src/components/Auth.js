import React, { useState } from "react"
import * as Constants from '../constants/constants'


async function loginUser(credentials) {
  return fetch(Constants.SERVER_URL + 'user/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
}

async function registerUser(userProps) {
  return fetch(Constants.SERVER_URL + 'user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProps)
      })
    .then(data => data.json())
}

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



  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser(input, setLoginFailed);
    if (!response.ok) {
      setLoginFailed(true)
    } else {
      console.log(response.json())
      setToken(response.json().token)
    }
  }

  const handleRegistrationSubmit = async e => {
    e.preventDefault();
    const response = await registerUser(input);
    console.log(response)
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setInput(prev => ({
        ...prev,
        username: "",
        password: ""
      }));
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
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
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
            {loginFailed === true &&
              <div>Niepoprawe logowanie</div>
            }
            <div className="form-group mt-3">
              <label>Login:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpisz login"
                value={input.username}
                name="username"
                onChange={onInputChange}
              />
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
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Zaloguj się
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
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
            />
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Zarejestruj się
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}