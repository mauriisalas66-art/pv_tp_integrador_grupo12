// src/components/layout/Navbar.jsx
import { useContext } from 'react';
import { Navbar as BootNavbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const Navbar = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!admin || location.pathname === '/') return null;

  return (
    <BootNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4" style={{ backgroundColor: "#282c34" }}>
      <Container>
        <BootNavbar.Brand as={Link} to="/dashboard" className="fw-bold text-info">
          🚀 EmpresaPanel
        </BootNavbar.Brand>
        <BootNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
          </Nav>
          
          <BootNavbar.Text className="me-3 text-light">
            Operador: <strong className="text-warning">{admin.nombre}</strong> | 
            Sector: <span className="badge bg-secondary ms-1">{admin.rol}</span>
          </BootNavbar.Text>
          
          <Button variant="outline-light" size="sm" onClick={handleLogout} className="fw-bold">
            Cerrar Sesión
          </Button>
        </BootNavbar.Collapse>
      </Container>
    </BootNavbar>
  );
};

export default Navbar;