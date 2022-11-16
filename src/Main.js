import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./Main.css"
import { BrowserRouter } from "react-router-dom"
import Auth from "./components/Auth"
import App from "./components/App"
import useCookie from "./hooks/useCookie";


function Main() {

  function checkToken(text) {
    return typeof text === 'string' && text.length > 0
  }
  const [token, setToken] = useCookie("token", "");
  return (
    <BrowserRouter>
      {checkToken(token)===false &&
        <Auth setToken={setToken}/>
      }
      {checkToken(token)===true &&
        <App token={token} setToken={setToken}/>
      }
    </BrowserRouter>
  )
}

export default Main