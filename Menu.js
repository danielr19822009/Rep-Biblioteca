import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/libros">Libros</Nav.Link>
          <Nav.Link as={Link} to="/autores">Autores</Nav.Link>
          <Nav.Link as={Link} to="/editoriales">Editoriales</Nav.Link>
          <Nav.Link as={Link} to="/editoriales">Prestamos</Nav.Link>
          <NavDropdown title="Más" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Acción</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Otra acción</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.3">Algo más aquí</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
