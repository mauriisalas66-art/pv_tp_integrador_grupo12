// src/views/Dashboard.jsx
import { useContext } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Dashboard = () => {
  const { admin, cerrarSesion } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded shadow-sm">
        <div>
          <h2 className="fw-bold mb-0 text-dark">Panel de Control</h2>
          <small className="text-secondary">
            Bienvenido: <strong>{admin?.nombre}</strong> | Sector: <span className="badge bg-primary">{admin?.rol}</span>
          </small>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0 border-top border-primary border-3">
            <Card.Body>
              <Card.Title className="text-secondary fw-bold mb-3">Métricas de la Empresa</Card.Title>
              <Card.Text className="fs-5">
                Total de clientes en la nube: <strong className="text-dark">10</strong>
              </Card.Text>
              <Card.Text className="text-muted small">
                * Datos sincronizados en tiempo real mediante FakeStoreAPI.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0 border-top border-success border-3">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title className="text-secondary fw-bold mb-3">Sección Operativa</Card.Title>
                <p className="text-muted">Ingresá al listado general para revisar clientes, realizar búsquedas profundas o gestionar sus estados de cuenta.</p>
              </div>
              <Button variant="success" className="w-100 fw-bold" onClick={() => navigate('/clientes')}>
                Ir a la Lista de Clientes →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;