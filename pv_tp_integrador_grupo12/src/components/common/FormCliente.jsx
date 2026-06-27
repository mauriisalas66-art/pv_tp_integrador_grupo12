// src/components/common/FormCliente.jsx
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useFormCliente } from '../../hooks/useFormCliente'; // <-- Importamos su propio hook

const FormCliente = ({ show, onHide, onAltaExitosa }) => {
    
    // 🔌 Conectamos el formulario a su cerebro exclusivo
    const {
        nuevoCliente,
        setNuevoCliente,
        guardando,
        errorModal,
        enviarRegistro
    } = useFormCliente(onAltaExitosa);

    const manejarSubmit = (e) => {
        e.preventDefault();
        enviarRegistro(); // El hook se encarga de validar y hacer el POST
    };

    return (
        <Modal show={show} onHide={() => !guardando && onHide()} centered>
            <Modal.Header closeButton={!guardando}>
                <Modal.Title className="fw-bold text-primary">Alta de Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Form onSubmit={manejarSubmit}>
                <Modal.Body>
                    {errorModal && <Alert variant="danger" className="py-2 text-center small fw-bold mb-3">{errorModal}</Alert>}

                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Nombre</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.firstname} onChange={(e) => setNuevoCliente({...nuevoCliente, firstname: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Apellido</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.lastname} onChange={(e) => setNuevoCliente({...nuevoCliente, lastname: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Email</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.email} onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Teléfono Celular (Solo Números)</Form.Label>
                        <Form.Control type="text" placeholder="Ej: 3884123456" value={nuevoCliente.phone} onChange={(e) => setNuevoCliente({...nuevoCliente, phone: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Ciudad</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.city} onChange={(e) => setNuevoCliente({...nuevoCliente, city: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Contraseña de Acceso (Mínimo 8)</Form.Label>
                        <Form.Control type="password" value={nuevoCliente.password} onChange={(e) => setNuevoCliente({...nuevoCliente, password: e.target.value})} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={guardando}>Cancelar</Button>
                    <Button variant="primary" type="submit" disabled={guardando}>
                        {guardando ? 'Guardando...' : 'Guardar Registro'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default FormCliente;