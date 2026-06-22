// src/views/ListaClientes.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Spinner, Alert, Card } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';
import FormCliente from '../components/common/FormCliente'; // <-- Importamos el formulario extraído

const ListaClientes = () => {
    const navigate = useNavigate();
    const { admin } = useContext(AdminContext);

    const [clientes, setClientes] = useState([]);       
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState(null);            
    const [busqueda, setBusqueda] = useState('');        

    // Control de visibilidad del modal y alerta de éxito general
    const [showModal, setShowModal] = useState(false); 
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

    // Esta función se ejecuta cuando el hijo (FormCliente) termina el POST con éxito
    const manejarAltaExitosa = (idAsignado) => {
        setShowModal(false);
        setAlertaExito(`¡Cliente registrado con éxito! ID asignado: #${idAsignado}`);
        setTimeout(() => setAlertaExito(null), 4000);
    };

    const clientesFiltrados = clientes.filter(cliente => {
        const apellido = cliente.name.lastname.toLowerCase();
        const city = cliente.address.city.toLowerCase();
        return apellido.includes(busqueda.toLowerCase()) || city.includes(busqueda.toLowerCase());
    });

    if (loading) {
        return (
            <Container className="text-center mt-5 py-5">
                <Spinner animation="border" variant="primary" className="mb-2" />
                <p className="text-secondary fw-bold">Cargando lista de clientes desde la nube...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>
        );
    }

    return (
        <Container className="mt-3">
            {alertaExito && <Alert variant="success" className="text-center fw-bold shadow border-0 mb-3">{alertaExito}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark mb-0">Base General de Clientes</h2>
                
                {admin?.rol === 'Gerencia' ? (
                    <Button variant="success" className="fw-bold shadow-sm" onClick={() => setShowModal(true)}>
                        ➕ Nuevo Cliente
                    </Button>
                ) : (
                    <span className="text-muted small bg-light p-2 rounded border">
                        Modo Lectura (Soporte)
                    </span>
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
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map(cliente => (
                            <tr key={cliente.id}>
                                <td className="fw-bold text-primary">#{cliente.id}</td>
                                <td className="text-capitalize">{cliente.name.firstname} {cliente.name.lastname}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.phone}</td>
                                <td className="text-capitalize">{cliente.address.city}</td>
                                <td className="text-center">
                                    <Button variant="outline-primary" size="sm" className="fw-bold" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                                        Ver Ficha Completa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            <FormCliente 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onAltaExitosa={manejarAltaExitosa} 
            />
        </Container>
    );
};

export default ListaClientes;