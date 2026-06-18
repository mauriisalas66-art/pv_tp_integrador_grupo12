// src/views/ListaClientes.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Spinner, Alert, Card, Modal } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';

const ListaClientes = () => {
    const navigate = useNavigate();
    const { admin } = useContext(AdminContext); // Traemos el rol del administrador

    const [clientes, setClientes] = useState([]);       
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState(null);            
    const [busqueda, setBusqueda] = useState('');        

    // Estados nuevos para el Modal básico
    const [showModal, setShowModal] = useState(false); 
    const [nuevoCliente, setNuevoCliente] = useState({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' });
    const [guardando, setGuardando] = useState(false);
    const [alertaExito, setAlertaExito] = useState(null);

    useEffect(() => {
        const obtenerClientesRemotos = async () => {
            try {
                setLoading(true); 
                const respuesta = await fetch('https://fakestoreapi.com/users');
                if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor');
                const datosConvertidos = await respuesta.json(); 
                setClientes(datosConvertidos); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };
        obtenerClientesRemotos();
    }, []); 

    const manejarAlta = async (e) => {
        e.preventDefault();
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
            const resultado = await respuesta.json(); 

            setAlertaExito(`¡Cliente registrado con éxito! ID asignado: #${resultado.id}`);
            setShowModal(false); 
            setNuevoCliente({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' }); 
            setTimeout(() => setAlertaExito(null), 4000);
        } catch (err) {
            console.error(err);
        } finally {
            setGuardando(false);
        }
    };

    const clientesFiltrados = clientes.filter(cliente => {
        const apellido = cliente.name.lastname.toLowerCase();
        const city = cliente.address.city.toLowerCase();
        return apellido.includes(busqueda.toLowerCase()) || city.includes(busqueda.toLowerCase());
    });

    if (loading) return <Container className="text-center mt-5 py-5"><Spinner animation="border" variant="primary" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-3">
            {alertaExito && <Alert variant="success" className="text-center fw-bold shadow border-0 mb-3">{alertaExito}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark mb-0">Base General de Clientes</h2>
                
                {/* Control por rol básico */}
                {admin?.rol === 'Gerencia' ? (
                    <Button variant="success" className="fw-bold shadow-sm" onClick={() => setShowModal(true)}>
                        ➕ Nuevo Cliente
                    </Button>
                ) : (
                    <span className="text-muted small bg-light p-2 rounded border">👀 Modo Lectura (Soporte)</span>
                )}
            </div>

            <Card className="shadow-sm border-0 p-3 mb-4 bg-white">
                <Form.Group>
                    <Form.Label className="fw-bold text-secondary mb-2">🔍 Buscador de Clientes</Form.Label>
                    <Form.Control type="text" placeholder="Filtrar por apellido o por ciudad..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </Form.Group>
            </Card>

            <Card className="shadow-sm border-0 bg-white">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-dark">
                        <tr><th>ID</th><th>Nombre Completo</th><th>Email</th><th>Teléfono</th><th>Ciudad</th><th className="text-center">Acciones</th></tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map(cliente => (
                            <tr key={cliente.id}>
                                <td className="fw-bold text-primary">#{cliente.id}</td>
                                <td className="text-capitalize">{cliente.name.firstname} {cliente.name.lastname}</td>
                                <td>{cliente.email}</td><td>{cliente.phone}</td><td className="text-capitalize">{cliente.address.city}</td>
                                <td className="text-center">
                                    <Button variant="outline-primary" size="sm" className="fw-bold" onClick={() => navigate(`/clientes/${cliente.id}`)}>Ver Ficha Completa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            {/* Modal Formulario */}
            <Modal show={showModal} onHide={() => !guardando && setShowModal(false)} centered>
                <Modal.Header closeButton={!guardando}><Modal.Title className="fw-bold text-primary">Alta de Nuevo Cliente</Modal.Title></Modal.Header>
                <Form onSubmit={manejarAlta}>
                    <Modal.Body>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Nombre</Form.Label><Form.Control type="text" value={nuevoCliente.firstname} onChange={(e) => setNuevoCliente({...nuevoCliente, firstname: e.target.value})} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Apellido</Form.Label><Form.Control type="text" value={nuevoCliente.lastname} onChange={(e) => setNuevoCliente({...nuevoCliente, lastname: e.target.value})} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Email</Form.Label><Form.Control type="email" value={nuevoCliente.email} onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Teléfono</Form.Label><Form.Control type="text" value={nuevoCliente.phone} onChange={(e) => setNuevoCliente({...nuevoCliente, phone: e.target.value})} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Ciudad</Form.Label><Form.Control type="text" value={nuevoCliente.city} onChange={(e) => setNuevoCliente({...nuevoCliente, city: e.target.value})} required /></Form.Group>
                        <Form.Group className="mb-2"><Form.Label className="small fw-bold">Contraseña</Form.Label><Form.Control type="password" value={nuevoCliente.password} onChange={(e) => setNuevoCliente({...nuevoCliente, password: e.target.value})} required /></Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)} disabled={guardando}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar Registro'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default ListaClientes;