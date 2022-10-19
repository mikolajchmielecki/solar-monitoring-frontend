import React, { useState } from "react"
import PropTypes from 'prop-types'


async function loginUser(credentials) {
    return fetch('http://34.116.171.10:9285/api/v1/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
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

  const handleSubmit = async e => {
    e.preventDefault();
    const username = input.username
    const password = input.password
    console.log("Submit")
    const token = await loginUser({
        username,
        password
    });
    console.log(token)
    setToken(token);
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setInput(prev => ({
        ...prev,
        ["username"]: "",
        ["password"]: ""
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
            <div className="form-group mt-3">
              <label>Login:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpisz login"
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
                value={input.password}
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
      <form className="Auth-form">
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
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Nazwisko:</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Wpisz nazwisko"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Wpisz email"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Login:</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Wpisz login"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Hasło:</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Wpisz hasło"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Potwierdź hasło:</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Powierdź hasło"
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