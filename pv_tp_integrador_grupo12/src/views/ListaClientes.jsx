// src/views/ListaClientes.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Sumamos 'Form' en la importación de react-bootstrap
import { Container, Table, Button, Spinner, Alert, Card, Form } from 'react-bootstrap';

const ListaClientes = () => {
    const navigate = useNavigate();
    
    const [clientes, setClientes] = useState([]);       
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState(null);            
    // 🌟 NUEVO ESTADO: Para guardar lo que el usuario escribe en el buscador
    const [busqueda, setBusqueda] = useState('');        

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

    // : Filtramos la lista original en tiempo real según lo escrito
    const clientesFiltrados = clientes.filter(cliente => {
        const apellido = cliente.name.lastname.toLowerCase();
        const ciudad = cliente.address.city.toLowerCase();
        return apellido.includes(busqueda.toLowerCase()) || ciudad.includes(busqueda.toLowerCase());
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
            <h2 className="fw-bold text-dark mb-4">Base General de Clientes</h2>
            
            {/* 🌟 NUEVO COMPONENTE: La barra de búsqueda arriba de la tabla */}
            <Card className="shadow-sm border-0 p-3 mb-4 bg-white">
                <Form.Group>
                    <Form.Label className="fw-bold text-secondary mb-2">🔍 Buscador de Clientes</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Filtrar por apellido o por ciudad..." 
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
                        {/* 🌟 CAMBIO CLAVE: Ahora mapeamos 'clientesFiltrados' en lugar de 'clientes' */}
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
        </Container>
    );
};

export default ListaClientes;