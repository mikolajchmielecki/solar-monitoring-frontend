import { Spinner, Button, Card, Container } from 'react-bootstrap';
import React, { useState } from "react"

export default function SpinnerCard (props) {
  const style = {textAlign: 'center'};  
  return (
    <Container>
      <Card className='shadow'>
        <div className='text-center mt-3 p-3'>
        <Spinner animation="border" role="status" />
        <p>Ładowanie...</p> 
        </div>
      </Card>
      </Container>
    )
}