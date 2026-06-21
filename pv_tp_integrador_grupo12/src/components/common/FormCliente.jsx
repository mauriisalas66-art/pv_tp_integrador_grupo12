// src/components/common/FormCliente.jsx
import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const FormCliente = ({ show, onHide, onAltaExitosa }) => {
    const [nuevoCliente, setNuevoCliente] = useState({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' });
    const [guardando, setGuardando] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const validarAltaCliente = () => {
        const soloLetrasRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumerosRegExp = /^[0-9]+$/;

        if (!soloLetrasRegExp.test(nuevoCliente.firstname)) {
            setErrorModal("⚠️ El Nombre no puede contener números ni caracteres especiales.");
            return false;
        }
        if (!soloLetrasRegExp.test(nuevoCliente.lastname)) {
            setErrorModal("⚠️ El Apellido no puede contener números ni caracteres especiales.");
            return false;
        }
        if (!nuevoCliente.email.includes('@')) {
            setErrorModal("⚠️ El correo electrónico debe contener un '@'.");
            return false;
        }
        if (!soloNumerosRegExp.test(nuevoCliente.phone)) {
            setErrorModal("⚠️ El campo Teléfono solo acepta números. Quite las letras o espacios.");
            return false;
        }
        if (nuevoCliente.phone.length < 10 || nuevoCliente.phone.length > 13) {
            setErrorModal("⚠️ Número de teléfono inválido. Debe tener entre 10 y 13 dígitos numéricos.");
            return false;
        }
        if (!soloLetrasRegExp.test(nuevoCliente.city)) {
            setErrorModal("⚠️ La Ciudad no puede contener números.");
            return false;
        }
        if (nuevoCliente.password.length < 8) {
            setErrorModal("⚠️ La contraseña debe tener un mínimo de 8 caracteres.");
            return false;
        }

        setErrorModal(null);
        return true;
    };

    const manejarAlta = async (e) => {
        e.preventDefault();
        setErrorModal(null);

        if (!validarAltaCliente()) return;
        setGuardando(true);

        const clienteEnviar = {
            email: nuevoCliente.email,
            username: nuevoCliente.firstname.toLowerCase() + "123",
            password: nuevoCliente.password,
            name: { firstname: nuevoCliente.firstname, lastname: nuevoCliente.lastname },
            address: { city: nuevoCliente.city, street: 'Calle Falsa', number: 123, zipcode: '4600', geolocation: { lat: '0', long: '0' } },
            phone: nuevoCliente.phone
        };

        try {
            const respuesta = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                body: JSON.stringify(clienteEnviar)
            });

            if (!respuesta.ok) throw new Error('No se pudo registrar en la nube');
            const resultado = await respuesta.json(); 

            // Avisamos al componente padre que todo salió bien y le pasamos el ID asignado
            onAltaExitosa(resultado.id);
            setNuevoCliente({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' }); 
        } catch (err) {
            setErrorModal(err.message);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Modal show={show} onHide={() => !guardando && onHide()} centered>
            <Modal.Header closeButton={!guardando}>
                <Modal.Title className="fw-bold text-primary">Alta de Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Form onSubmit={manejarAlta}>
                <Modal.Body>
                    {errorModal && <Alert variant="danger" className="py-2 text-center small fw-bold mb-3">{errorModal}</Alert>}

                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Nombre</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.firstname} onChange={(e) => setNuevoCliente({...nuevoCliente, firstname: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Apellido</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.lastname} onChange={(e) => setNuevoCliente({...nuevoCliente, lastname: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Email</Form.Label>
                        <Form.Control type="email" value={nuevoCliente.email} onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Teléfono Celular (Solo Números)</Form.Label>
                        <Form.Control type="text" placeholder="Ej: 3884123456" value={nuevoCliente.phone} onChange={(e) => setNuevoCliente({...nuevoCliente, phone: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Ciudad</Form.Label>
                        <Form.Control type="text" value={nuevoCliente.city} onChange={(e) => setNuevoCliente({...nuevoCliente, city: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-secondary">Contraseña de Acceso (Mínimo 8)</Form.Label>
                        <Form.Control type="password" value={nuevoCliente.password} onChange={(e) => setNuevoCliente({...nuevoCliente, password: e.target.value})} required />
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