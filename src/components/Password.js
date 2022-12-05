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

import { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Password ({placeholder, name, value, onChange, onBlur}) {

  const [show, setShow] = useState("password");

  function handleEyeClick() {
    if (show === "password" ) {
      setShow("text")
    } else {
      setShow("password")
    }
  }

  function getEye() {
    if (show === "password" ) {
      return <AiFillEye />
    } else {
      return <AiFillEyeInvisible />
    }
  }

    return (
      <InputGroup className="mb-3">
        <Form.Control
          aria-describedby="basic-addon2"
          type={show} 
          placeholder={placeholder}
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur} />
        <Button variant="outline-secondary" onClick={handleEyeClick}>
          {getEye()}
        </Button>
      </InputGroup>
          
    )}
