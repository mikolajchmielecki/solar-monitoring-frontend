import React, { useState} from 'react';
import {Helmet} from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"

function App() {
  const [token, setToken] = useState();

  return (
    <div className="application">
      if(!token) {
        <Auth setToken={setToken} />
      } else {
        <BrowserRouter>
        </BrowserRouter>
      }
    </div>
    
  )
}

export default App