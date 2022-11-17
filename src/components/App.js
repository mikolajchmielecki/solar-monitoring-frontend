import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import About from "./About";
import Counter from "./Counter";
import User from "./User";
import Inverters from "./Inverters";
import Dashboard from "./Dashboard";
import AddEditInverter from './AddEditInverter';
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlineUser, AiOutlineHistory, AiOutlineUnorderedList, AiFillFolderAdd } from 'react-icons/ai';
import { BsFillCalculatorFill } from 'react-icons/bs'

export default function App ({token, setToken}) {

    return (
    <div className="content">
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
            <Navbar.Brand href="about">Solar Monitoring</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link className='nav-item' href="/dashboard">Pomiary <AiOutlineHistory/></Nav.Link>
                <Nav.Link className='nav-item' href="/counter">Licznik <BsFillCalculatorFill/></Nav.Link>
                <NavDropdown id="nav-dropdown" title="Falowniki">
                    <NavDropdown.Item href="/inverters">Lista falowników <AiOutlineUnorderedList/></NavDropdown.Item>
                    <NavDropdown.Item href="/inverter">Dodaj falownik <AiFillFolderAdd/></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='nav-item' href="/user">Użytkownik <AiOutlineUser/></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link className='nav-item' onClick={() => {setToken("")}}>Wyloguj <MdOutlineLogout/></Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Routes>
            <Route exact path="/" element={<About/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/user" element={<User token={token} setToken={setToken}/>} />
            <Route path="/dashboard" element={<Dashboard token={token}/>} />
            <Route path="/inverters" element={<Inverters token={token}/>} />
            <Route path="/inverter" element={<AddEditInverter token={token}/>} />
            <Route path="/inverter/:id" element={<AddEditInverter token={token}/>} />
            <Route path="/counter" element={<Counter token={token}/>} />
        </Routes>
    </div>
)}
