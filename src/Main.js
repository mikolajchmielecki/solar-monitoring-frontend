/*
* SolarMonitoring
* Copyright (C) 2022 Mikołaj Chmielecki
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* LICENSE file in root directory contains a copy of the GNU General Public License.
*/

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