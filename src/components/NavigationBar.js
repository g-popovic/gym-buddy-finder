import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; };
    font-size: 20px;
    margin-left: 25px;
  }
  .navbar-brand {
    font-size: 1.8em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">GymBuddy</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Search</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Chat">Chat</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Profile">My Profile</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Log Out</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)