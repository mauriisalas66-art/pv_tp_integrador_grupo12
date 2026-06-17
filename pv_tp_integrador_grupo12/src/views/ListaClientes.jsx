// src/views/ListaClientes.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner, Alert, Card } from 'react-bootstrap';

const ListaClientes = () => {
    const navigate = useNavigate();
    
    // Estados para manejar la API
    const [clientes, setClientes] = useState([]);       
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState(null);            

    // Hook para disparar la búsqueda a internet apenas carga la pantalla
    useEffect(() => {
        const obtenerClientesRemotos = async () => {
            try {
                setLoading(true); 
                const respuesta = await fetch('https://fakestoreapi.com/users');
                if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor de FakeStoreAPI');
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

    // Renderizados condicionales mientras espera la red o si hay error
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
            <h2 className="fw-bold text-dark mb-4">Base General de Clientes</h2>
            
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
                        {/* Ahora mapeamos los clientes reales que bajaron de la API */}
                        {clientes.map(cliente => (
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
        </Container>
    );
};

export default ListaClientes;