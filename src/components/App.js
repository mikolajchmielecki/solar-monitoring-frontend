import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import About from "./About";
import Counter from "./Counter";
import User from "./User";
import Inverters from "./Inverters";
import Dashboard from "./Dashboard";

export default function ({token, setToken}) {
    return (
    <div>
        <Navbar bg="primary" variant="dark">
            <Container>
            <Navbar.Brand href="about">Solar Monitoring</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="dashboard">Dashboard</Nav.Link>
                <Nav.Link href="user">Użytkownik</Nav.Link>
                <Nav.Link href="counter">Licznik</Nav.Link>
                <Nav.Link href="inverters">Falowniki</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link onClick={() => {setToken("")}}>Wyloguj</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Routes>
            <Route exact path="/" element={<About/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/inverters" element={<Inverters/>} />
            <Route path="/counter" element={<Counter/>} />
        </Routes>
    </div>
)}
