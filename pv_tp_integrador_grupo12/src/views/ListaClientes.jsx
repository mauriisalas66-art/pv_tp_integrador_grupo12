// src/views/ListaClientes.jsx
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useAdmin } from "../hooks/useAdmin"; 
import { useClientes } from "../hooks/useClientes";
import FormCliente from "../components/common/FormCliente";

const ListaClientes = () => {
    const navigate = useNavigate();
    const { admin } = useAdmin();

    // 🔌 Consumimos el estado ya procesado y masticado
    const {
        clientesFiltrados,
        loading,
        error,
        busqueda,
        setBusqueda,
        showModal,
        setShowModal,
        alertaExito,
        manejarAltaExitosa
    } = useClientes();

    if (loading) {
        return (
            <Container className="text-center mt-5 py-5">
                <Spinner animation="border" variant="primary" className="mb-2" />
                <p className="text-secondary fw-bold">Cargando lista de clientes...</p>
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
                    <Form.Control 
                        type="text" 
                        placeholder="Filtrar por nombre, apellido o por ciudad..." 
                        value={busqueda} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                    />
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
                                <td className="text-capitalize">{cliente?.name?.firstname} {cliente?.name?.lastname}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.phone}</td>
                                <td className="text-capitalize">{cliente?.address?.city}</td>
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
                onAltaExitosa={(idAsignado, datosFormulario) => manejarAltaExitosa(idAsignado, datosFormulario)} 
            />
        </Container>
    );
};

export default ListaClientes;