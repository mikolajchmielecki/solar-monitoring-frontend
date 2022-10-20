import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return (
      <div className="application">
        <Auth setToken={setToken} />
      </div>
    )
  } else {
    return (
      <div className="application">
        Zalogowany
      </div>
    )
  }
}

export default App