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
