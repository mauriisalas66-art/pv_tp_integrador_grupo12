// src/views/DetalleCliente.jsx
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useAdmin } from '../hooks/useAdmin';
import { useDetalleCliente } from '../hooks/useDetalleCliente'; 

const DetalleCliente = () => {
  const { admin } = useAdmin(); 

  
  const {
    id,
    cliente,
    loading,
    error,
    eliminando,
    alertaBajaExitosa,
    handleEliminar
  } = useDetalleCliente();

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando expediente del cliente...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">⚠️ Error: {error}</Alert>
        <Button as={Link} to="/clientes" variant="secondary">Volver a la lista</Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {alertaBajaExitosa && (
        <Alert variant="danger" className="text-center fw-bold shadow border-0 mb-4 animate__animated animate__fadeIn">
          {alertaBajaExitosa}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ficha Profunda del Cliente #{id}</h2>
        <Button as={Link} to="/clientes" variant="secondary" size="sm">
          Volver
        </Button>
      </div>

      {admin?.rol === 'Soporte' && (
        <Alert variant="info" className="mb-4">
          ℹ️ <strong>Modo Lectura:</strong> Tu perfil de Soporte solo permite visualizar los datos.
        </Alert>
      )}

      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary border-bottom pb-2">Datos Personales</Card.Title>
              <p className="my-2"><strong>Nombre Completo:</strong> {cliente?.name?.firstname} {cliente?.name?.lastname}</p>
              <p className="my-2"><strong>Email:</strong> {cliente?.email}</p>
              <p className="my-2"><strong>Teléfono:</strong> {cliente?.phone}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary border-bottom pb-2">Credenciales de Acceso</Card.Title>
              <p className="my-2"><strong>Usuario:</strong> {cliente?.username || 'No registrado'}</p>
              <p className="my-2"><strong>Contraseña:</strong> <code className="text-dark">{cliente?.password || '••••••••'}</code></p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary border-bottom pb-2">Dirección Completa</Card.Title>
              <Row>
                <Col sm={6}>
                  <p className="my-2"><strong>Calle:</strong> {cliente?.address?.street || 'Calle Falsa'} N° {cliente?.address?.number || '123'}</p>
                  <p className="my-2"><strong>Ciudad:</strong> {cliente?.address?.city}</p>
                </Col>
                <Col sm={6}>
                  <p className="my-2"><strong>Código Postal:</strong> {cliente?.address?.zipcode || '4600'}</p>
                  <p className="my-2"><strong>Geolocalización:</strong> Lat: {cliente?.address?.geolocation?.lat || '0'} | Long: {cliente?.address?.geolocation?.long || '0'}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {admin?.rol === 'Gerencia' && (
        <div className="d-flex justify-content-end mt-2">
          <Button 
            variant="danger" 
            onClick={handleEliminar} 
            disabled={eliminando || alertaBajaExitosa}
          >
            {eliminando ? 'Eliminando...' : '❌ Dar de Baja Cliente'}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default DetalleCliente;