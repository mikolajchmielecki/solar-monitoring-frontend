import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./Main.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import App from "./components/App"

function Main() {
  const [token, setToken] = useState();
  if(!token) {
    return (
      <div className="application">
        <Auth setToken={setToken} />
      </div>
    )
  } else {
    return (
      <App token={token} setToken={setToken}/>
    )
  }
}

export default Main