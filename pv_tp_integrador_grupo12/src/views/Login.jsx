// src/views/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner, Toast, ToastContainer, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../hooks/useAdmin';
import { authService } from '../services/authService';

const Login = () => {
  const { admin, login } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate('/dashboard', { replace: true });
    }
  }, [admin, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [nombreOperador, setNombreOperador] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones controladas por JavaScript
    if (!email || email.trim() === '') {
      setError("⚠️ El correo electrónico es obligatorio.");
      return;
    }
    if (!email.includes('@')) {
      setError("⚠️ Por favor, ingrese un correo electrónico válido.");
      return;
    }
    if (!password || password.trim() === '') {
      setError("⚠️ La contraseña es obligatoria.");
      return;
    }
    if (password.length < 8) {
      setError("⚠️ La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Llamamos al servicio pasando únicamente las dos credenciales básicas
      const adminLogueado = await authService.login(email, password);
      
      setNombreOperador(adminLogueado.nombre);
      setMostrarToast(true);
      
      login(adminLogueado);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (admin) return null;

  return (
    <Container className="mt-5" style={{ minHeight: '80vh' }}>
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow border-0 bg-white p-3">
            <Card.Body>
              <h3 className="text-center fw-bold text-primary mb-4">Acceso al Sistema</h3>
              
              {error && <Alert variant="danger" className="py-2 text-center small fw-bold">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="ejemplo@correo.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-secondary">Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold shadow-sm" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Ingresar al Sistema'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed', zIndex: 9999 }}>
        <Toast bg="dark" show={mostrarToast} onClose={() => setMostrarToast(false)} delay={2500} autohide animation={true}>
          <Toast.Body className="text-white small d-flex justify-content-between align-items-center py-2 px-3">
            <span>👋 ¡Hola! Ingreso correcto de <strong>{nombreOperador}</strong>.</span>
            <Button variant="close" className="btn-close-white ms-3" onClick={() => setMostrarToast(false)} />
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Login;