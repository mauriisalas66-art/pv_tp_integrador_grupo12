import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';

export const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener la información del cliente');
        }
        
        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const handleEliminar = async () => {
    if (!window.confirm('¿Está seguro de que desea eliminar este cliente?')) return;

    try {
      setEliminando(true);
      const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al intentar eliminar el cliente');
      }

      alert('Cliente eliminado con éxito (Simulado).');
      navigate('/clientes');
    } catch (err) {
      alert(err.message);
    } finally {
      setEliminando(false);
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ficha Profunda del Cliente #{id}</h2>
        <Button as={Link} to="/clientes" variant="secondary" size="sm">
          Volver
        </Button>
      </div>

      {admin?.sector === 'Soporte' && (
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
              <p className="my-2"><strong>Usuario:</strong> {cliente?.username}</p>
              <p className="my-2"><strong>Contraseña:</strong> <code className="text-dark">{cliente?.password}</code></p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary border-bottom pb-2">Dirección Completa</Card.Title>
              <Row>
                <Col sm={6}>
                  <p className="my-2"><strong>Calle:</strong> {cliente?.address?.street} N° {cliente?.address?.number}</p>
                  <p className="my-2"><strong>Ciudad:</strong> {cliente?.address?.city}</p>
                </Col>
                <Col sm={6}>
                  <p className="my-2"><strong>Código Postal:</strong> {cliente?.address?.zipcode}</p>
                  <p className="my-2"><strong>Geolocalización:</strong> Lat: {cliente?.address?.geolocation?.lat} | Long: {cliente?.address?.geolocation?.long}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {admin?.sector === 'Gerencia' && (
        <div className="d-flex justify-content-end mt-2">
          <Button 
            variant="danger" 
            onClick={handleEliminar} 
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : '❌ Dar de Baja Cliente'}
          </Button>
        </div>
      )}
    </Container>
  );
};